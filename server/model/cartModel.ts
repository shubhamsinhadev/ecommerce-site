import { model, Model, Schema } from "mongoose";
import { ZMongoId } from "../utils/zod";
import { z } from "zod";

export const ZCart = z.object({
  productId: ZMongoId,
  quantity: z.number().int().min(1),
});

export interface ICart {
  productId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  quantity: number;
}

interface ICartMethods {}

type CartModel = Model<ICart, {}, ICartMethods>;

const cartSchema = new Schema<ICart, CartModel, ICartMethods>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be less than or equal to 100"],
    default: 1,
  },
});

cartSchema.index({ productId: 1, userId: 1 }, { unique: true });

const Cart = model<ICart, CartModel>("Cart", cartSchema);

export default Cart;
