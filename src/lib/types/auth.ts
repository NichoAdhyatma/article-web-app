export type RegisterPayload = {
  username: string;
  password: string;
  role: "User" | "Admin";
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type AuthUser = {
  username: string;
  role: "User" | "Admin";
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthCredentials = {
  token: string;
  role: "User" | "Admin";
}