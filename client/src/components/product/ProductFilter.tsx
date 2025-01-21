import { Filter } from "lucide-react";
import { useState } from "react";
import { DrawerBackdrop, DrawerContent, DrawerRoot } from "../ui/drawer";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router";

export default function ProductFilter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button colorPalette="blue" variant="solid" onClick={() => setOpen(true)}>
        <Filter /> Filter
      </Button>
      <DrawerRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement={"start"}
      >
        <DrawerBackdrop />
        <DrawerContent px={6} py={50}>
          <PriceFilter />
          <CategoryFilter />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}

const PriceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 1000;

  const initialPrice = [minPrice, maxPrice];

  const [value, setValue] = useState<number[]>(initialPrice);

  const handleChange = (price: number[]) => {
    if (price[0] !== price[1]) {
      setValue(price);
      setSearchParams({
        ...searchParams,
        minPrice: price[0].toString(),
        maxPrice: price[1].toString(),
      });
    }
  };

  return (
    <Flex direction={"column"} gap={2}>
      <Heading size="xl">Price</Heading>
      <Slider
        value={value}
        onValueChange={(e) => handleChange(e.value)}
        max={1000}
        colorPalette={"blue"}
      />
      <Flex justifyContent={"space-between"}>
        <Text>Min-Price : {value[0]}</Text>
        <Text>Max-Price : {value[1]}</Text>
      </Flex>
    </Flex>
  );
};

const CategoryFilter = () => {
  const category = ["appliances", "audio", "gaming", "laptop", "mobile", "tv"];
  
  
  return (
    <Flex direction={"column"} mt={4} gap={2}>
      <Heading size="xl">Category</Heading>
    </Flex>
  );
};
