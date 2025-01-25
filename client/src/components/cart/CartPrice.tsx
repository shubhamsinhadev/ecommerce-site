import { useAppSelector } from "@/redux/hooks";
import { Card, Flex, Separator, Text } from "@chakra-ui/react";
import { InfoTip } from "../ui/toggle-tip";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";

type IList = { label: string; value: number; content?: ReactNode };

export default function CartPrice() {
  const data = useAppSelector((state) => state.cart);

  const price = data.reduce((acc: number, { product, quantity }) => {
    acc += product.price * quantity;
    return acc;
  }, 0);

  const List: IList[] = [
    { label: "Subtotal", value: price },
    {
      label: "Shipping",
      value: 50,
      content: (
        <Text p={1}>
          Flat{" "}
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(50)}
        </Text>
      ),
    },
    {
      label: "Taxes",
      value: price * 0.1,
      content: <Text p={1}>10% GST</Text>,
    },
    { label: "Total Amount", value: price * 1.1 + 50 },
  ];

  return (
    <Card.Root
      bgColor={"white"}
      maxW={"md"}
      w={"100%"}
      p={4}
      shadow={"sm"}
      display={"flex"}
      flexDir={"column"}
      gap={4}
    >
      {List.map(({ label, value, content }, idx) => (
        <React.Fragment key={label}>
          <Flex alignItems={"center"}>
            <Text color={"gray.800"}>{label}</Text>
            {content && <InfoTip content={content} />}
            <div style={{ flex: 1 }}></div>
            <Text fontWeight={"bold"} fontSize={"md"}>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(value)}
            </Text>
          </Flex>
          {idx == 2 && <Separator mx={0} />}
        </React.Fragment>
      ))}
      <>
        <Separator mx={-4} />
        <Button colorPalette={"blue"} size={"lg"}>
          Checkout
        </Button>
      </>
    </Card.Root>
  );
}
