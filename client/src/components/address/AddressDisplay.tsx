import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "../ui/empty-state";
import { FaRegAddressBook } from "react-icons/fa";
import { fetchAddress, TAddressData } from "@/utils/address";
import { Badge, Card, Center, Flex, Spinner, Text } from "@chakra-ui/react";

export default function AddressDisplay() {
  const { isPending, isError, data, error } = useQuery<TAddressData[]>({
    queryKey: ["address"],
    queryFn: fetchAddress,
  });

  if (isPending)
    return (
      <Center h={184} w={"100%"}>
        <Spinner size="xl" color="colorPalette.600" colorPalette={"blue"} />
      </Center>
    );
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No Address Found</div>;

  if (data.length === 0)
    return <EmptyState icon={<FaRegAddressBook />} title="No address Found" />;

  return (
    <Flex flexDir={"column"}>
      {data.map((address) => (
        <AddressCard key={address._id} data={address} />
      ))}
    </Flex>
  );
}

const AddressCard = ({ data }: { data: TAddressData }) => {
  return (
    <Card.Root
      p={4}
      display={"flex"}
      flexDir={"column"}
      alignItems={"flex-start"}
      gap={2}
    >
      <Badge variant="solid" colorPalette="blue">
        {data.addressType}
      </Badge>
      <Flex gap={4} alignItems={"center"}>
        <Card.Title
          textStyle="md"
          fontWeight={"bold"}
          color={"gray.800"}
          letterSpacing={"tight"}
        >
          {data.name.toUpperCase()}
        </Card.Title>
        <Text fontSize={"sm"} fontWeight={"semibold"}>
          {data.phoneNo}
        </Text>
      </Flex>

      <Text color="fg.muted" fontSize={"sm"}>
        {data.address}, {data.cityDistrictTown}, {data.state},
        <Text fontWeight={"bold"}>{data.pincode}</Text>
      </Text>
    </Card.Root>
  );
};
