require("dotenv").config();
const { MONGO_URI } = process.env;
const MONGO_DB = "test";
const MONGO_COLLECTION = "tests";

function getMongoConnectionString() {
  let uri = MONGO_URI;
  if (process.env.MONGO_VERSION === "3.6") uri = `${MONGO_URI}?useUnifiedTopology=true`
  return uri;
}

function getMongoDB() {
  return MONGO_DB;
}

function getMongoCollection() {
  return MONGO_COLLECTION;
}

module.exports = {
  getMongoConnectionString,
  getMongoDB,
  getMongoCollection
}