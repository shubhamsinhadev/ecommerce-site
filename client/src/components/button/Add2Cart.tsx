import { IProduct } from "@/utils/productType";
import { Button } from "../ui/button";
import { useAdd2Cart } from "@/hooks/add2Cart";

export default function Add2Cart({ product }: { product: IProduct }) {
  const mutation = useAdd2Cart();

  const handleSubmit = () => {
    mutation.mutate(product._id);
  };

  return (
    <>
      <Button onClick={handleSubmit} colorPalette={"blue"}>
        Add to Cart
      </Button>
    </>
  );
}
