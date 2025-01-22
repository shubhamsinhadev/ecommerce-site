import { Box, Center, HStack, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { chakra, Text } from "@chakra-ui/react";
import { Package } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import { registrationFn, TRegistration, ZRegistration } from "@/utils/auth";
import { Link } from "react-router";
import { Separator } from "@chakra-ui/react";

export default function RegistrationMain() {
  const mutation = useMutation({
    mutationFn: (data: TRegistration) => registrationFn(data),
    onError: (error) => {
      toaster.create({
        title: `Registration Failed`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: () => {
      toaster.create({
        title: `Registration Successfull`,
        type: "success",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegistration>({
    resolver: zodResolver(ZRegistration),
  });
  const onSubmit: SubmitHandler<TRegistration> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box bg={"gray.100"} w={"100%"} h="calc(100dvh - 64px)" pt={12}>
      <Box
        bg={"white"}
        maxW={"sm"}
        mx={"auto"}
        p={4}
        rounded={"md"}
        display={"flex"}
        flexDir={"column"}
        gap={2}
        shadow={"md"}
      >
        <Center color={"blue.600"}>
          <Package size={64} />
        </Center>
        <Text fontSize={"4xl"} fontWeight={"bold"} textAlign={"center"}>
          Registration
        </Text>

        <chakra.form
          onSubmit={handleSubmit(onSubmit)}
          display={"flex"}
          flexDir={"column"}
          gap={2}
        >
          <Field
            label="Name"
            invalid={!!errors.name}
            errorText={errors.name?.message}
            mt={4}
            required
          >
            <Input {...register("name")} colorPalette={"blue"} />
          </Field>
          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
            mt={4}
            required
          >
            <Input {...register("email")} colorPalette={"blue"} />
          </Field>
          <Field
            label="Password"
            invalid={!!errors.password}
            errorText={errors.password?.message}
            required
          >
            <PasswordInput {...register("password")} colorPalette={"blue"} />
          </Field>
          <Button
            loading={mutation.isPending}
            loadingText="Submitting..."
            colorPalette={"blue"}
            mt={3}
            type="submit"
          >
            Submit
          </Button>
        </chakra.form>

        <HStack mt={2}>
          <Separator flex="1" />
          <Text flexShrink="0" fontWeight={"medium"}>
            OR
          </Text>
          <Separator flex="1" />
        </HStack>
        <Text fontSize={"sm"} textAlign={"center"}>
          Already have an account?{" "}
          <Link to={"/login"} style={{ fontWeight: "bold" }}>
            sign in
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
