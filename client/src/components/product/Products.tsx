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
      templateColumns={{
        base: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={3}
      flex={1}
    >
      {data.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Grid>
  );
}
