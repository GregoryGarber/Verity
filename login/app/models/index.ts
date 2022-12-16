import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import User from "./user.model.js";

const db = {
  mongoose: mongoose,
  user: User,
};

export default db;
