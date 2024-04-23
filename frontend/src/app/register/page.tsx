'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterSection from "@/sections/register/RegisterSection"
import { useAuth } from "@/stores/auth/hooks/auth.hook"
import Loading from "@/components/loading/Loading";

const Register = () => {
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
    <main className="flex flex-col items-center justify-between p-24">
      <RegisterSection />
    </main>
  )
}

export default Register
