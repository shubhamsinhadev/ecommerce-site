import { Circle, Float, IconButton, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { ShoppingBag } from "lucide-react";
import { useFetchCart } from "@/hooks/cart";

export default function CartIcon() {
  const navigate = useNavigate();
  const { isPending, data } = useFetchCart();

  const total = data ? data.length : 0;

  return (
    <IconButton
      aria-label="icon"
      color={"black"}
      colorPalette={"blue"}
      variant={"ghost"}
      height={"100%"}
      onClick={() => navigate("/cart")}
      pos={"relative"}
    >
      <ShoppingBag />
      <Float offsetX={2} offsetY={1.5}>
        <Circle size="5" bg="blue.600" color="white">
          {isPending ? <Spinner size="xs" /> : total}
        </Circle>
      </Float>
    </IconButton>
  );
}
