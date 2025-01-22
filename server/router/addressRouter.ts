import express from "express";
import isAuthenticated from "../utils/isAuthenticated";
import wrap from "../utils/wrap";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controller/addressController";

const addressRouter = express.Router();

addressRouter.use(isAuthenticated);

addressRouter.route("/").get(wrap(getAddress)).post(wrap(addAddress));
addressRouter
  .route("/:id")
  .put(wrap(updateAddress))
  .delete(wrap(deleteAddress));

export default addressRouter;
