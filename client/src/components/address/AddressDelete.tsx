import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  DialogRoot,
  DialogTrigger,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { IconButton } from "@chakra-ui/react";
import { delAddress } from "@/utils/address";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../ui/toaster";

export default function AddressDelete({
  setIsDeleting,
  id,
}: {
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  id: string;
}) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => delAddress(id),
    onError: (error) => {
      toaster.create({
        title: `Failed to delete address`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: () => {
      toaster.create({
        title: `Address Deleted Successfully`,
        type: "success",
      });
    },
    onSettled: () => setOpen(false),
  });

  return (
    <>
      <DialogRoot
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        size={"xs"}
      >
        <DialogTrigger asChild>
          <IconButton
            aria-label="Delete address"
            size={"2xs"}
            colorPalette={"red"}
            onClick={() => setIsDeleting(true)}
          >
            <Trash2 />
          </IconButton>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
          </DialogHeader>
          <DialogBody>Click yes to confirm ?</DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button
                variant="outline"
                colorPalette={"blue"}
                onClick={() => setIsDeleting(false)}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button colorPalette={"blue"} onClick={() => mutation.mutate()}>
              Yes
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
