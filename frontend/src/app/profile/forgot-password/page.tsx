'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth/hooks/auth.hook";
import ForgotPasswordSection from '@/sections/profile/ForgotPasswordSection'

const ForgotPassword = () => {
  const { replace } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace])

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <ForgotPasswordSection />
    </main>
  )
}

export default ForgotPassword
