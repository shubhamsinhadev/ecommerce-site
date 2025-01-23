import { toaster } from "@/components/ui/toaster";
import { IProduct } from "@/utils/productType";
import { TMongoDb } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type TCart = {
  productId: string;
  quantity: number;
};

export type TCartData = TCart & TMongoDb & { product: IProduct };

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

export function useAdd2Cart(product: IProduct) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId: product._id }),
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
    onSuccess: (data: TCart & TMongoDb) => {
      toaster.create({
        title: `Address to Cart Successfully`,
        type: "success",
      });

      queryClient.setQueryData(
        ["cart"],
        (old: TCartData[] | undefined): TCartData[] => {
          if (!Array.isArray(old)) return [];

          const idx = old.findIndex((i) => i.productId === product._id);

          if (idx !== -1) {
            return old.map((i) =>
              i.productId === product._id ? { ...data, product } : i
            );
          }
          console.log(old);

          return [...old, { ...data, product }];
        }
      );
    },
  });
}

export function useUpdateCart(newCart: TCartData) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cartData: { productId: string; quantity: string }) =>
      await fetch("/api/cart/" + newCart._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(cartData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.status) {
            throw new Error(res.message);
          }
          return res.cart;
        }),
    onError: (error) => {
      toaster.create({
        title: `Failed to update cart`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: () => {
      toaster.create({
        title: `Updated Cart Successfully`,
        type: "success",
      });

      queryClient.setQueryData(
        ["cart"],
        (old: TCartData[] | undefined): TCartData[] => {
          if (!Array.isArray(old)) return [];
          return old.map((p) => (p._id === newCart._id ? newCart : p));
        }
      );
    },
  });
}

export function useCartDel(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      await fetch("/api/cart/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.status) {
            throw new Error(res.message);
          }
          return res.cart;
        }),
    onError: (error) => {
      toaster.create({
        title: `Failed to delete`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: () => {
      toaster.create({
        title: `Deleted Successfully`,
        type: "success",
      });

      queryClient.setQueryData(
        ["cart"],
        (old: TCartData[] | undefined): TCartData[] => {
          if (!Array.isArray(old)) return [];
          return old.filter((p) => p._id !== id);
        }
      );
    },
  });
}
