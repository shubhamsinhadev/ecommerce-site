import { Box, Card, Spinner } from "@chakra-ui/react";
import { StepsItem, StepsList, StepsRoot } from "../ui/steps";
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

  if (addressLoading || cartLoading) {
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
          shadow={"sm"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          aspectRatio={1 / 1}
        >
          <Spinner color="blue.500" size={"xl"} borderWidth="4px" />
        </Card.Root>
      </Box>
    );
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
        </StepsRoot>
      </Card.Root>
    </Box>
  );
}

export default CheckoutMain;
