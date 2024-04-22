'use client'

import useSWR from "swr";
import { fetcher } from "@/libs/axios/fetcher";
import { UsersUniversity } from "@/utils/interface/user-university/user-university.interface";
import EditUserUniversitySection from "@/sections/user-university/editUserUniversitySection";


const EditUser = ({ params }: { params: { id: string } }) =>{
  const { id } = params;
  const { data, isLoading } = useSWR<UsersUniversity>(
    `admin/users-university/${id}`,
    fetcher
  );
  if (isLoading && !data) {
    return <div>Loading ...</div>
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <EditUserUniversitySection usersUniversity={data} />
    </main>
  )
}

export default EditUser
