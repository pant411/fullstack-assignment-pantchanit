'use client'

import { useAuth } from "@/stores/auth/hooks/auth.hook";
import { useEffect, useState } from "react";

const Navbar = () => {

  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) setLoading(authLoading);
  }, [authLoading]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="navbar bg-[#EEEEEE] px-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">User Management</a>
      </div>
      {isAuthenticated ? (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <button className="btn">
                {user?.firstname}
              </button>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a onClick={() => logout()}>Logout</a></li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="mr-2">
            <a className="btn bg-[#83b683]" href="/register">สมัครสมาชิก</a>
          </div>
          <div >
            <a className="btn bg-[#ffe297]" href="/">เข้าสู่ระบบ</a>
          </div>
        </>
      )}

    </div>
  )
}

export default Navbar

