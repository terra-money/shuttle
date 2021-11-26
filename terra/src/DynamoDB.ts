import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  GetItemCommand,
  QueryCommand,
  QueryCommandInput,
  GetItemCommandInput,
  ResourceNotFoundException,
  BatchGetItemCommand,
  BatchGetItemCommandInput,
  BatchWriteItemCommand,
  BatchWriteItemCommandInput,
  AttributeValue,
  UpdateItemCommand,
  UpdateItemCommandInput,
  WriteRequest,
  KeysAndAttributes,
} from '@aws-sdk/client-dynamodb';

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;

const DYNAMO_SHUTTLE_ID = `TERRA_SHUTTLE_${ETH_CHAIN_ID.toUpperCase().replace(
  '-',
  '_'
)}`;
const DYNAMO_ACCESS_KEY_ID = process.env.DYNAMO_ACCESS_KEY_ID as string;
const DYNAMO_SECRET_ACCESS_KEY = process.env.DYNAMO_SECRET_ACCESS_KEY as string;
const DYNAMO_REGION = process.env.DYNAMO_REGION as string;
const DYNAMO_TRANSACTION_TABLE_NAME = `ShuttleTx`;
const DYNAMO_MAX_LOAD_UNIT = 100;
const DYNAMO_MAX_STORE_UNIT = 25;

const DYNAMO_ENABLE_ETH_ANCHOR_WHITELIST =
  process.env.DYNAMO_ENABLE_ETH_ANCHOR_WHITELIST === 'true';
const DYNAMO_ETH_ANCHOR_TABLE = `eth-anchor-bot-accounts-v2-${process.env.DYNAMO_ETH_ANCHOR_STAGE}`;

export interface TransactionData {
  fromTxHash: string;
  toTxHash: string;
  asset: string;
  sender: string;
  recipient: string;
  amount: string;
}

