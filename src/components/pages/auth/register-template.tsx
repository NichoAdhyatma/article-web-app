"use client";

import { useLogin, useRegister } from "@/lib/api/mutation/auth-mutation";
import { FormInputField } from "@/components/global/form/form-input-field";
import { FormSelectField } from "@/components/global/form/form-select-field";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import {
  RegisterForm,
  registerSchema,
} from "@/lib/schemas/auth/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegisterTemplate = () => {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "User",
    },
  });

  const { control, handleSubmit, setError } = form;

  const router = useRouter();

  const { mutate: mutateRegister, isPending: isPendingRegister } = useRegister();

  const { mutate: mutateLogin, isPending: isPendingLogin } = useLogin();

  const handleNavigateToLogin = () => {
    router.push("/auth/login");
  };

  const onSubmit = (data: RegisterForm) => {
    mutateRegister(data, {
      onSuccess: () => {
        // After successful registration, automatically log in the user
        mutateLogin(
          { username: data.username, password: data.password },
          {
            onSuccess: () => {
              router.push("/");
            },
            onError: (error) => {
              setError("username", {
                type: "manual",
                message: error.message,
              });
            },
          }
        );
      },
      onError: (error) => {
        console.error("Registration failed:", error);
        setError("username", {
          type: "manual",
          message: error.message,
        });
      },
    });
  };

  return (
    <>
      {/* Header */}
      <Image
        src={"/app-logo.svg"}
        alt={"app-logo"}
        objectFit="contain"
        width={134}
        height={24}
      />

      {/* Form */}
      <Form {...form}>
        <Box direction="column" align="start" justify="start" className="gap-4">
          <FormInputField
            control={control}
            name="username"
            label="Username"
            type="text"
            placeholder="Input username"
          />

          <FormInputField
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="Input password"
          />

          <FormSelectField
            control={form.control}
            name="role"
            label="Role"
            placeholder="Select Role"
            options={[
              { label: "Admin", value: "Admin" },
              { label: "User", value: "User" },
            ]}
          />
        </Box>
      </Form>

      {/* Footer */}
      <Button isLoading={isPendingLogin || isPendingRegister} fullWidth={true} onClick={handleSubmit(onSubmit)}>
        Register 
      </Button>

      <Typography size={"textSm"} weight={"medium"}>
        Already have an account?{" "}
        <Typography
          as="span"
          className="underline text-primary hover:cursor-pointer"
          onClick={handleNavigateToLogin}
        >
          Login
        </Typography>
      </Typography>
    </>
  );
};

export default RegisterTemplate;
