import { useFetchCart } from "@/hooks/cart";
import CartEmpty from "./CartEmpty";
import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { LoadingImage } from "../misc/LoadingImage";
import CardStepper from "./CardStepper";
import CartDelete from "./CartDelete";

export default function CartDisplay() {
  const { isPending, isError, error, data } = useFetchCart();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (!data) return <div>No items in the cart</div>;

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
            key={i._id}
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
              <CardStepper i={i} />
            </Flex>
            <CartDelete id={i._id} />
          </Card.Root>
        );
      })}
    </Box>
  );
}
