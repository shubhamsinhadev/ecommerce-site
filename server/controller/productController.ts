import { Request, Response, NextFunction } from "express";

export const getProductByQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(401).json({ message: "Unauthorized" });
};

export const addProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(401).json({ message: "Unauthorized" });
};

export const updateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(401).json({ message: "Unauthorized" });
};

export const delProduct = (req: Request, res: Response, next: NextFunction) => {
  res.status(401).json({ message: "Unauthorized" });
};
