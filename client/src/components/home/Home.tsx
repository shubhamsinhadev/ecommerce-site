import { IProduct } from "@/utils/productType";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import ProductCard from "../product/ProductCard";
import ProductFilter from "../product/ProductFilter";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import ProductSort from "../product/ProductSort";

const fetchProducts = async (query: string) => {
  return await fetch("/api/product?" + query)
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        throw new Error("Failed to fetch products");
      }
      return res.products;
    });
};

export default function Home() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  const { isPending, isError, data, error } = useQuery<IProduct[]>({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({
        queryKey: ["products", query],
      });
    };
  }, [query, queryClient]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data || data.length === 0) {
    return <span>Data Corrupted or Nothing to show</span>;
  }

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={3}
        p={3}
        maxWidth={"breakpoint-lg"}
        mx={"auto"}
      >
        <GridItem
          colSpan={{
            base: 2,
            md: 3,
            lg: 4,
          }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <ProductFilter />
          <ProductSort />
        </GridItem>
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </>
  );
}
