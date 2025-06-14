"use client";

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
      role: "user",
    },
  });

  const { control, handleSubmit } = form;

  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push("/auth/login");
  };

  const onSubmit = (data: RegisterForm) => {
    console.log("Form submitted with data:", data);
    // Handle registration logic here
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
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
          />
        </Box>
      </Form>

      {/* Footer */}
      <Button fullWidth={true} onClick={handleSubmit(onSubmit)}>
        Login
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
