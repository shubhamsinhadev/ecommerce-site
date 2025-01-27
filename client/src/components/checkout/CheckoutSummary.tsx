import { IOrderProps } from "@/utils/orders";
import { Card, Flex, Text, Box, Separator, Badge } from "@chakra-ui/react";
import { LoadingImage } from "../misc/LoadingImage";
import { TCartData, useFetchCart } from "@/hooks/cart";
import CartStepper from "../cart/CartStepper";
import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks";
import { InfoTip } from "../ui/toggle-tip";
import { TAddressData } from "@/utils/address";

export default function CheckoutSummary({ order, setOrder }: IOrderProps) {
  const { address } = order;

  const { data: cartData } = useFetchCart();

  return (
    <Card.Root
      shadow={"sm"}
      w={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={2}
      p={4}
    >
      <CheckoutSummaryAddress data={address as TAddressData} />
      {cartData.map((i) => (
        <React.Fragment key={i.productId}>
          <CheckoutSummaryCart i={i} />
          <Separator mx={-4} />
        </React.Fragment>
      ))}
      <CheckoutSummaryPrice />
    </Card.Root>
  );
}

const CheckoutSummaryCart = ({ i }: { i: TCartData }) => {
  const { product } = i;
  return (
    <Box w={"100%"} display={"flex"} flexDir={"row"} gap={2}>
      <Box
        borderWidth="1px"
        borderColor="border.disabled"
        color="fg.disabled"
        w={"25%"}
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
    </Box>
  );
};

const CheckoutSummaryPrice = () => {
  const data = useAppSelector((state) => state.cart);

  type IList = { label: string; value: number; content?: ReactNode };

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
    <Box display={"flex"} flexDir={"column"} gap={4}>
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
          {idx == 2 && <Separator mx={-4} />}
        </React.Fragment>
      ))}
    </Box>
  );
};

const CheckoutSummaryAddress = ({ data }: { data: TAddressData }) => {
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"row"}
        gap={2}
        w={"100%"}
        pos="relative"
        alignItems={"start"}
      >
        <Box display={"flex"} flexDir={"column"} gap={0} flex={1}>
          <Flex alignItems={"start"} w={"100%"} gap={2}>
            <Badge variant="subtle" colorPalette="blue">
              {data.addressType}
            </Badge>
            <div style={{ flex: 1 }}></div>
          </Flex>

          <Flex gap={4} alignItems={"center"}>
            <Card.Title
              textStyle="md"
              fontWeight={"bold"}
              color={"gray.800"}
              letterSpacing={"tight"}
            >
              {data.name.toUpperCase()}
            </Card.Title>
            <Text fontSize={"md"} fontWeight={"semibold"}>
              {data.phoneNo}
            </Text>
          </Flex>

          <Text color="fg.muted" mt={2} fontSize={"md"} lineClamp={3}>
            {data.address}, {data.cityDistrictTown}, {data.state},{" "}
            <Text as="span" fontWeight={"bold"}>
              {data.pincode}
            </Text>
          </Text>
        </Box>
      </Box>
      <Separator mx={-4} />
    </>
  );
};
