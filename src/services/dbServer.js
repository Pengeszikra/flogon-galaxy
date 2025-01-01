import express from 'express';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;
const TableName = process.env.DYNAMO_TABLE;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});
const db = DynamoDBDocument.from(dynamo);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: TableName, timestamp: new Date().toISOString() });
});

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

/** @type {(req:Request,res:Response) => Response} */
app.post('/put', (req, res) => {
  db.put({
    TableName,
    Item: req.body,
  })
    .then(r => res.json(r))
    .catch(console.warn);
});

app.post('/get', (req, res) => {
  db.get({
    TableName,
    Key: {...req.body}
  })
    .then(({Item}) => res.json(Item))
    .catch(console.warn);
});

app.post('/delete', (req, res) => {
  db.delete({
    TableName,
    Key: {...req.body}
  })
    .then(r => res.json(r))
    .catch(console.warn);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});