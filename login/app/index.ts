import express from "express";
import cors from "cors";
import signUpRoutes from "./routes/signup.routes";
import signInRoutes from "./routes/signIn.routes";
import AWS from "aws-sdk";

const serverless = require("serverless-http");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

async function start() {
  // await dbConnect();

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Verity." });
  });

  signUpRoutes(app);
  signInRoutes(app);

  app.listen(4006, () => {
    console.log("Listening on port 4006");
  });
}

start();

module.exports.handler = serverless(app);
