//TODO general explanation
import dotenv from "dotenv";
import { ConnectOptions } from "mongoose";
import db from "../models/index.js";

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//TODO comments
async function dbConnect() {
  const mongoDB = process.env.DBURL as string;
  db.mongoose
    .connect(`${mongoDB}`, options as ConnectOptions)
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
  return db;
}

export default dbConnect;
