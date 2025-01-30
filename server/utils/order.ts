import { z } from "zod";

const addressSchema = z.object({
  name: z.string().trim().min(1),
  phoneNo: z.string().regex(/^\d{10}$/, "Invalid phone number format"),
  pincode: z.string().regex(/^\d{6}$/, "Invalid pincode format"),
  address: z.string().trim().min(1),
  cityDistrictTown: z.string().trim().min(1),
  state: z.string().trim().min(1),
  landmark: z.string().trim().optional(),
  addressType: z.enum(["Home", "Office", "Other"]).default("Home"),
});

const ZOrder = z.object({
  products: z
    .array(
      z.object({
        productId: z.string().nonempty(),
        quantity: z.coerce.number().min(1, "Quantity cannot be less than 1"),
      })
    )
    .nonempty(),
  address: addressSchema,
});

export { ZOrder };
