import { useCartDel } from "@/hooks/cart";
import { Box, IconButton } from "@chakra-ui/react";
import { useIsMutating } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

export default function CartDelete({ id }: { id: string }) {
  const mutation = useCartDel(id);
  const isCartUpdated = useIsMutating({ mutationKey: ["cart/update", id] }) > 0;

  return (
    <Box>
      <IconButton
        aria-label="Delete Cart Item"
        size={"2xs"}
        colorPalette={"red"}
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || isCartUpdated}
      >
        <Trash2 />
      </IconButton>
    </Box>
  );
}
