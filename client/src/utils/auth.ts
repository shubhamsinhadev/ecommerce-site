import { z } from "zod";

export const Zlogin = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid Email" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(4)
    .max(20),
});

export type Tlogin = z.infer<typeof Zlogin>;

export const ZUser = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(5, { message: "Name must contain at least 5 character(s)" })
    .max(20, { message: "Name must contain at least 20 character(s)" })
    .trim(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid Email" })
    .max(50, { message: "Email must contain at most 50 character(s)" })
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(4, { message: "Password must contain at least 4 character(s)" })
    .max(50, { message: "Password must contain at most 50 character(s)" })
    .trim(),
  role: z.enum(["user", "admin"]).optional().default("user"),
});

export type TUser = z.infer<typeof ZUser>;

export const ZRegistration = ZUser;

export type TRegistration = z.infer<typeof ZRegistration>;

export const loginFn = async (data: Tlogin) => {
  return await fetch("/api/auth/login", {
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
      return res;
    });
};

export const registrationFn = async (data: TRegistration) => {
  return await fetch("/api/auth/register", {
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
      return res;
    });
};
