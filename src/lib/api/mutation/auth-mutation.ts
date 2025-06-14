import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../auth";
import { LoginPayload, RegisterPayload } from "@/lib/types/auth";
import { useAuth } from "@/context/auth-context";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => registerUser(data),
  });
};

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginUser(data),
    onSuccess: (credentials, payload) => {
      login(credentials, payload.password);
    },
  });
};
