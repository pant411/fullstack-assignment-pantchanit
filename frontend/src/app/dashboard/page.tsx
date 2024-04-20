'use client'

import { useEffect, useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth/hooks/auth.hook";

export default function Dashboard() {
  const { replace } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace]);

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      dashboard
      <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
    </main>
  );
}
