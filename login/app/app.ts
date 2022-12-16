import express from "express";
import dbConnect from "./db/db.js";
import cors from "cors";
import signUpInRoutes from "./routes/signUpIn.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

async function start() {
  await dbConnect();

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Verity." });
  });

  signUpInRoutes(app);

  app.listen(4007, () => {
    console.log("Listening on port 4007");
  });
}

start();
