import { Card, Grid } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "../ui/skeleton";

const ProductLoading = () => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(3, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={3}
      flex={1}
    >
      {[...Array(12)].map((_, index) => (
        <Card.Root
          key={index}
          variant="outline"
          p={2}
          display={"flex"}
          flexDir={"column"}
          gap={2}
          w={"100%"}
          aspectRatio={"2/3"}
        >
          <Skeleton aspectRatio={"square"} />
          <SkeletonText noOfLines={1} />
          <SkeletonText noOfLines={2} />
          <SkeletonText noOfLines={1} />
          <Skeleton height={"40px"} />
        </Card.Root>
      ))}
    </Grid>
  );
};

export default ProductLoading;
