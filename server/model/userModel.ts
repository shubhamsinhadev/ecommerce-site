import { model, Model, Schema } from "mongoose";
import { z } from "zod";
import bcrypt from "bcrypt";

export const ZUser = z.object({
  name: z.string().min(3).max(50).trim().optional(),
  email: z.string().min(3).max(255).email(),
  password: z.string().min(8).max(100),
  role: z.string().optional().default("user"),
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
  name: { type: String, trim: true },
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

const User = model<IUser, UserModel>("user", userSchema);

export default User;
