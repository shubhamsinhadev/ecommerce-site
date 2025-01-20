import express from "express";
import isAuthenticated from "../utils/isAuthenticated";
import wrap from "../utils/wrap";
import {
  addCart,
  deleteCart,
  getCart,
  updateCart,
} from "../controller/cartController";

const cartRouter = express.Router();

cartRouter.use(isAuthenticated);

cartRouter
  .route("/")
  .get(wrap(getCart))
  .post(wrap(addCart))
  .put(wrap(updateCart))
  .delete(wrap(deleteCart));

export default cartRouter;
