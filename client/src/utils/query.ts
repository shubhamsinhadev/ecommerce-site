import { z } from "zod";

export const ZPrice = z
  .array(z.coerce.number().int())
  .refine((val) => val[0] <= val[1], {
    message: "Min price must be less than max price",
  });
