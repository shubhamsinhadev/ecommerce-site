import { IProduct } from "@/utils/productType";
import { Button } from "../ui/button";
import { useAddCart } from "@/hooks/cart";

export default function Add2Cart({ product }: { product: IProduct }) {
  const mutation = useAddCart(product);

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
