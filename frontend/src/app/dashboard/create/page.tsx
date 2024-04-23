'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth/hooks/auth.hook";

import CreateUserUniversitySection from "@/sections/user-university/createUserUniversitySection"
import Loading from "@/components/loading/Loading";

const CreateUser = () => {
  const { replace } = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace])

  if (loading) {
    return <Loading />
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
     <CreateUserUniversitySection />
    </main>
  )
}

export default CreateUser
