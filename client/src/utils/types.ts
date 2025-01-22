import { TUser } from "./auth";

export type mongoId = {
  _id: string;
  _v?: number;
};

export type TUserDetials = mongoId & Omit<TUser, "password">;
