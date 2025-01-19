import express from "express";
import {
  addProducts,
  delProduct,
  getProductByQuery,
  updateProduct,
} from "../controller/productController";
import wrap from "../utils/wrap";

const productRouter = express.Router();

productRouter.route("/").get(wrap(getProductByQuery)).post(wrap(addProducts));

productRouter.route("/:id").put(wrap(updateProduct)).delete(wrap(delProduct));

export default productRouter;
