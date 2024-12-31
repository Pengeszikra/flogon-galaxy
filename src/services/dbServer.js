import express from 'express';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * @typedef {Object} DBResponse
 * @property {boolean} success - Indicates if the operation was successful
 * @property {Object|null} data - The data returned from the operation
 * @property {string|null} error - Error message if operation failed
 */

/**
 * Database server module for handling DynamoDB operations
 */
class DBServer {
  /**
   * @param {string} tableName - The DynamoDB table name
   */
  constructor(tableName) {
    this.tableName = tableName;
    const client = new DynamoDBClient({});
    this.docClient = DynamoDBDocument.from(client);
  }

  /**
   * Create a new item in the database
   * @param {Object} item - The item to create
   * @returns {Promise<DBResponse>}
   */
  async create(item) {
    try {
      await this.docClient.put({
        TableName: this.tableName,
        Item: item
      });
      return { success: true, data: item, error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }

  /**
   * Retrieve an item from the database
   * @param {Object} key - The key of the item to retrieve
   * @returns {Promise<DBResponse>}
   */
  async read(key) {
    try {
      const result = await this.docClient.get({
        TableName: this.tableName,
        Key: key
      });
      return { success: true, data: result.Item, error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }

  /**
   * Query items from the database
   * @param {string} keyConditionExpression - The key condition expression
   * @param {Object} expressionAttributeValues - The expression attribute values
   * @returns {Promise<DBResponse>}
   */
  async query(keyConditionExpression, expressionAttributeValues) {
    try {
      const result = await this.docClient.query({
        TableName: this.tableName,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues
      });
      return { success: true, data: result.Items, error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }

  /**
   * Delete an item from the database
   * @param {Object} key - The key of the item to delete
   * @returns {Promise<DBResponse>}
   */
  async delete(key) {
    try {
      await this.docClient.delete({
        TableName: this.tableName,
        Key: key
      });
      return { success: true, data: null, error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }
}

// Initialize DB server with table name
const dbServer = new DBServer('flogon-store');

// Create item
app.post('/items', async (req, res) => {
  try {
    const result = await dbServer.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Read item
app.get('/items/:id', async (req, res) => {
  try {
    const result = await dbServer.read({ id: req.params.id });
    if (!result.data) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Query items
app.get('/items', async (req, res) => {
  try {
    const { keyCondition, values } = req.query;
    const result = await dbServer.query(keyCondition, JSON.parse(values));
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete item
app.delete('/items/:id', async (req, res) => {
  try {
    const result = await dbServer.delete({ id: req.params.id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/health', async (req, res) => {
  res.status(200).json({status: "Kepp up good work!"});
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Only export what's needed for external use
export { DBServer };