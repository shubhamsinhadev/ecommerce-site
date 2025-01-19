import { Request, Response, NextFunction } from "express";
import { ZQuery } from "../utils/queryZod";
import Product, { ZProduct, ZProducts } from "../model/productModel";

export const getProductByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = await ZQuery.parseAsync(req.query);

  const productQuery = Product.find();

  Object.keys(query).forEach((key) => {
    switch (key) {
      case "minPrice":
        productQuery.where("price").gte(query.minPrice as number);
        break;
      case "maxPrice":
        productQuery.where("price").lte(query.maxPrice as number);
        break;
      case "rating":
        productQuery.where("price").gte(query.rating as number);
        break;
      case "category":
        productQuery.where("category").in(query.category as string[]);
        break;
      case "title":
        productQuery
          .where("title")
          .regex(new RegExp(query.title as string, "i"));
        break;
      case "limit":
        productQuery.limit(query.limit as number);
        break;
      case "page":
        productQuery.skip((query.page - 1) * (query.limit as number));
        break;
      case "sort":
        productQuery.sort({ price: query.sort as "asc" | "desc" });
        break;
      default:
    }
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

  const updateProduct = await Product.findByIdAndUpdate(id, productData);

  res
    .status(200)
    .json({
      status: true,
      message: "Product Updated Successfully",
      product: updateProduct,
    });
};

export const delProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(401).json({ message: "Unauthorized" });
};
