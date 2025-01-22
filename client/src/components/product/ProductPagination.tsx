import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useSearchParams } from "react-router";

const ProductPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState(initialPage);

  const handleChange = (value: number) => {
    setSearchParams((prev) => {
      prev.set("page", value.toString());
      return prev;
    });
    setPage(value);
  };

  return (
    <PaginationRoot
      count={150}
      pageSize={12}
      variant="solid"
      colorPalette={"blue"}
      page={page}
      onPageChange={(e) => handleChange(e.page)}
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
};

export default ProductPagination;
