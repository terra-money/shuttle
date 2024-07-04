aws dynamodb create-table \
   --table-name ShuttleTx \
   --attribute-definitions AttributeName=ShuttleID,AttributeType=S AttributeName=FromTxHash,AttributeType=S \
   --key-schema AttributeName=ShuttleID,KeyType=HASH AttributeName=FromTxHash,KeyType=RANGE \
   --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5