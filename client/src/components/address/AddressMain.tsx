import { Button } from "../ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ReactNode, useState } from "react";
import { HStack, Input, Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chakra } from "@chakra-ui/react";
import { RadioCardItem, RadioCardRoot } from "../ui/radio-card";
import {
  addressAddFn,
  addressFields,
  TAddress,
  ZAddress,
} from "@/utils/address";
import AddressDisplay from "./AddressDisplay";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../ui/toaster";

export default function AddressMain() {
  return (
    <>
      <AddressDisplay />
      <AddDialog />
    </>
  );
}

const AddDialog = () => {
  const [open, setOpen] = useState(false);

  const {
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
};

const AddressField = ({
  label,
  value,
  errors,
  register,
}: {
  label: string;
  value: keyof TAddress;
  errors: FieldErrors<TAddress>;
  register: UseFormRegister<TAddress>;
}) => {
  let gridColumn: string = "span 1";
  let output: ReactNode = <Input colorPalette={"blue"} {...register(value)} />;

  const addressTypeList = ["Home", "Office", "Other"];

  switch (label) {
    case "Address":
      gridColumn = "span 2";
      output = (
        <Textarea colorPalette={"blue"} size={"xl"} {...register("address")} />
      );
      break;

    case "Address Type":
      gridColumn = "span 2";
      output = (
        <RadioCardRoot
          colorPalette="blue"
          defaultValue="HOME"
          size={"sm"}
          w={"100%"}
        >
          <HStack gap={2} align="stretch">
            {addressTypeList.map((addressType) => (
              <RadioCardItem
                label={addressType}
                key={addressType}
                value={addressType}
              />
            ))}
          </HStack>
        </RadioCardRoot>
      );
      break;
  }

  return (
    <Field
      label={label}
      key={label}
      invalid={!!errors[value]}
      errorText={errors[value]?.message}
      gridColumn={gridColumn}
    >
      {output}
    </Field>
  );
};
