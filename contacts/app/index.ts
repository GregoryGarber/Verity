import express from "express";
import dbConnect from "./db/db.js";
import cors from "cors";
import contactsRoutes from "./routes/contacts.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

async function start() {
  await dbConnect();

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Verity." });
  });

  contactsRoutes(app);

  app.listen(4006, () => {
    console.log("Listening on port 4006");
  });
}

start();
