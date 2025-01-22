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

export default function UserIcon() {
  const navigate = useNavigate();
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
        </MenuContent>
      </MenuRoot>
    </>
  );
}
