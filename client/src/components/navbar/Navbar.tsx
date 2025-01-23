import { Box } from "@chakra-ui/react";
import { Package } from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import { IconButton } from "@chakra-ui/react";
import Searchbar from "./Searchbar";
import SiberbarMain from "../sidebar/SiberbarMain";
import UserIcon from "./UserIcon";
import CartIcon from "./CartIcon";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        shadow="md"
        width={"100%"}
        height={16}
        position={"fixed"}
        top={0}
        left={0}
        bg={"white"}
        zIndex={1}
      >
        <Box
          mx={"auto"}
          height={"100%"}
          width={"100%"}
          maxWidth={"breakpoint-sm"}
          display={"flex"}
          px={1.5}
          py={3}
        >
          <SiberbarMain />

          <IconButton
            aria-label="icon"
            color={"black"}
            colorPalette={"blue"}
            variant={"ghost"}
            height={"100%"}
            onClick={() => navigate("/")}
          >
            <Package />
          </IconButton>

          <Searchbar />

          <UserIcon />

          <CartIcon />
        </Box>
      </Box>
      <Box width={"100%"} height={16}></Box>
      <Outlet />
    </>
  );
}
