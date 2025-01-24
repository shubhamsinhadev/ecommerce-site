import { StepperInput } from "../ui/stepper-input";
import { TCartData, useUpdateCart } from "@/hooks/cart";

export default function CartStepper({ i }: { i: TCartData }) {
  const { quantity } = i;

  const mutation = useUpdateCart(i);

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
        disabled={mutation.isPending}
      />
    </>
  );
}
