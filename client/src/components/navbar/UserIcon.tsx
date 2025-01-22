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
          <MenuItemGroup title="Styles">
            <MenuItem value="bold">Bold</MenuItem>
            <MenuItem value="underline">Underline</MenuItem>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup title="Align">
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="middle">Middle</MenuItem>
            <MenuItem value="right">Right</MenuItem>
          </MenuItemGroup>
        </MenuContent>
      </MenuRoot>
    </>
  );
}
