import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export const getDb = () => client.db();

export async function getConnection() {
  try {
    await client.connect();
    console.log("connecting to mongoDb...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
