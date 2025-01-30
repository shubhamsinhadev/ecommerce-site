import ProductCard from "../product/ProductCard";
import { useSearchParams } from "react-router";
import { useFetchProduct } from "@/hooks/product";
import ProductLoading from "./ProductLoading";
import { Grid } from "@chakra-ui/react";
import { EmptyState } from "../ui/empty-state";
import { Ban } from "lucide-react";

export default function Products() {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  const { isPending, isError, data, error } = useFetchProduct(query);

  if (isPending) {
    return <ProductLoading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <span>Data Corrupted </span>;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={<Ban />}
        title="No products found"
        description="Please try a different search"
        flex={1}
      />
    );
  }

  return (
    <Grid
      gap={3}
      flex={1}
      gridTemplateColumns={"repeat(2, 1fr)"}
      css={{
        "@media (min-width: 30em)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media (min-width: 40em)": {
          gridTemplateColumns: "repeat(3, 1fr)",
        },
        "@media (min-width: 48em)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media (min-width: 56em)": {
          gridTemplateColumns: "repeat(3, 1fr)",
        },
        "@media (min-width: 62em)": {
          gridTemplateColumns: "repeat(4, 1fr)",
        },
      }}
    >
      {data.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Grid>
  );
}
