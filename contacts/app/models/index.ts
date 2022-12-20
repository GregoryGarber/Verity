import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import Contact from "./contact.model.js";

const db = {
  mongoose: mongoose,
  contact: Contact,
};

export default db;
