import { NextFunction, Request, Response } from "express";
import { ZMongoId } from "../utils/zod";
import Cart, { ZCart } from "../model/cartModel";
import { CustomError } from "../utils/errorFn";

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const cart = await Cart.find({ userId }).populate({ path: "product" });

  res.json({ status: true, cart });
};

export const addCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const { productId } = req.body as { productId: string };

  const cart = await Cart.findOneAndUpdate(
    { userId, productId },
    { $inc: { quantity: 1 } },
    { new: true, upsert: true }
  );

  res.json({ status: true, cart });
};

export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };

  const { quantity } = await ZCart.parseAsync(req.body);

  const cart = await Cart.findByIdAndUpdate(
    id,
    { quantity },
    {
      new: true,
    }
  );

  if (!cart) throw new CustomError("Error while updating Cart", 404);

  res.json({ status: true, cart });
};

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };

  const cart = await Cart.findByIdAndDelete(id);

  if (!cart) throw new CustomError("Error while deleting", 404);

  res.json({ status: true, message: "Product removed from cart" });
};
