const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let db;

const connectToDatabase = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log('MongoDB conectado correctamente');
};

const getDatabase = () => db;

module.exports = { connectToDatabase, getDatabase };
