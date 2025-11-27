import React, { createContext, useContext, useState } from "react";

export type User = {
    id: string;  
    name: string;         //not unique "Visningsnamn"
    username: string;     //unique
    email: string;
    bio?: string;
    avatarUrl?: string;
};

type AuthContextValue = {
  user: User | null;
  loginAsJohnDoe: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

const loginAsJohnDoe = () =>
    setUser({
        id: "1",
        name: "John Doe",
        username: "johndoe",
        email: "john.doe@gmail.com",
        bio: "I love trying new workout classes and finding training buddies in Gothenburg.",
        avatarUrl: "/genericavatar.png"

    });

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginAsJohnDoe, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
