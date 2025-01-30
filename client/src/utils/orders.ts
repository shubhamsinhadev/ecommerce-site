import { TCartData } from "@/hooks/cart";
import { TAddressData } from "./address";
import { Dispatch, SetStateAction } from "react";

export interface IOrder {
  cart: TCartData[] | undefined;
  address: TAddressData | undefined;
}

export interface IOrderProps {
  order: IOrder;
  setOrder: Dispatch<SetStateAction<IOrder>>;
}

export interface IOrderResponse {
  clientSecret: string;
  clientPromise: string;
  orderId: string;
}
