"use client";

import { useLogin } from "@/lib/api/mutation/auth-mutation";
import { FormInputField } from "@/components/global/form/form-input-field";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { LoginForm, loginSchema } from "@/lib/schemas/auth/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginTemplate = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { control } = form;

  const router = useRouter();

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginForm) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/")
      },
      onError: (error) => {
        console.error("Login failed:", error);
        form.setError("username", {
          type: "manual",
          message: error.message,
        });
      },
    });
  };

  const handleNavigateToRegister = () => {
    router.push("/auth/register");
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
        </Box>
      </Form>

      {/* Footer */}
      <Button isLoading={isPending} fullWidth={true} onClick={form.handleSubmit(onSubmit)}>
        Login
      </Button>

      <Typography size={"textSm"} weight={"medium"}>
        Don’t have an account?{" "}
        <Typography
          onClick={handleNavigateToRegister}
          as="span"
          className="underline text-primary hover:cursor-pointer"
        >
          Register
        </Typography>
      </Typography>
    </>
  );
};

export default LoginTemplate;
