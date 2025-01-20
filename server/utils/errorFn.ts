import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ status: false, message: "Route not found" });
};

const errorHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const zodErrors = err.format()._errors;
    res.status(400).json({ status: false, message: zodErrors });
    return;
  }

  res
    .status(500)
    .json({ status: false, message: err.message || "Something went wrong" });
};

export { CustomError, routeNotFound, errorHandler };
