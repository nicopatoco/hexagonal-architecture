import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB_NAME as string;

let dbInstance: MongoClient;
export const connectToDatabase = async () => {
  if (dbInstance) return dbInstance;
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected successfully to MongoDB');
    dbInstance = client;
    return client.db(dbName);
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    process.exit(1);
  }
};

export const getDb = () => {
  if (!dbInstance) throw new Error('DB not initialized');
  return dbInstance.db(dbName);
};
