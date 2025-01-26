import { Box, Tabs } from "@chakra-ui/react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
export default function User() {
  const location = useLocation();
  const navigate = useNavigate();

  let value = "tab-1";

  switch (location.pathname) {
    case "/user/profile":
      value = "tab-1";
      break;
    case "/user/address":
      value = "tab-2";
      break;
    case "/user/order":
      value = "tab-3";
      break;
    default:
      return <Navigate to="/user/profile" />;
  }

  return (
    <Box bg={"gray.100"} w={"100%"} h="calc(100dvh - 64px)" p={4} pt={12}>
      <Box
        bg={"white"}
        maxW={"md"}
        mx={"auto"}
        p={4}
        rounded={"md"}
        display={"flex"}
        flexDir={"column"}
        gap={4}
        shadow={"md"}
      >
        <Tabs.Root
          colorPalette={"blue"}
          variant="line"
          w={"100%"}
          fitted
          defaultValue={value}
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
            <Tabs.Trigger value="tab-3" onClick={() => navigate("/user/order")}>
              Orders
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
        <Outlet />
      </Box>
    </Box>
  );
}
