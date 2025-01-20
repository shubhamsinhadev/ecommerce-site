import { Request, Response, NextFunction } from "express";
import { ZMongoId } from "../utils/zod";
import Review, { ZReview } from "../model/reviewModel";

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const review = await Review.find({ userId });

  res.json({ status: true, review });
};

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const reviewData = await ZReview.parseAsync(req.body);

  const address = await Review.create({ userId, ...reviewData });

  res.json({ status: true, address });
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const reviewId = await ZMongoId.parseAsync(req.params.reviewId);

  const reviewData = await ZReview.parseAsync(req.body);

  const review = await Review.findOneAndUpdate(
    { userId, _id: reviewId },
    reviewData
  );

  res.json({ status: true, review });
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user as { userId: string };

  const reviewId = await ZMongoId.parseAsync(req.params.reviewId);

  await Review.findOneAndDelete({ _id: reviewId, userId });

  res.json({ status: true, message: "Review deleted successfully" });
};
