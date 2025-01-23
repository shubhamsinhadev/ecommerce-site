import { chakra, IconButton } from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addressFields,
  editAddress,
  TAddress,
  TAddressData,
  ZAddress,
} from "@/utils/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../ui/toaster";
import AddressField from "./AddressField";

export default function AddressEdit({
  addressData,
}: {
  addressData: TAddressData;
}) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: TAddress) => editAddress(addressData._id, data),
    onError: (error) => {
      toaster.create({
        title: `Failed to edit address`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: () => {
      toaster.create({
        title: `Address Edited Successfully`,
        type: "success",
      });
    },
    onSettled: () => setOpen(false),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddress>({
    values: addressData,
    resolver: zodResolver(ZAddress),
  });

  const onSubmit: SubmitHandler<TAddress> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <DialogRoot
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        size={"md"}
      >
        <DialogTrigger asChild>
          <IconButton
            aria-label="Edit address"
            size={"2xs"}
            colorPalette={"blue"}
          >
            <Pencil />
          </IconButton>
        </DialogTrigger>
        <DialogContent w={"90%"}>
          <DialogHeader p={4}>
            <DialogTitle fontSize={"lg"}>Add Address</DialogTitle>
          </DialogHeader>
          <DialogBody p={4}>
            <chakra.form
              display={"grid"}
              gridTemplateColumns={"repeat(2, 1fr)"}
              gap={4}
              onSubmit={handleSubmit(onSubmit)}
            >
              {addressFields.map(({ label, value }) => {
                return (
                  <AddressField
                    key={label}
                    label={label}
                    value={value as keyof TAddress}
                    register={register}
                    errors={errors}
                    control={control}
                  />
                );
              })}
              <Button
                gridColumn={"span 2"}
                loading={mutation.isPending}
                loadingText="Submitting..."
                type="submit"
                colorPalette={"blue"}
              >
                Submit
              </Button>
            </chakra.form>
          </DialogBody>

          <DialogCloseTrigger colorPalette={"blue"} />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
