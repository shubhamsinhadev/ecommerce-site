import { LuShoppingCart } from "react-icons/lu";
import { EmptyState } from "../ui/empty-state";

export default function Cart() {
  return (
    <>
      <EmptyState
        icon={<LuShoppingCart />}
        title="Your cart is empty"
        description="Explore our products and add items to your cart"
      />
    </>
  );
}
