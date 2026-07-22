import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export const getDb = () => client.db();

export async function getConnection() {
  await client.connect();
  console.log("connecting to mongoDb...");
}
