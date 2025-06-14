import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

type ApiErrorResponse = {
  message: string;
  error: string;
  status?: number;
  data?: unknown;
};

export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    const status = axiosError.response?.status;
    const data = axiosError.response?.data;
    const message =
      typeof data === "string"
        ? data
        : axiosError.response?.data.error || "An unexpected error occurred";

    throw new ApiError(message, status, data);
  }

  throw new ApiError("An unexpected error occurred");
}
