import { TUser } from "./auth";

export type TMongoDb = {
  _id: string;
  _v?: number;
};

export type TUserDetials = TMongoDb & Omit<TUser, "password">;
