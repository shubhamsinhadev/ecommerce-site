import ProductCard from "../product/ProductCard";
import { useSearchParams } from "react-router";
import { useFetchProduct } from "@/hooks/product";
import ProductLoading from "./ProductLoading";

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
