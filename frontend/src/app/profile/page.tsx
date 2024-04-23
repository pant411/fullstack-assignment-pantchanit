'use client'

import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@/libs/axios/fetcher";
import ProfileSection from "@/sections/profile/profileSection";
import { useAuth } from "@/stores/auth/hooks/auth.hook";
import { ProfileModel } from "@/utils/interface/user.interface";
import Loading from "@/components/loading/Loading";


const Profile = () => {
  const { replace } = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace])

  const { data, isLoading } = useSWR<ProfileModel>('admin/users/me', fetcher);

  if (!user && isLoading) {
    return <Loading />
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <ProfileSection profile={data} />
    </main>
  )
}

export default Profile
