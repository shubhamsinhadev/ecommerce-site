import { Box, Card } from "@chakra-ui/react";
import ProductMain from "../product/ProductMain";
import PriceFilter from "../product/PriceFilter";
import CategoryFilter from "../product/CategoryFilter";

function Home() {
  return (
    <Box display={"flex"} maxW={"1200px"} mx={"auto"}>
      <FilterLg />
      <ProductMain />
    </Box>
  );
}

export default Home;

const FilterLg = () => {
  return (
    <Box
      p={3}
      display={{ base: "none", md: "block" }}
      w={"220px"}
      flexShrink={0}
      position={"relative"}
      mr={6}
    >
      <div style={{ width: "100%", height: "52px" }}></div>
      <Card.Root
        variant="outline"
        p={2}
        display={"flex"}
        flexDir={"column"}
        gap={2}
        w={"220px"}
        height="calc(500px)"
        position={"fixed"}
        px={4}
        py={20}
      >
        <PriceFilter />
        <CategoryFilter />
      </Card.Root>
    </Box>
  );
};
