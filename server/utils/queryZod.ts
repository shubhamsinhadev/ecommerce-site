import { z } from "zod";

export const ZQuery = z.object({
  category: z
    .string()
    .or(z.string().array())
    .transform((val) => {
      if (Array.isArray(val)) return val;

      return [val];
    })
    .optional(),
  title: z.string().min(1).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.coerce.number().min(1).optional().default(10),
  page: z.coerce.number().min(1).optional().default(1),
});

export type IQuery = z.infer<typeof ZQuery>;
