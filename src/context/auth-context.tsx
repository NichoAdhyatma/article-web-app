"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { AuthUser, AuthCredentials } from "@/lib/types/auth";
import { getProfile } from "@/lib/api/auth";
import { authRoleName, authTokenName } from "@/lib/constants";

type AuthContextType = {
  user: AuthUser | null;
  credentials: AuthCredentials | null;
  login: (credentials: AuthCredentials, password: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [credentials, setCredentials] = useState<AuthCredentials | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie(authTokenName);
    const role = getCookie(authRoleName);

    if (token && role && (role === "User" || role === "Admin")) {
      const parsedCredentials: AuthCredentials = {
        token: token as string,
        role: role as "User" | "Admin",
      };
      setCredentials(parsedCredentials);

      getProfile()
        .then((profile) => {
          setUser({
            ...profile,
            password: (getCookie("password") as string | undefined) ?? "",
          });
          setCookie("userId", profile.id || "");
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newCredentials: AuthCredentials, password: string) => {
    setCredentials(newCredentials);
    setCookie(authTokenName, newCredentials.token);
    setCookie(authRoleName, newCredentials.role);
    setCookie("password", password);

    getProfile()
      .then((profile) => {
        setUser({
          ...profile,
          password,
        });

        setCookie("userId", profile.id || "");
      })
      .catch(() => logout());
  };

  const logout = () => {
    setUser(null);
    setCredentials(null);
    deleteCookie(authTokenName);
    deleteCookie(authRoleName);
    deleteCookie("password");

    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider value={{ user, credentials, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
