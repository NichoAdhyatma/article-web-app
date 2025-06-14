import { client } from "@/lib/axios/client";
import { handleApiError } from "@/lib/handle-api-error";
import {
  RegisterPayload,
  AuthUser,
  LoginPayload,
  AuthCredentials,
} from "@/lib/types/auth";
import { authClient } from "../axios/auth-client";

export const registerUser = async (
  data: RegisterPayload
): Promise<AuthUser> => {
  try {
    const response = await client.post<AuthUser>("/auth/register", data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const loginUser = async (
  data: LoginPayload
): Promise<AuthCredentials> => {
  try {
    const response = await client.post<AuthCredentials>("/auth/login", data);

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProfile = async (): Promise<AuthUser> => {
  try {
    const response = await authClient.get<AuthUser>("/auth/profile");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
