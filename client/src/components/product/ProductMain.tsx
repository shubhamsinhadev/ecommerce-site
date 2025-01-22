import { Grid, GridItem } from "@chakra-ui/react";
import ProductFilter from "../product/ProductFilter";
import ProductSort from "../product/ProductSort";
import ProductPagination from "./ProductPagination";
import Products from "./Products";

export default function ProductMain() {
  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={3}
        p={3}
        flex={1}
      >
        <GridItem
          colSpan={{
            base: 2,
            md: 3,
            lg: 4,
          }}
          display={"flex"}
          justifyContent={{ base: "space-between", md: "flex-end" }}
        >
          <ProductFilter />
          <ProductSort />
        </GridItem>

        <Products />

        <GridItem
          colSpan={{
            base: 2,
            md: 3,
            lg: 4,
          }}
          display={"flex"}
          justifyContent={"center"}
        >
          <ProductPagination />
        </GridItem>
      </Grid>
    </>
  );
}
