'use client'

import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { getProfile, isAuthenticated, login, logout } from "@/services/auth/auth.service";
import { User } from "@/utils/interface/user.interface";

export const AuthProvider = ({ children }: {
  children: React.ReactNode;
}) => {

  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated());

  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setAuthenticated(true);
      window.location.href = '/dashboard';
    } catch (error) {
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
        user: profile || null,
        login: handleLogin,
        logout: handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};