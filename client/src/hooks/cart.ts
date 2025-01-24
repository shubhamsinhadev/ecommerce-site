import { toaster } from "@/components/ui/toaster";
import { addCart, deleteCart, fetchCart, updateCart } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosAPI from "@/utils/axios";
import { IProduct } from "@/utils/productType";
import { TMongoDb } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export type TCart = {
  productId: string;
  quantity: number;
};

export type TCartData = TCart & TMongoDb & { product: IProduct };

export function useFetchCart() {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.cart);

  const query = useQuery<TCartData[]>({
    queryKey: ["cart"],
    queryFn: async () =>
      await axiosAPI("/api/cart").then((res) => {
        dispatch(fetchCart(res.data.cart));
        return res.data.cart;
      }),
  });

  return { ...query, data };
}

export function useAddCart(product: IProduct) {
  const dispatch = useAppDispatch();
  const productId = product._id;
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosAPI.post("/api/cart", { productId });
      return data.cart;
    },
    onError: (error) => {
      toaster.create({
        title: `Failed to add to cart`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: (data: TCart & TMongoDb) => {
      dispatch(addCart({ ...data, product }));
      toaster.create({
        title: `Address to Cart Successfully`,
        type: "success",
      });
    },
  });
}

export function useUpdateCart(newCart: TCartData) {
  const dispatch = useAppDispatch();
  const { _id } = newCart;
  return useMutation({
    mutationFn: async (quantity: string) => {
      const { data } = await axiosAPI.put(`/api/cart/${_id}`, { quantity });
      return data.cart;
    },
    onError: (error) => {
      toaster.create({
        title: `Failed to update cart`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: (data: TCart) => {
      dispatch(updateCart({ ...newCart, ...data }));
      toaster.create({
        title: `Updated Cart Successfully`,
        type: "success",
      });
    },
  });
}

export function useCartDel(id: string) {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosAPI.delete(`/api/cart/${id}`);
      return data;
    },
    onError: (error) => {
      toaster.create({
        title: `Failed to delete`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: () => {
      dispatch(deleteCart(id));
      toaster.create({
        title: `Deleted Successfully`,
        type: "success",
      });
    },
  });
}
