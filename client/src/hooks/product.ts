import { IProduct } from "@/utils/productType";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchProducts = async (query: string, signal: AbortSignal) => {
  return await fetch("/api/product?" + query, { signal })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        throw new Error("Failed to fetch products");
      }
      return res.products;
    });
};

export function useFetchProduct(query: string) {
  return useQuery<IProduct[]>({
    queryKey: ["products", query],
    queryFn: ({ signal }) => fetchProducts(query, signal),
    placeholderData: keepPreviousData,
  });
}
