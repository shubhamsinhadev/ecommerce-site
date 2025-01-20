import { Request, Response, NextFunction } from "express";
import { ZMongoId } from "../utils/zod";
import Address, { ZAddress } from "../model/addressModel";

export const getAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const address = await Address.find({ userId });

  res.json({ status: true, address });
};

export const addAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const addressData = await ZAddress.parseAsync(req.body);

  const address = await Address.create({ userId, ...addressData });

  res.json({ status: true, address });
};

export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const addressId = await ZMongoId.parseAsync(req.params.id);

  const addressData = await ZAddress.parseAsync(req.body);

  const address = await Address.findOneAndUpdate(
    { userId, _id: addressId },
    addressData
  );

  res.json({ status: true, address });
};

export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const addressId = await ZMongoId.parseAsync(req.params.id);

  const address = await Address.findOneAndDelete({ userId, _id: addressId });

  res.json({ status: true, address });
};
