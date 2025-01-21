import { Box } from "@chakra-ui/react";
import { Menu, Package, ShoppingBag } from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import { IconButton } from "@chakra-ui/react";
import Searchbar from "./Searchbar";

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
          maxWidth={"breakpoint-md"}
          display={"flex"}
          px={1.5}
          py={3}
        >
          <IconButton
            aria-label="icon"
            color={"black"}
            colorPalette={"blue"}
            variant={"ghost"}
            height={"100%"}
            onClick={() => navigate("/")}
          >
            <Menu />
          </IconButton>

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

          <IconButton
            aria-label="icon"
            color={"black"}
            colorPalette={"blue"}
            variant={"ghost"}
            height={"100%"}
            onClick={() => navigate("/cart")}
          >
            <ShoppingBag />
          </IconButton>
        </Box>
      </Box>
      <Box width={"100%"} height={16}></Box>
      <Outlet />
    </>
  );
}
