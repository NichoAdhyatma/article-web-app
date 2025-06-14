// lib/api/client.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error(
    "❌ Missing NEXT_PUBLIC_API_BASE_URL in environment variables."
  );
}

export const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