export class DynamoDB {
  client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: DYNAMO_REGION,
      credentials: {
        accessKeyId: DYNAMO_ACCESS_KEY_ID,
        secretAccessKey: DYNAMO_SECRET_ACCESS_KEY,
      },
    });
  }

  async isEthAnchorAddress(recipientAddr: string): Promise<boolean> {
    if (DYNAMO_ENABLE_ETH_ANCHOR_WHITELIST) {
      const params: QueryCommandInput = {
        TableName: DYNAMO_ETH_ANCHOR_TABLE,
        IndexName: 'IndexedByOperationAddr',
        KeyConditionExpression: 'operationAddr = :v_operationAddr',
        ExpressionAttributeValues: {
          ':v_operationAddr': { S: recipientAddr },
        },
        ProjectionExpression: 'operationAddr',
        ConsistentRead: false,
        Limit: 1,
      };

      return await this.client
        .send(new QueryCommand(params))
        .then((res) => res.Count !== undefined && res.Count > 0)
        .catch((err) => {
          if (err === ResourceNotFoundException) {
            return false;
          }

          throw err;
        });
    }

    return false;
  }

  async hasTransaction(fromTxHash: string): Promise<boolean> {
    const params: GetItemCommandInput = {
      TableName: DYNAMO_TRANSACTION_TABLE_NAME,
      Key: {
        ShuttleID: { S: DYNAMO_SHUTTLE_ID },
        FromTxHash: { S: fromTxHash },
      },
      ProjectionExpression: 'FromTxHash',
    };

    return await this.client
      .send(new GetItemCommand(params))
      .then((res) => res.Item !== undefined)
      .catch((err) => {
        if (err === ResourceNotFoundException) {
          return false;
        }

        throw err;
      });
  }

  async hasTransactions(
    fromTxHashes: string[]
  ): Promise<{ [key: string]: boolean }> {
    if (fromTxHashes.length == 0) return {};

    const outOfBoundTxHashes = fromTxHashes.splice(DYNAMO_MAX_LOAD_UNIT);
    const outOfBoundFoundTxMap = await this.hasTransactions(outOfBoundTxHashes);

    let requestItems: { [key: string]: KeysAndAttributes } = {
      [DYNAMO_TRANSACTION_TABLE_NAME]: {
        Keys: fromTxHashes.map((fromTxHash) => {
          return {
            ShuttleID: { S: DYNAMO_SHUTTLE_ID },
            FromTxHash: { S: fromTxHash },
          };
        }),
        ProjectionExpression: 'FromTxHash',
      },
    };

    const foundTxs: {
      [key: string]: AttributeValue;
    }[] = [];

    while (Object.keys(requestItems).length > 0) {
      const params: BatchGetItemCommandInput = {
        RequestItems: requestItems,
      };

      const res = await this.client.send(new BatchGetItemCommand(params));
      if (res.Responses && res.Responses[DYNAMO_TRANSACTION_TABLE_NAME]) {
        foundTxs.push(...res.Responses[DYNAMO_TRANSACTION_TABLE_NAME]);
      }

      requestItems = res.UnprocessedKeys ? res.UnprocessedKeys : {};
    }

    return Object.assign(
      Object.fromEntries(
        foundTxs.map((v) => [v['FromTxHash'].S as string, true])
      ),
      outOfBoundFoundTxMap
    );
  }

  async storeTransactions(datas: TransactionData[]) {
    if (datas.length == 0) return;

    const outOfBoundDatas = datas.splice(DYNAMO_MAX_STORE_UNIT);

    let requestItems: { [key: string]: WriteRequest[] } = {
      [DYNAMO_TRANSACTION_TABLE_NAME]: datas.map((data) => {
        return {
          PutRequest: {
            Item: {
              Amount: { S: data.amount },
              Asset: { S: data.asset },
              FromTxHash: { S: data.fromTxHash },
              ToTxHash: { S: data.toTxHash },
              Sender: { S: data.sender },
              Recipient: { S: data.recipient },
              ShuttleID: { S: DYNAMO_SHUTTLE_ID },
              CreatedAt: { S: new Date().toISOString() },
            },
          },
        };
      }),
    };

    while (Object.keys(requestItems).length > 0) {
      const params: BatchWriteItemCommandInput = {
        RequestItems: requestItems,
      };

      const res = await this.client.send(new BatchWriteItemCommand(params));
      requestItems = res.UnprocessedItems ? res.UnprocessedItems : {};
    }

    await this.storeTransactions(outOfBoundDatas);
  }

  async storeTransaction(data: TransactionData) {
    const params: PutItemCommandInput = {
      TableName: DYNAMO_TRANSACTION_TABLE_NAME,
      Item: {
        FromTxHash: { S: data.fromTxHash },
        ToTxHash: { S: data.toTxHash },
        Asset: { S: data.asset },
        Sender: { S: data.sender },
        Recipient: { S: data.recipient },
        Amount: { S: data.amount },
        ShuttleID: { S: DYNAMO_SHUTTLE_ID },
        CreatedAt: { S: new Date().toISOString() },
      },
    };

    await this.client.send(new PutItemCommand(params)).catch((err) => {
      console.error(
        `Failed to store the transaction (${data}) to DynamoDB`,
        err
      );
      throw err;
    });
  }

  async updateReplaceTxHashes(fromTxHash: string, toTxHash: string) {
    const params: UpdateItemCommandInput = {
      TableName: DYNAMO_TRANSACTION_TABLE_NAME,
      Key: {
        ShuttleID: { S: DYNAMO_SHUTTLE_ID },
        FromTxHash: { S: fromTxHash },
      },
      UpdateExpression: 'ADD ReplaceTxHashes :t, SET HasReplaceTxHashes = :b',
      ExpressionAttributeValues: {
        ':t': { SS: [toTxHash] },
        ':b': { BOOL: true },
      },
    };

    return await this.client.send(new UpdateItemCommand(params));
  }
}
