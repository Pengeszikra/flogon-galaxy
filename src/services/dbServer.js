import express from 'express';
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;
const TABLE_NAME = process.env.DYNAMO_TABLE;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

const db = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: TABLE_NAME || '-- fine --', timestamp: new Date().toISOString() });
});

/** @type {(req:Request,res:Response) => Response} */
app.post('/add', (req, res) => {
  console.log(req.body);
  const {id, content} = req.body;
  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: {
      id: { S: id },
      content: { S: content }
    } 
  });
  db.send(command).then(console.log)
  res.json({data: req.body});
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});