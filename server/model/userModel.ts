import {
  CallbackWithoutResultAndOptionalError,
  model,
  Model,
  Schema,
} from "mongoose";
import { z } from "zod";
import bcrypt from "bcrypt";
import { CustomError } from "../utils/errorFn";

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

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface IUserMethods {
  comparePassword(name: string): Promise<boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {}

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, trim: true, required: true },
  email: {
    type: String,
    required: [true, "Email ID required"],
    unique: true,
    validate: {
      validator: function (v) {
        const isEmail = z.string().email();
        const data = isEmail.safeParse(v);
        return data.success;
      },
      message: (props) => `${props.value} is not a valid Email ID`,
    },
  },
  password: {
    type: String,
    required: [true, "Password required"],
    select: false,
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.post(
  "save",
  function (error: any, doc: any, next: CallbackWithoutResultAndOptionalError) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      next(new CustomError("User already exists", 401));
    } else {
      next();
    }
  }
);

const User = model<IUser, UserModel>("user", userSchema);

export default User;
