import { useIsMutating } from "@tanstack/react-query";
import { StepperInput } from "../ui/stepper-input";
import { TCartData, useUpdateCart } from "@/hooks/cart";

export default function CartStepper({ i }: { i: TCartData }) {
  const { quantity, _id } = i;

  const mutation = useUpdateCart(i);

  const isDeleted = useIsMutating({ mutationKey: ["cart/del", _id] }) > 0;

  const handleChange = (value: string) => {
    if (Number(value) > 0) {
      mutation.mutate(value);
    }
  };

  return (
    <>
      <StepperInput
        value={String(quantity)}
        onValueChange={(e) => handleChange(e.value)}
        colorPalette={"blue"}
        size={"xs"}
        min={1}
        disabled={mutation.isPending || isDeleted}
      />
    </>
  );
}
