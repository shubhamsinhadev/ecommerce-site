import { useCartDel } from "@/hooks/cart";
import { Box, IconButton } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";

export default function CartDelete({ id }: { id: string }) {
  const mutation = useCartDel(id);

  return (
    <Box>
      <IconButton
        aria-label="Delete Cart Item"
        size={"2xs"}
        colorPalette={"red"}
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      >
        <Trash2 />
      </IconButton>
    </Box>
  );
}
