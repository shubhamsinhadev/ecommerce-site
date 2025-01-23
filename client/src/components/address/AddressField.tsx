import { TAddress } from "@/utils/address";
import { HStack, Input, Textarea } from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { RadioCardItem, RadioCardRoot } from "../ui/radio-card";
import { Field } from "../ui/field";

const AddressField = ({
  label,
  value,
  errors,
  register,
  control,
}: {
  label: string;
  value: keyof TAddress;
  errors: FieldErrors<TAddress>;
  register: UseFormRegister<TAddress>;
  control: Control<TAddress>;
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
        <Controller
          name={value}
          control={control}
          render={({ field }) => (
            <RadioCardRoot
              colorPalette="blue"
              defaultValue="HOME"
              size={"sm"}
              w={"100%"}
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value);
              }}
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
          )}
        />
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

export default AddressField;
