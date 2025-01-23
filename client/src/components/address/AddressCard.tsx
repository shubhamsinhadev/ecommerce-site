import { TAddressData } from "@/utils/address";
import {
  Badge,
  Box,
  Card,
  Center,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import AddressEdit from "./AddressEdit";
import { useState } from "react";
import AddressDelete from "./AddressDelete";

const AddressCard = ({ data }: { data: TAddressData }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <Card.Root
      p={4}
      display={"flex"}
      flexDir={"column"}
      alignItems={"flex-start"}
      gap={2}
      w={"100%"}
      pos="relative"
    >
      <Flex alignItems={"end"} w={"100%"} gap={2}>
        <Badge variant="solid" colorPalette="blue">
          {data.addressType}
        </Badge>
        <div style={{ flex: 1 }}></div>
        <AddressDelete setIsDeleting={setIsDeleting} id={data._id} />
        <AddressEdit addressData={data} />
      </Flex>

      <Flex gap={4} alignItems={"center"}>
        <Card.Title
          textStyle="md"
          fontWeight={"bold"}
          color={"gray.800"}
          letterSpacing={"tight"}
        >
          {data.name.toUpperCase()}
        </Card.Title>
        <Text fontSize={"md"} fontWeight={"semibold"}>
          {data.phoneNo}
        </Text>
      </Flex>

      <Text color="fg.muted" fontSize={"md"} lineClamp={3}>
        {data.address}, {data.cityDistrictTown}, {data.state},
        <Text fontWeight={"bold"}>{data.pincode}</Text>
      </Text>
      {isDeleting && (
        <Box pos="absolute" inset="0" bg="blue.100/40">
          <Center h="full">
            <Spinner color="blue.600" size={"lg"} borderWidth="4px" />
          </Center>
        </Box>
      )}
    </Card.Root>
  );
};

export default AddressCard;
