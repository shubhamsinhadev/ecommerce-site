import { IProduct } from "@/utils/productType";
import { Card, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";

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

  if (!data) {
    return <span>Data Corrupted</span>;
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
        {data.map((product) => (
          <Card.Root
            key={product._id}
            variant="outline"
            p={2}
            display={"flex"}
            flexDir={"column"}
            gap={2}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                aspectRatio: "1/1",
                width: "100%",
                objectFit: "contain",
              }}
            />
            <Card.Title textStyle="md" lineClamp={2}>
              {product.title}
            </Card.Title>
            <div style={{ flex: 1 }}></div>
            <Button colorPalette={"blue"}>Add to Cart</Button>
          </Card.Root>
        ))}
      </Grid>
    </>
  );
}
