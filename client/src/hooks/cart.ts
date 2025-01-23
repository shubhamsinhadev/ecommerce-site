import { toaster } from "@/components/ui/toaster";
import { TMongoDb } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type TCart = {
  productId: string;
  quantity: number;
};

export type TCartData = TCart & TMongoDb;

export function useFetchCart() {
  return useQuery<TCartData[]>({
    queryKey: ["cart"],
    queryFn: async () =>
      await fetch("/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.status) {
            throw new Error("Failed to fetch cart");
          }
          return res.cart;
        }),
  });
}

export function useAdd2Cart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) =>
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.status) {
            throw new Error("Failed to fetch cart");
          }
          return res.cart;
        }),
    onError: (error) => {
      toaster.create({
        title: `Failed to add to cart`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: (data) => {
      toaster.create({
        title: `Address to Cart Successfully`,
        type: "success",
      });

      queryClient.setQueryData(["cart"], (old: TCartData[]) => {
        return [...old, data];
      });
    },
  });
}
