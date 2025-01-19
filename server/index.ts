import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app
  .listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
  .on("error", (error) => {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  });
