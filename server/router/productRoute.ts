import express from "express";
import {
  addProducts,
  delProduct,
  getProductByQuery,
  updateProduct,
} from "../controller/productController";

const productRouter = express.Router();

productRouter.route("/").get(getProductByQuery).post(addProducts);

productRouter.route("/:id").put(updateProduct).delete(delProduct);

export default productRouter;
