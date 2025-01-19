import { Request, Response, NextFunction } from "express";

const wrap =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch((err: Error) => next(err));

export default wrap;
