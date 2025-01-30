import express from "express";
import wrap from "../utils/wrap";
import { createOrder } from "../controller/orderController";
import isAuthenticated from "../utils/isAuthenticated";

const orderRouter = express.Router();

orderRouter.use(isAuthenticated);

orderRouter.post("/create", wrap(createOrder));

export default orderRouter;
