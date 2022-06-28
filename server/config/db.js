// require("dotenv").config();
// const mongoose = require("mongoose");

//   const connectDB = async() => {
//     try {
//         await mongoose.connect(
//             process.env.MONGO_URI, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             }
//         );
//         console.log("MongoDB is connected");
//     } catch(err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

//   module.exports = connectDB;


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