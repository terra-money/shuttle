import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  GetItemCommand,
  GetItemCommandInput,
  ResourceNotFoundException,
  DescribeTableCommand,
  DescribeTableCommandInput,
  BatchGetItemCommand,
  BatchGetItemCommandInput,
  BatchWriteItemCommand,
  BatchWriteItemCommandInput,
  AttributeValue,
} from '@aws-sdk/client-dynamodb';

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;

const DYNAMO_PREFIX = `ETH_SHUTTLE_${ETH_CHAIN_ID.toUpperCase()}`;
const DYNAMO_ACCESS_KEY_ID = process.env.DYNAMO_ACCESS_KEY_ID as string;
const DYNAMO_SECRET_ACCESS_KEY = process.env.DYNAMO_SECRET_ACCESS_KEY as string;
const DYNAMO_REGION = process.env.DYNAMO_REGION as string;
const DYNAMO_TRANSACTION_TABLE_NAME = `${DYNAMO_PREFIX}_TRANSACTION`;

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
        DYNAMO_TRANSACTION_TABLE_NAME: {
          Keys: fromTxHash.map((txHash) => {
            return { FromTxHash: { S: txHash } };
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
        DYNAMO_TRANSACTION_TABLE_NAME: datas.map((data) => {
          return {
            PutRequest: {
              Item: {
                Amount: { S: data.amount },
                Asset: { S: data.asset },
                FromTxHash: { S: data.fromTxHash },
                ToTxHash: { S: data.toTxHash },
                Sender: { S: data.sender },
                Recipient: { S: data.recipient },
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

  async hasTransactionTable(): Promise<boolean> {
    const params: DescribeTableCommandInput = {
      TableName: DYNAMO_TRANSACTION_TABLE_NAME,
    };
    return await this.client
      .send(new DescribeTableCommand(params))
      .then((res) => res.Table !== undefined)
      .catch((err) => {
        if (err === ResourceNotFoundException) {
          return false;
        }

        throw err;
      });
  }

  async createTransactionTable() {
    const params: CreateTableCommandInput = {
      TableName: DYNAMO_TRANSACTION_TABLE_NAME,
      AttributeDefinitions: [
        {
          AttributeName: 'FromTxHash',
          AttributeType: 'S',
        },
        {
          AttributeName: 'ToTxHash',
          AttributeType: 'S',
        },
        {
          AttributeName: 'Asset',
          AttributeType: 'S',
        },
        {
          AttributeName: 'Sender',
          AttributeType: 'S',
        },
        {
          AttributeName: 'Recipient',
          AttributeType: 'S',
        },
        {
          AttributeName: 'Amount',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'FromTxHash',
          KeyType: 'HASH',
        },
      ],
      LocalSecondaryIndexes: [
        {
          IndexName: 'SenderIndexer',
          KeySchema: [
            {
              AttributeName: 'Sender',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'KEYS_ONLY',
          },
        },
        {
          IndexName: 'RecipientIndexer',
          KeySchema: [
            {
              AttributeName: 'Recipient',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'KEYS_ONLY',
          },
        },
      ],
      StreamSpecification: {
        StreamEnabled: false,
      },
    };

    await this.client.send(new CreateTableCommand(params)).catch((err) => {
      console.error('Failed to create the transaction table on DynamoDB', err);
      throw err;
    });
  }
}
