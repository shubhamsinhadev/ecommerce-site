import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import Order from "../model/orderModel";
import { ZOrder } from "../utils/order";
import Product from "../model/productModel";
import stripe from "stripe";

const STRIPE_SECRET = process.env.STRIPE_SECRET as string;

const stripInstance = new stripe(STRIPE_SECRET);

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user as { userId: string };
    const { products, address } = await ZOrder.parseAsync(req.body);

    const productIdList = products.map((product) => product.productId);

    const productList = await Product.find({
      _id: { $in: productIdList },
    })
      .select({ _id: 1, price: 1 })
      .lean();

    const newProductIdList = productList.map((product) =>
      product._id.toString()
    );

    productIdList.forEach((id) => {
      if (!newProductIdList.includes(id)) {
        throw new Error("Product not found");
      }
    });

    const totalPrice = productList.reduce((acc, product) => {
      const idx = products.findIndex(
        (i) => i.productId === product._id.toString()
      );

      if (idx === -1) {
        throw new Error("Product not found");
      }
      acc = +product.price * products[idx].quantity;

      return acc;
    }, 0);

    const paymentIntent = await stripInstance.paymentIntents.create({
      amount: totalPrice,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = await Order.create({
      products,
      address,
      userId,
      totalPrice,
      paymentIntentId: paymentIntent.id,
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      orderId: newOrder.id,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message || "Something went wrong",
    });
  }
};
