import { Box, Card, Group } from "@chakra-ui/react";
import {
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "../ui/steps";
import { Button } from "../ui/button";
import { IndianRupee, MapPin, ReceiptText } from "lucide-react";
import { useState } from "react";
import CheckoutAddress from "./CheckoutAddress";
import { useFetchAddress } from "@/hooks/address";
import { IOrder } from "@/utils/orders";
import { useFetchCart } from "@/hooks/cart";
import CheckoutSummary from "./CheckoutSummary";
import { Navigate } from "react-router";

function CheckoutMain() {
  const [step, setStep] = useState(0);

  const { isPending: cartLoading, data: cartData } = useFetchCart();
  const { isPending: addressLoading } = useFetchAddress();

  const [order, setOrder] = useState<IOrder>({
    cart: undefined,
    address: undefined,
  });

  const isAddressSelected = !order.address ? true : false;

  if (addressLoading || cartLoading) {
    return <div>Loading...</div>;
  }

  if (!cartData || cartData.length == 0) {
    return <Navigate to={"/cart"} />;
  }

  return (
    <Box
      bg={"gray.100"}
      w={"100%"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      gap={2}
      minH={"calc(100dvh - 64px)"}
      p={2}
      pt={12}
    >
      <Card.Root
        bgColor={"white"}
        maxW={"lg"}
        w={"100%"}
        p={8}
        shadow={"sm"}
        display={"flex"}
        flexDir={"row"}
        gap={2}
      >
        <StepsRoot
          step={step}
          onStepChange={(e) => setStep(e.step)}
          count={3}
          defaultStep={0}
          colorPalette={"blue"}
          size={"sm"}
        >
          <StepsList>
            <StepsItem index={0} title="Address" icon={<MapPin />} />
            <StepsItem index={1} title="Summary" icon={<ReceiptText />} />
            <StepsItem index={2} title="Payment" icon={<IndianRupee />} />
          </StepsList>
          {step === 0 && <CheckoutAddress order={order} setOrder={setOrder} />}
          {step === 1 && <CheckoutSummary order={order} setOrder={setOrder} />}
          <Group mt={4} justifyContent={"space-between"}>
            <StepsPrevTrigger asChild>
              <Button variant="outline" size="sm">
                Back
              </Button>
            </StepsPrevTrigger>
            <StepsNextTrigger asChild>
              <Button variant="solid" size="sm" disabled={isAddressSelected}>
                Next
              </Button>
            </StepsNextTrigger>
          </Group>
        </StepsRoot>
      </Card.Root>
    </Box>
  );
}

export default CheckoutMain;
