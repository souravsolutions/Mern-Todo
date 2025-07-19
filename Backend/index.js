import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/bd.js";

dotenv.config();

const port = process.env.PORT;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on ${port} port`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });
