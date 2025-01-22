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
import { loginFn, Tlogin, Zlogin } from "@/utils/auth";
import { Link } from "react-router";
import { Separator } from "@chakra-ui/react";

export default function LoginMain() {
  const mutation = useMutation({
    mutationFn: (data: Tlogin) => loginFn(data),
    onError: (error) => {
      toaster.create({
        title: `Authentication Failed`,
        description: error.message,
        type: "error",
      });
    },
    onSuccess: () => {
      toaster.create({
        title: `Authentication Success`,
        type: "success",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tlogin>({
    resolver: zodResolver(Zlogin),
  });
  const onSubmit: SubmitHandler<Tlogin> = (data) => {
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
          Login
        </Text>

        <chakra.form
          onSubmit={handleSubmit(onSubmit)}
          display={"flex"}
          flexDir={"column"}
          gap={2}
        >
          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
            mt={4}
          >
            <Input {...register("email")} colorPalette={"blue"} />
          </Field>
          <Field
            label="Password"
            invalid={!!errors.password}
            errorText={errors.password?.message}
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
          <Text flexShrink="0">OR</Text>
          <Separator flex="1" />
        </HStack>
        <Text fontSize={"sm"} textAlign={"center"}>
          Don't have an account?{" "}
          <Link to={"/registration"} style={{ fontWeight: "bold" }}>
            sign up
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
