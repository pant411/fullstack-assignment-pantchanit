'use client'

import LoginForm from "@/sections/login/LoginSection";
import { useAuth } from "@/stores/auth/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { replace } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      replace('/dashboard');
    }
  }, [isAuthenticated, replace]);

  return (
    <div className="flex flex-col items-center justify-between pt-24">
      <LoginForm />
    </div>
  );
}
