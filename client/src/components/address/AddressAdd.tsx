import {
  addressAddFn,
  addressFields,
  TAddress,
  ZAddress,
} from "@/utils/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toaster } from "../ui/toaster";
import { chakra, DialogRoot } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import AddressField from "./AddressField";

export default function AddressAdd() {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddress>({
    resolver: zodResolver(ZAddress),
  });

  const mutation = useMutation({
    mutationFn: (data: TAddress) => addressAddFn(data),
    onError: (error) => {
      toaster.create({
        title: `Failed to add address`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: () => {
      toaster.create({
        title: `Address Added Successfully`,
        type: "success",
      });
    },
    onSettled: () => setOpen(false),
  });

  const onSubmit: SubmitHandler<TAddress> = (data) => {
    mutation.mutate(data);
  };

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={"md"}
    >
      <DialogTrigger asChild>
        <Button colorPalette={"blue"}>Click to add address</Button>
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
  );
}
