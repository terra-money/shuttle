import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  GetItemCommand,
  GetItemCommandInput,
  ResourceNotFoundException,
  BatchGetItemCommand,
  BatchGetItemCommandInput,
  BatchWriteItemCommand,
  BatchWriteItemCommandInput,
  AttributeValue,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;

const DYNAMO_SHUTTLE_ID = `TERRA_SHUTTLE_${ETH_CHAIN_ID.toUpperCase()}`;
const DYNAMO_ACCESS_KEY_ID = process.env.DYNAMO_ACCESS_KEY_ID as string;
const DYNAMO_SECRET_ACCESS_KEY = process.env.DYNAMO_SECRET_ACCESS_KEY as string;
const DYNAMO_REGION = process.env.DYNAMO_REGION as string;
const DYNAMO_TRANSACTION_TABLE_NAME = `ShuttleTx`;

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
    fromTxHash: string[]
  ): Promise<{ [key: string]: boolean }> {
    const params: BatchGetItemCommandInput = {
      RequestItems: {
        [DYNAMO_TRANSACTION_TABLE_NAME]: {
          Keys: fromTxHash.map((txHash) => {
            return {
              ShuttleID: { S: DYNAMO_SHUTTLE_ID },
              FromTxHash: { S: txHash },
            };
          }),
          ProjectionExpression: 'FromTxHash',
        },
      },
    };

    return await this.client
      .send(new BatchGetItemCommand(params))
      .then((res) => {
        if (
          res.Responses === undefined ||
          res.Responses[DYNAMO_TRANSACTION_TABLE_NAME] === undefined
        ) {
          return {};
        }
        const foundTxs = res.Responses[DYNAMO_TRANSACTION_TABLE_NAME] as {
          [key: string]: AttributeValue;
        }[];

        return Object.fromEntries(
          foundTxs.map((v) => [v['FromTxHash'].S as string, true])
        );
      });
  }

  async storeTransactions(datas: TransactionData[]) {
    const params: BatchWriteItemCommandInput = {
      RequestItems: {
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
              },
            },
          };
        }),
      },
    };

    this.client.send(new BatchWriteItemCommand(params));
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

  async updateToTxHash(fromTxHash: string, toTxHash: string) {
    const params: UpdateItemCommandInput = {
      TableName: DYNAMO_TRANSACTION_TABLE_NAME,
      Key: {
        ShuttleID: { S: DYNAMO_SHUTTLE_ID },
        FromTxHash: { S: fromTxHash },
      },
      UpdateExpression: 'SET ToTxHash = :t',
      ExpressionAttributeValues: { ':t': { S: toTxHash } },
    };

    return await this.client.send(new UpdateItemCommand(params));
  }
}
