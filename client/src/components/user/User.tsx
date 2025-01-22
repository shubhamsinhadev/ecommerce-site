import { Box, Center, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "../ui/avatar";
import { DataListItem, DataListRoot } from "../ui/data-list";
import { TUserDetials } from "@/utils/types";

const fetchUser = async () => {
  return await fetch("/api/auth/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        throw new Error(res.message);
      }
      return res.user;
    });
};

export default function User() {
  const { isPending, isError, data, error } = useQuery<TUserDetials>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (isPending) return <div>Loading....</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Something went wrong</div>;

  const { name, email } = data;

  const userData = {
    Name: name,
    Email: email,
  };

  return (
    <Box bg={"gray.100"} w={"100%"} h="calc(100dvh - 64px)" pt={12}>
      <Box
        bg={"white"}
        maxW={"sm"}
        mx={"auto"}
        p={4}
        rounded={"md"}
        display={"flex"}
        flexDir={"column"}
        gap={2}
        shadow={"md"}
      >
        <Center mb={4} w={"100%"}>
          <Avatar variant="outline" size={"2xl"} name={data.name} />
        </Center>

        <DataListRoot orientation="horizontal">
          {Object.entries(userData).map(([key, value], index) => (
            <DataListItem
              key={index}
              label={<Text fontWeight={"bold"}>{key}</Text>}
              value={value}
            />
          ))}
        </DataListRoot>
      </Box>
    </Box>
  );
}
