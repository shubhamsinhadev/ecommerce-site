import { model, Model, Schema } from "mongoose";
import { z } from "zod";

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
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const User = model<IUser, UserModel>("user", userSchema);

export default User;
