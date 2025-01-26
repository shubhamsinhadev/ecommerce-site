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

function CheckoutMain() {
  const [step, setStep] = useState(0);
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
          {step === 0 && <CheckoutAddress />}
          <Group mt={4} justifyContent={"space-between"}>
            <StepsPrevTrigger asChild>
              <Button variant="outline" size="sm">
                Back
              </Button>
            </StepsPrevTrigger>
            <StepsNextTrigger asChild>
              <Button variant="solid" size="sm">
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
