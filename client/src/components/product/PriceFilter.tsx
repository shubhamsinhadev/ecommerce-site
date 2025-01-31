import { Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { Slider } from "../ui/slider";

const PriceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 6000;

  const initialPrice = [minPrice, maxPrice];

  const [value, setValue] = useState<number[]>(initialPrice);

  const handleChange = (price: number[]) => {
    if (price[0] !== price[1]) {
      setValue(price);
      setSearchParams((prev) => {
        prev.set("minPrice", price[0].toString());
        prev.set("maxPrice", price[1].toString());
        return prev;
      });
    }
  };

  return (
    <Flex direction={"column"} gap={2}>
      <Heading size="md">Price</Heading>
      <Slider
        value={value}
        onValueChange={(e) => handleChange(e.value)}
        max={6000}
        colorPalette={"blue"}
        size={"sm"}
      />
      <Flex justifyContent={"space-between"}>
        <Text fontSize={"xs"}>Min-Price : {value[0]}</Text>
        <Text fontSize={"xs"}>Max-Price : {value[1]}</Text>
      </Flex>
    </Flex>
  );
};

export default PriceFilter;
