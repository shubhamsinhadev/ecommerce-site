import { useFetchAddress } from "@/hooks/address";
import AddressAdd from "../address/AddressAdd";
import {
  Badge,
  Box,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { EmptyState } from "../ui/empty-state";
import { FaRegAddressBook } from "react-icons/fa";
import { TAddressData } from "@/utils/address";
import { useState } from "react";
import AddressDelete from "../address/AddressDelete";
import AddressEdit from "../address/AddressEdit";
import { Checkbox } from "../ui/checkbox";
import { IOrderProps } from "@/utils/orders";
import { StepsNextTrigger, StepsPrevTrigger } from "../ui/steps";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";

export default function CheckoutAddress({ order, setOrder }: IOrderProps) {
  const isAddressSelected = !order.address ? true : false;
  return (
    <>
      <CheckoutAddressDisplay order={order} setOrder={setOrder} />
      <AddressAdd />
      <Group mt={4} justifyContent={"space-between"}>
        <StepsPrevTrigger asChild>
          <Button variant="outline" size="sm" visibility={"hidden"}>
            Back
          </Button>
        </StepsPrevTrigger>
        <StepsNextTrigger asChild>
          <Button variant="solid" size="sm" disabled={isAddressSelected}>
            Order Summary <MoveRight />
          </Button>
        </StepsNextTrigger>
      </Group>
    </>
  );
}

function CheckoutAddressDisplay({ order, setOrder }: IOrderProps) {
  const { isPending, isError, data, error } = useFetchAddress();

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
    <Grid
      gap={4}
      flexDir={"column"}
      gridTemplateRows={`repeat(${data.length}, 1fr)`}
    >
      {data.map((address) => (
        <CheckoutAddressCard
          key={address._id}
          data={address}
          order={order}
          setOrder={setOrder}
        />
      ))}
    </Grid>
  );
}

const CheckoutAddressCard = ({
  data,
  order,
  setOrder,
}: IOrderProps & { data: TAddressData }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const isSelected = order.address?._id === data._id;

  const handleChange = (value: boolean) => {
    setOrder((prev) => {
      return { ...prev, address: value ? data : undefined };
    });
  };

  return (
    <Card.Root
      p={2}
      display={"flex"}
      flexDir={"row"}
      gap={2}
      w={"100%"}
      pos="relative"
      alignItems={"start"}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={(e) => handleChange(!!e.checked)}
      />
      <Box display={"flex"} flexDir={"column"} gap={0} flex={1}>
        <Flex alignItems={"start"} w={"100%"} gap={2}>
          <Badge variant="subtle" colorPalette="blue">
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

        <Text color="fg.muted" mt={4} fontSize={"md"} lineClamp={3}>
          {data.address}, {data.cityDistrictTown}, {data.state},{" "}
          <Text as="span" fontWeight={"bold"}>
            {data.pincode}
          </Text>
        </Text>
      </Box>

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
