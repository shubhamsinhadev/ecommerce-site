import { model, Model, Schema } from "mongoose";
import { z } from "zod";
import bcrypt from "bcrypt";

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface IUserMethods {}

interface UserModel extends Model<IUser, {}, IUserMethods> {}

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstname: { type: String, trim: true, required: true },
  lastname: { type: String, trim: true, required: true },
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
  password: { type: String, required: [true, "Password required"] },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model<IUser, UserModel>("user", userSchema);

export default User;
