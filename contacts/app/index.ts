import express from "express";
import cors from "cors";
import contactsRoutes from "./routes/contacts.routes.js";
const serverless = require("serverless-http");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

async function start() {
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Verity: Contacts" });
  });

  contactsRoutes(app);

  app.listen(4005, () => {
    console.log("Listening on port 4005");
  });
}

start();
module.exports.handler = serverless(app);
