import "dotenv/config";
import express from "express";
import "./utils/dbConnect";
import productRouter from "./router/productRoute";
import { errorHandler, routeNotFound } from "./utils/errorFn";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/product", productRouter);

app.use(routeNotFound);
app.use(errorHandler);

app
  .listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
  .on("error", (error) => {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  });
