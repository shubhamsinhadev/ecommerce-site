import { model, Model, Schema } from "mongoose";
import { z } from "zod";

export const ZProduct = z.object({
  id: z.number().int(),
  title: z.string(),
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

const Product = model<IProduct, ProductModel>("Product", productSchema);

export default Product;
