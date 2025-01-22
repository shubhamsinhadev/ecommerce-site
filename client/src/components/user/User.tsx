import { Box, Tabs } from "@chakra-ui/react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
export default function User() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/user") {
    return <Navigate to="/user/profile" />;
  }

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
        <Tabs.Root
          colorPalette={"blue"}
          variant="line"
          maxW="md"
          fitted
          defaultValue={"tab-1"}
        >
          <Tabs.List>
            <Tabs.Trigger
              value="tab-1"
              onClick={() => navigate("/user/profile")}
            >
              Profile
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab-2"
              onClick={() => navigate("/user/address")}
            >
              Address
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab-3"
              onClick={() => navigate("/user/profile")}
            >
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
        <Outlet />
      </Box>
    </Box>
  );
}
