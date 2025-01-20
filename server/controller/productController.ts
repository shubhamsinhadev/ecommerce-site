import { Request, Response, NextFunction } from "express";
import { IQuery, ZQuery } from "../utils/queryZod";
import Product, { ZProduct, ZProducts } from "../model/productModel";
import { CustomError } from "../utils/errorFn";

export const getProductByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = await ZQuery.parseAsync(req.query);

  const productQuery = Product.find();

  const queryMapping: { [key: string]: (value: any) => void } = {
    minPrice: (value) => productQuery.where("price").gte(value),
    maxPrice: (value) => productQuery.where("price").lte(value),
    category: (value) => productQuery.where("category").in(value),
    title: (value) => productQuery.where("title").regex(new RegExp(value, "i")),
    limit: (value) => productQuery.limit(value),
    page: (value) => productQuery.skip((value - 1) * query.limit),
    sort: (value) => productQuery.sort({ price: value }),
  };

  (Object.keys(query) as Array<keyof IQuery>).forEach((key) => {
    queryMapping[key](query[key]);
  });

  console.log(productQuery.getFilter());
  const result = await productQuery.lean().exec();

  res.status(200).json({ status: true, products: result });
};

export const addProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productData = await ZProducts.parseAsync(req.body);

  const products = await Product.create(productData);

  res
    .status(200)
    .json({ status: true, message: "Product added Successfully", products });
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const productData = await ZProduct.parseAsync(req.body);

  const updateProduct = await Product.updateOne({ _id: id }, productData);

  if (updateProduct.modifiedCount < 1) {
    throw new CustomError("Error updating product", 501);
  }

  res.status(200).json({
    status: true,
    message: "Product updated Successfully",
    product: updateProduct,
  });
};

export const delProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const delProduct = await Product.deleteOne({ _id: id });

  if (delProduct.deletedCount < 1) {
    throw new CustomError("Error updating product", 501);
  }

  res.status(200).json({
    status: true,
    message: "Product deleted Successfully",
    product: updateProduct,
  });
};
