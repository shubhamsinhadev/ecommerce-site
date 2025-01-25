import { useFetchCart } from "@/hooks/cart";
import CartEmpty from "./CartEmpty";
import { Box } from "@chakra-ui/react";
import CartCard from "./CartCard";
import CartPrice from "./CartPrice";
export default function CartDisplay() {
  const { isPending, isError, error, data } = useFetchCart();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (!data) return <div>Error in Cart Data</div>;

  if (data.length === 0) return <CartEmpty />;

  return (
    <Box
      bg={"gray.100"}
      w={"100%"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      gap={2}
      minH={"calc(100dvh - 64px)"}
      p={4}
      pt={12}
    >
      {data.map((i) => {
        return <CartCard key={i._id} i={i} />;
      })}
      <CartPrice />
    </Box>
  );
}
