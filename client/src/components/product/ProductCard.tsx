import { IProduct } from "@/utils/productType";
import { Card, Flex, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { Hash } from "lucide-react";
import { Link } from "react-router";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card.Root
      key={product._id}
      variant="outline"
      p={2}
      display={"flex"}
      flexDir={"column"}
      gap={2}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          aspectRatio: "1/1",
          width: "100%",
          objectFit: "contain",
        }}
      />
      <Link
        to={{
          search: `?category=${product.category}`,
        }}
      >
        <Flex align="center" color={"gray.500"}>
          <Hash size={"0.75rem"} />
          <Card.Title textStyle="xs">{product.category}</Card.Title>
        </Flex>
      </Link>

      <Card.Title
        textStyle="md"
        lineClamp={2}
        fontWeight={"medium"}
        color={"gray.800"}
        letterSpacing={"tight"}
      >
        {product.title}
      </Card.Title>
      <div style={{ flex: 1 }}></div>
      <Text textStyle="xl" fontWeight={"bold"}>
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(product.price)}
      </Text>
      <Button colorPalette={"blue"}>Add to Cart</Button>
    </Card.Root>
  );
}
