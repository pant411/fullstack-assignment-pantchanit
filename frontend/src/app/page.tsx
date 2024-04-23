'use client'

import Loading from "@/components/loading/Loading";
import LoginForm from "@/sections/login/LoginSection";
import { useAuth } from "@/stores/auth/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { replace } = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      replace('/dashboard');
    }
  }, [isAuthenticated, replace]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col items-center justify-between pt-24">
      <LoginForm />
    </div>
  );
}
