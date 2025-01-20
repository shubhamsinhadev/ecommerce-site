import { IProduct } from "@/utils/productType";
import { Grid, GridItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../product/ProductCard";
import { Button } from "../ui/button";
import { ArrowDownUp } from "lucide-react";
import ProductFilter from "../product/ProductFilter";

const fetchProducts = async () => {
  return await fetch("/api/product")
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        throw new Error("Failed to fetch products");
      }
      return res.products;
    });
};

export default function Home() {
  const { isPending, isError, data, error } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

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
          <Button colorPalette="blue" variant="solid">
            <ArrowDownUp /> Sort
          </Button>
        </GridItem>
        {data.map((product) => (
          <ProductCard product={product} />
        ))}
      </Grid>
    </>
  );
}
