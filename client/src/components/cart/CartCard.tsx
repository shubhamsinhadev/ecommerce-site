import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { LoadingImage } from "../misc/LoadingImage";
import { TCartData } from "@/hooks/cart";
import CartStepper from "./CartStepper";
import CartDelete from "./CartDelete";

export default function CartCard({ i }: { i: TCartData }) {
  const { product } = i;
  return (
    <Card.Root
      bgColor={"white"}
      maxW={"md"}
      w={"100%"}
      p={2}
      shadow={"sm"}
      aspectRatio={"3/1"}
      display={"flex"}
      flexDir={"row"}
      gap={2}
    >
      <Box
        borderWidth="1px"
        borderColor="border.disabled"
        color="fg.disabled"
        h={"100%"}
        aspectRatio={"1/1"}
        borderRadius="md"
        p={1}
      >
        <LoadingImage src={product.image} title={product.title} />
      </Box>

      <Flex flex={1} flexDir={"column"} gap={2}>
        <Text
          lineClamp={2}
          fontWeight={"medium"}
          color={"gray.800"}
          fontSize={"sm"}
        >
          {product.title}
        </Text>
        <Text lineClamp={2} fontWeight={"bold"} fontSize={"md"}>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(product.price)}
        </Text>
        <div style={{ flex: 1 }}></div>
        <CartStepper i={i} />
      </Flex>
      <CartDelete id={i._id} />
    </Card.Root>
  );
}
