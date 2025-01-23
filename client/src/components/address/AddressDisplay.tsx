import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "../ui/empty-state";
import { FaRegAddressBook } from "react-icons/fa";
import { fetchAddress, TAddressData } from "@/utils/address";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import AddressCard from "./AddressCard";

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
    <Flex flexDir={"column"} gap={4} my={4}>
      {data.map((address) => (
        <AddressCard key={address._id} data={address} />
      ))}
    </Flex>
  );
}
