import { z } from "zod";
import { TMongoDb } from "./types";

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

export type TAddress = z.infer<typeof ZAddress>;

export const addressFields = [
  { label: "Name", value: "name" },
  { label: "Phone Number", value: "phoneNo" },
  { label: "Address", value: "address" },
  { label: "Pincode", value: "pincode" },
  { label: "City/District/Town", value: "cityDistrictTown" },
  { label: "State", value: "state" },
  { label: "Landmark", value: "landmark" },
  { label: "Address Type", value: "addressType" },
];

export type TAddressData = TAddress & TMongoDb;

export const addressAddFn = async (data: TAddress) => {
  return await fetch("/api/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        throw new Error(res.message);
      }
      return res.address;
    });
};

export const editAddress = async (id: string, data: TAddress) => {
  return await fetch("/api/address/" + id, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        throw new Error("Failed to fetch address");
      }
      return res.address;
    });
};

export const delAddress = async (id: string) => {
  return await fetch("/api/address/" + id, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        throw new Error("Failed to fetch address");
      }
      return res.message;
    });
};
