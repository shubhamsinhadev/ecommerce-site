import "dotenv/config";
import express from "express";
import "./utils/dbConnect";
import productRouter from "./router/productRouter";
import { errorHandler, routeNotFound } from "./utils/errorFn";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import authRouter from "./router/authRouter";
import cartRouter from "./router/cartRouter";
import addressRouter from "./router/addressRouter";
import reviewRouter from "./router/reviewRouter";
import { delay } from "./utils/delay";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY || "some key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
    name: "ecommerce-site",
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(delay); // Only for development

app.get("/", async (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/review", reviewRouter);

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
