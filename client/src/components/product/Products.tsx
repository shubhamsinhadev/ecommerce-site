import { IProduct } from "@/utils/productType";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductCard from "../product/ProductCard";
import { useSearchParams } from "react-router";
import { Card } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "../ui/skeleton";

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

export default function Products() {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  const { isPending, isError, data, error } = useQuery<IProduct[]>({
    queryKey: ["products", query],
    queryFn: ({ signal }) => fetchProducts(query, signal),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <ProductLoading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data || data.length === 0) {
    return <span>Data Corrupted or Nothing to show</span>;
  }
  return (
    <>
      {data.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  );
}

const ProductLoading = () => {
  return (
    <>
      {[...Array(12)].map((_, index) => (
        <Card.Root
          key={index}
          variant="outline"
          p={2}
          display={"flex"}
          flexDir={"column"}
          gap={2}
          w={"100%"}
          aspectRatio={"2/3"}
        >
          <Skeleton aspectRatio={"square"} />
          <SkeletonText noOfLines={1} />
          <SkeletonText noOfLines={2} />
          <SkeletonText noOfLines={1} />
          <Skeleton height={"40px"} />
        </Card.Root>
      ))}
    </>
  );
};
