import Product, { ZProduct } from "../model/productModel";
import { product } from "./productData";

export const seedFn = async () => {
  product.forEach(async (p) => {
    const { id, ...rest } = p;
    const safe = await ZProduct.safeParseAsync(rest);
    await Product.create(safe.data);
  });
};

