import { useState } from "react";
import { StepperInput } from "../ui/stepper-input";
import { TCartData, useUpdateCart } from "@/hooks/cart";

export default function CardStepper({ i }: { i: TCartData }) {
  const [value, setValue] = useState(i.quantity.toString());

  const mutation = useUpdateCart(i);

  return (
    <StepperInput
      value={value}
      onValueChange={(e) => setValue(e.value)}
      colorPalette={"blue"}
      size={"xs"}
      min={1}
      onClick={() => mutation.mutate({ productId: i._id, quantity: value })}
      disabled={mutation.isPending}
    />
  );
}
