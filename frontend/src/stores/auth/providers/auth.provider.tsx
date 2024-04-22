'use client'

import { useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { isAuthenticated, login, logout } from "@/services/auth/auth.service";
import useSWR from "swr";
import { fetcher } from "@/libs/axios/fetcher";
import { User } from "@/utils/interface/user.interface";

export const AuthProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated());

  const { data, isLoading } = useSWR<User>('admin/users/me', fetcher);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setAuthenticated(true);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    logout();
  };

return (
  <AuthContext.Provider
    value={{
      isAuthenticated: authenticated,
      user: data || null,
      login: handleLogin,
      logout: handleLogout,
      loading: isLoading,
    }}
  >
    {children}
  </AuthContext.Provider>
);
};