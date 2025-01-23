import { IProduct } from "@/utils/productType";
import { Button } from "../ui/button";
import { useAdd2Cart } from "@/hooks/cart";

export default function Add2Cart({ product }: { product: IProduct }) {
  const mutation = useAdd2Cart(product);

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <>
      <Button
        onClick={handleSubmit}
        loading={mutation.isPending}
        colorPalette={"blue"}
        loadingText={"Adding to cart..."}
      >
        Add to Cart
      </Button>
    </>
  );
}
