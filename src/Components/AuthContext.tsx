import React, { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/authApi"; 

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
};

type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  register: (payload: authApi.RegisterRequest) => Promise<void>;
  login: (payload: authApi.LoginRequest) => Promise<void>
  logout: () => void;

};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "mtb_access_token";
const USER_KEY = "mtb_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Load from localStorage on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedToken) setAccessToken(savedToken);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
  }, []);

  const register = async (payload: authApi.RegisterRequest) => {
    const res = await authApi.register(payload);

    const mappedUser: User = {
      id: res.userResponse.userId,
      email: res.userResponse.email,
      username: res.userResponse.username,
      name: res.userResponse.name,
    };

    setUser(mappedUser);
    setAccessToken(res.accessToken);

    localStorage.setItem(TOKEN_KEY, res.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(mappedUser));
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const login = async (req: authApi.LoginRequest) => {
    const res = await authApi.login(req);

    const mappedUser: User = {
      id: res.userResponse.userId,
      email: res.userResponse.email,
      username: res.userResponse.username,
      name: res.userResponse.name,
    };

    setUser(mappedUser);
    setAccessToken(res.accessToken);

    localStorage.setItem(TOKEN_KEY, res.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(mappedUser));

  }

  return (
    <AuthContext.Provider value={{ user, accessToken, register, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
