import { Model, model, Schema } from "mongoose";
import { z } from "zod";
import { ZMongoId } from "../utils/zod";

export const ZReview = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(500),
  productId: ZMongoId,
});

interface IReview {
  productId: Schema.Types.ObjectId;
  rating: number;
  review: string;
  user: Schema.Types.ObjectId;
}

interface IReviewMethods {}

type ReviewModel = Model<IReview, {}, IReviewMethods>;

const reviewSchema = new Schema<IReview, ReviewModel, IReviewMethods>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    review: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
      minlength: 10,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Review = model<IReview, ReviewModel>("Review", reviewSchema);

export default Review;
