import { IconButton } from "@chakra-ui/react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";
import {
  MenuRoot,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuSeparator,
  MenuTrigger,
} from "../ui/menu";
import { useLogout } from "@/hooks/auth";

export default function UserIcon() {
  const navigate = useNavigate();
  const logoutFn = useLogout();
  return (
    <>
      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton
            aria-label="icon"
            color={"black"}
            colorPalette={"blue"}
            variant={"ghost"}
            height={"100%"}
            _hover={{
              bg: "blue.600",
              color: "white",
            }}
          >
            <CircleUserRound />
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItemGroup title="Not Logged in ?">
            <MenuItem value="bold" onClick={() => navigate("/login")}>
              Login
            </MenuItem>
            <MenuItem value="underline">Underline</MenuItem>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup title="Profile">
            <MenuItem value="Account" onClick={() => navigate("/user")}>
              Account
            </MenuItem>
            <MenuItem value="Orders">Orders</MenuItem>
            <MenuItem value="Cart" onClick={() => navigate("/cart")}>
              Cart
            </MenuItem>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup title="">
            <MenuItem value="Account" onClick={() => logoutFn.mutate()}>
              Logout
            </MenuItem>
          </MenuItemGroup>
        </MenuContent>
      </MenuRoot>
    </>
  );
}
