'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth/hooks/auth.hook";
import ForgotPasswordSection from '@/sections/profile/ForgotPasswordSection'
import Loading from "@/components/loading/Loading";

const ForgotPassword = () => {
  const { replace } = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace])

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <ForgotPasswordSection />
    </main>
  )
}

export default ForgotPassword
