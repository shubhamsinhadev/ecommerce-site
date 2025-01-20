import mongoose, { isValidObjectId } from "mongoose";
import { z } from "zod";

export const ZMongoId = z
  .string()
  .refine((val) => isValidObjectId(val), {
    message: "Id invalid",
  })
  .transform((val) => mongoose.Types.ObjectId.createFromHexString(val));

export type TMongoId = z.infer<typeof ZMongoId>;
