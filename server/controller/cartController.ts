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

  const cart = await Cart.find({ userId });

  res.json({ status: true, cart });
};

export const addCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const productId = await ZMongoId.parseAsync(req.body.productId);

  const cart = await Cart.create({ userId, productId, quantity: 1 });

  res.json({ status: true, cart });
};

export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const cartData = await ZCart.parseAsync(req.body);

  const { productId, quantity } = cartData;

  const cart = await Cart.findOneAndUpdate(
    { userId, productId },
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
  const { userId } = req.user as { userId: string };

  const productId = await ZMongoId.parseAsync(req.body.productId);

  const cart = await Cart.findOneAndDelete({ userId, productId });

  if (!cart) throw new CustomError("Error while deleting", 404);

  res.json({ status: true, message: "Product removed from cart" });
};
