'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth/hooks/auth.hook";

import CreateUserUniversitySection from "@/sections/user-university/createUserUniversitySection"

const CreateUser = () => {
  const { replace } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace])

  return (
    <main className="flex flex-col items-center justify-between p-24">
     <CreateUserUniversitySection />
    </main>
  )
}

export default CreateUser
