import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function Navbar() {
  return (
    <>
      <Box
        shadow="md"
        width={"100%"}
        height={16}
        position={"fixed"}
        top={0}
        left={0}
      ></Box>
      <Box width={"100%"} height={16}></Box>
      <Outlet />
    </>
  );
}
