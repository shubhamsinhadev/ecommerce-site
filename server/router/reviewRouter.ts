 
import express from "express";
import isAuthenticated from "../utils/isAuthenticated";
import wrap from "../utils/wrap";
import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controller/reviewController";

const reviewRouter = express.Router();

reviewRouter.get("/", wrap(getReviews));

reviewRouter.use(isAuthenticated);

reviewRouter.post("/", wrap(addReview));

reviewRouter
  .route("/:reviewId")
  .put(wrap(updateReview))
  .delete(wrap(deleteReview));

export default reviewRouter;
