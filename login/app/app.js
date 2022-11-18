import express from "express";
import dbConnect from "./db/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

await dbConnect();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

authRoutes(app);

app.listen(4007, () => {
  console.log("Listening on port 4007");
});

//   const article = new User({
//     title: 'Awesome Post!',
//     slug: 'awesome-post',
//     published: true,
//     content: 'This is the best post ever',
//     tags: ['featured', 'announcement'],
//   });

//   await article.save();
