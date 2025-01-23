import { useFetchCart } from "@/hooks/add2Cart";
import CartEmpty from "./CartEmpty";

export default function CartDisplay() {
  const { isPending, isError, error, data } = useFetchCart();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (!data) return <div>No items in the cart</div>;

  if (data.length === 0) return <CartEmpty />;

  return <div>{JSON.stringify(data)}</div>;
}
