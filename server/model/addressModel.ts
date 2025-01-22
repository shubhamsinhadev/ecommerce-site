import { model, Model, Schema } from "mongoose";

import { z } from "zod";

export const ZAddress = z.object({
  name: z.string().min(1, "Name is required").trim(),
  phoneNo: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be a valid 10-digit number"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be a valid 6-digit number"),
  address: z.string().min(1, "Address is required").trim(),
  cityDistrictTown: z.string().min(1, "City/District/Town is required").trim(),
  state: z.string().min(1, "State is required").trim(),
  landmark: z.string().trim().optional(),
  addressType: z.enum(["Home", "Office", "Other"]).default("Home"),
});

export interface IAddress {
  userId: Schema.Types.ObjectId;
  name: string;
  phoneNo: string;
  pincode: string;
  address: string;
  cityDistrictTown: string;
  state: string;
  addressType: "Home" | "Office" | "Other";
  landmark?: string;
}

interface IAddressModels {}

type AddressModel = Model<IAddress, {}, IAddressModels>;

const addressSchema = new Schema<IAddress, AddressModel, IAddressModels>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid phone number format"],
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Invalid pincode format"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    cityDistrictTown: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    addressType: {
      type: String,
      enum: ["Home", "Office", "Other"],
      default: "Home",
    },
  },
  {
    timestamps: true,
  }
);

const Address = model<IAddress, AddressModel>("Address", addressSchema);

export default Address;
