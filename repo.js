import { Collection } from "mongodb";
import { getDb } from "./db.js";

export function initBaseRepo(collectionName) {
  function collection() {
    return getDb().collection(collectionName);
  }

  async function create(data) {
    const result = await collection().insertOne(data);
    return result.insertedId;
  }

  async function getDataWithOptions({
    filter = {},
    sort = {},
    limit = 0,
    fields = {},
  } = {}) {
    return collection()
      .find(filter)
      .sort(sort)
      .limit(limit)
      .project(fields)
      .toArray();
  }

  async function getCount() {
    return collection().countDocuments();
  }

  async function getUniqueItems(field) {
    return collection().distinct(field);
  }

  return { collection, create, getDataWithOptions, getCount, getUniqueItems };
}
