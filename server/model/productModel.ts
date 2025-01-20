import { model, Model, Schema } from "mongoose";
import { z } from "zod";
import { CustomError } from "../utils/errorFn";

export const ZProduct = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })
    .min(5, { message: "Must be 5 or more characters long" }),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  brand: z.string(),
  model: z.string(),
  category: z.string(),
  color: z.string().optional(),
  discount: z.number().optional(),
  popular: z.boolean().optional(),
  onSale: z.boolean().optional(),
});

export const ZProducts = ZProduct.or(
  z.array(ZProduct).min(1, { message: "Product data missing" })
).transform((val) => {
  if (Array.isArray(val)) return val;

  return [val];
});

interface IProduct {
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  category: string;
  color?: string;
  discount?: number;
  popular?: boolean;
  onSale?: boolean;
}

interface IProductMethods {}

interface ProductModel extends Model<IProduct, {}, IProductMethods> {}

const productSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String, required: false },
  discount: { type: Number, required: false },
  popular: { type: Boolean, required: false },
  onSale: { type: Boolean, required: false },
});

productSchema.post("findOneAndUpdate", function (doc, next) {
  if (!doc) return next(new CustomError("Product not found", 404));
  next();
});
const Product = model<IProduct, ProductModel>("Product", productSchema);

export default Product;
