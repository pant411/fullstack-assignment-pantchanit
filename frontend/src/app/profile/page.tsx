'use client'

import { fetcher } from "@/libs/axios/fetcher";
import ProfileSection from "@/sections/profile/profileSection";
import { useAuth } from "@/stores/auth/hooks/auth.hook";
import { ProfileModel } from "@/utils/interface/user.interface";
import useSWR from "swr";

const Profile = () => {
  const { user } = useAuth();

  const { data, isLoading } = useSWR<ProfileModel>('admin/users/me', fetcher);

  if (!user && isLoading) {
    return <div>loading ...</div>
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <ProfileSection profile={data} />
    </main>
  )
}

export default Profile
