'use client'

import { useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { fetcher } from "@/libs/axios/fetcher";
import { UsersUniversity } from "@/utils/interface/user-university/user-university.interface";
import EditUserUniversitySection from "@/sections/user-university/editUserUniversitySection";
import { useAuth } from "@/stores/auth/hooks/auth.hook";
import Loading from "@/components/loading/Loading";

const EditUser = ({ params }: { params: { id: string } }) =>{
  const { replace } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace]);

  const { id } = params;

  const { data, isLoading } = useSWR<UsersUniversity>(
    `admin/users-university/${id}`,
    fetcher
  );

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    replace('/dashboard');
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <EditUserUniversitySection usersUniversity={data} />
    </main>
  )
}

export default EditUser
