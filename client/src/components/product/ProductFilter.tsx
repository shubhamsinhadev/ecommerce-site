import { Filter } from "lucide-react";
import { useState } from "react";
import { DrawerBackdrop, DrawerContent, DrawerRoot } from "../ui/drawer";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

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
        <DrawerContent px={4} py={50}>
          <PriceFilter />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}

const PriceFilter = () => {
  
  
  
  const [value, setValue] = useState<number[]>([20, 80]);

  
  
  
  
  
  
  
  return (
    <Flex direction={"column"} gap={2}>
      <Heading size="lg">Price</Heading>
      <Slider
        value={value}
        onValueChange={(e) => setValue(e.value)}
        max={1000}
      />
      <Flex justifyContent={"space-between"}>
        <Text>Min Price : {value[0]}</Text>
        <Text>Max Price : {value[1]}</Text>
      </Flex>
    </Flex>
  );
};
