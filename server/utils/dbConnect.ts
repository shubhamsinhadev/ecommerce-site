import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });
