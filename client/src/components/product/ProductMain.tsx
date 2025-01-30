import { Flex } from "@chakra-ui/react";
import ProductFilter from "../product/ProductFilter";
import ProductSort from "../product/ProductSort";
import ProductPagination from "./ProductPagination";
import Products from "./Products";

export default function ProductMain() {
  return (
    <>
      <Flex gap={3} p={3} flex={1} flexDir={"column"}>
        <Flex
          display={"flex"}
          justifyContent={{ base: "space-between", md: "flex-end" }}
        >
          <ProductFilter />
          <ProductSort />
        </Flex>

        <Products />

        <Flex display={"flex"} justifyContent={"center"}>
          <ProductPagination />
        </Flex>
      </Flex>
    </>
  );
}
