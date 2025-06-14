import axios, { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { ApiError } from "../handle-api-error";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error("❌ Missing NEXT_PUBLIC_API_BASE_URL in environment variables.");
}

export const authClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

authClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = getCookie("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request error:", error.message);
    return Promise.reject(error);
  }
);

authClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized – Token invalid or expired.");
      window.location.href = "/auth/login";
    }

    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message;

    return Promise.reject(new Error(message));
  }
);
