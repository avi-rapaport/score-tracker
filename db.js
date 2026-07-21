import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
let dbInstance = null;

async function getConnection() {
  await client.connect();
  console.log("connecting to mongoDb...");
  dbInstance = client.db();
  return dbInstance;
}

export const db = await getConnection();
