import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { api } from "../services/api";
import { parseCookies, setCookie } from "nookies";
import Router from "next/router";

type User = {
  id: string;
  username: string;
  member: {
    id: string;
    CID: string;
    name: string;
    level: number;
    active: boolean;
  };
};

type SignInData = {
  username: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "philanthropicManager.token": token } = parseCookies();
    if (token) {
      const decoded = jwt_decode(token) as any;
      setUser({
        id: decoded.id,
        username: decoded.username,
        member: decoded.member
      });
    }
  }, []);

  async function signIn({ username, password }: SignInData) {
    try {
      const { data } = await api.post("login", { username, password });

      const { token } = data;
      const tokenDecoder = jwt_decode(token) as any;

      setCookie(undefined, "philanthropicManager.token", token, {
        maxAge: 60 * 60 * 48 //2d
      });

      setUser({
        id: tokenDecoder.sub,
        username: tokenDecoder.username,
        member: tokenDecoder.member
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error: any) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  }

  return <AuthContext.Provider value={{ isAuthenticated, signIn, user, error }}>{children}</AuthContext.Provider>;
}
