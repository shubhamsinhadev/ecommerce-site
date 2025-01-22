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
    .min(4, { message: "Password must be at least 4 characters" }),
});

export type Tlogin = z.infer<typeof Zlogin>;

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
