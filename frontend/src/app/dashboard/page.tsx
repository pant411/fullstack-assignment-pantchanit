'use client'

import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      dashboard
      <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
    </main>
  );
}
