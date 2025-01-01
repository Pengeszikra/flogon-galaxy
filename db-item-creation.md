# Creating Database Items with ID and Content

To create a new item in the database with an id and content fields, you can use the `DBServer` class's `create()` method. Here's how to do it:

```javascript
// First, create an instance of DBServer with your table name
const dbServer = new DBServer('your-table-name');

// Create a new item with id and content
const newItem = {
  id: 'unique-id-here',  // Replace with your actual ID
  content: 'your content here'  // Replace with your actual content
};

// Call the create method
const result = await dbServer.create(newItem);

// Check if creation was successful
if (result.success) {
  console.log('Item created successfully:', result.data);
} else {
  console.error('Error creating item:', result.error);
}
```

The `create()` method returns an object with the following properties:
- `success`: boolean indicating if the operation was successful
- `data`: the created item if successful
- `error`: error message if the operation failed

Make sure your DynamoDB table has the appropriate schema to support items with `id` and `content` fields.