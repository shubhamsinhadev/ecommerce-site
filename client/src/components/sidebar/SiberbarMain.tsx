import { IconButton } from "@chakra-ui/react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { DrawerBackdrop, DrawerContent, DrawerRoot } from "../ui/drawer";

export default function SiberbarMain() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        aria-label="icon"
        color={"black"}
        colorPalette={"blue"}
        variant={"ghost"}
        height={"100%"}
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <DrawerRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement={"start"}
      >
        <DrawerBackdrop />
        <DrawerContent
          px={6}
          py={50}
          width={"50%"}
          maxWidth={"220px"}
        ></DrawerContent>
      </DrawerRoot>
    </>
  );
}
