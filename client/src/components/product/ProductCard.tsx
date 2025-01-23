import { IProduct } from "@/utils/productType";
import { Card, Flex, Text } from "@chakra-ui/react";
import { Hash } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Add2Cart from "../button/Add2Cart";

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
      <ProductImage src={product.image} title={product.title} />
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
      <Add2Cart product={product} />
    </Card.Root>
  );
}

const ProductImage = ({ src, title }: { src: string; title: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <img
        src={src}
        alt={title}
        style={{
          aspectRatio: "1/1",
          width: "100%",
          objectFit: "contain",
          visibility: isLoading ? "hidden" : "visible",
          position: isLoading ? "absolute" : "relative",
        }}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && <Skeleton aspectRatio={"1/1"} />}
    </>
  );
};
