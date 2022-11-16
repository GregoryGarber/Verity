import dotenv  from "dotenv"
import db from "../model/index.js";

dotenv.config()
const Role = db.role;

async function dbConnect() {
    const mongoDB = process.env.DBURL;
    db.mongoose
    .connect(mongoDB, { 
        useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
        })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
      });
    return db
}

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
        }
    })
}

export default dbConnect