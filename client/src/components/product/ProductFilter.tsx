import { Filter } from "lucide-react";
import { useState } from "react";
import { DrawerBackdrop, DrawerContent, DrawerRoot } from "../ui/drawer";
import { Button } from "../ui/button";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";

export default function ProductFilter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        colorPalette="blue"
        variant="solid"
        onClick={() => setOpen(true)}
        display={{ base: "", md: "none" }}
      >
        <Filter /> Filter
      </Button>
      <DrawerRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement={"start"}
      >
        <DrawerBackdrop />
        <DrawerContent px={6} py={50} width={"50%"} maxWidth={"220px"}>
          <PriceFilter />
          <CategoryFilter />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}
