'use client'

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import Pagination from "@/components/pagination/Pagination";
import { useAuth } from "@/stores/auth/hooks/auth.hook";
import { fetcher } from "@/libs/axios/fetcher";
import { PaginationResponse } from "@/utils/interface/responses/pagination.response";
import { UsersUniversity } from "@/utils/interface/user-university/user-university.interface";
import { GENDER } from "@/utils/enums/gender.enum";
import Tab from "@/components/tab/Tab";
import { ROLE_USER_UNIVERSITY } from "@/utils/interface/user-university/enums/role-user-university.enum";

const headers = [
  {
    columnHeader: 'ชื่อ',
  },
  {
    columnHeader: 'นามสกุล',
  },
  {
    columnHeader: 'Role',
  },
  {
    columnHeader: 'อีเมล์',
  },
  {
    columnHeader: 'วันเกิด',
  },
  {
    columnHeader: 'เพศ',
  },
  {
    columnHeader: 'เบอร์โทรศัพท์',
  },

  {
    columnHeader: 'Action',
  },
];

const pageSize = 10;

export default function Dashboard() {
  // tab
  const [currentTab, setTab] = useState<string>('All');
  const { replace } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useSWR<PaginationResponse<UsersUniversity>>(
    `admin/users-university?page=${currentPage}&pageSize=${pageSize}&${currentTab !== 'All' ? `role=${currentTab}` : undefined}`,
    fetcher
  );

  const listData = data?.items || [];

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <main className="min-h-screen p-12">
      <p className="my-4 text-center text-2xl font-bold">รายชื่อสมาชิก</p>
      <div className="flex flex-row justify-center items-center">
        <Tab
          data={[
            'All',
            ROLE_USER_UNIVERSITY.TEACHER,
            ROLE_USER_UNIVERSITY.STUDENT,
          ]}
          currentTab={currentTab}
          handleTab={setTab}
        />        
      </div>

      {
        listData.length > 0 ? <div className="overflow-x-auto mt-4">
          <table className="table table-lg p-5">
            {/* head */}
            <thead>
              <tr>
                {
                  headers.map((ele, idx) => (
                    <th
                      key={idx}
                      align={'center'}
                    >
                      {ele.columnHeader}
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                listData.map((ele: UsersUniversity, idx) => (
                  <tr key={idx}>

                    <td align={'center'} >{ele.firstname}</td>
                    <td align={'center'} >{ele.lastname}</td>
                    <td align={'center'} >
                      <div className="badge badge-success">{ele.role}</div>
                    </td>
                    <td align={'center'} >{ele.email}</td>
                    <td align={'center'} >{format(ele.DOB, 'dd-MM-yyyy')}</td>
                    <td align={'center'} > 
                      <div className={`badge badge-${ele.gender === GENDER.FEMALE ? 'secondary' : 'info'}`}>
                        {ele.gender}
                      </div>
                    </td>
                    <td align={'center'} >{ele.phoneNumber}</td>

                    <td align={'center'} className="flex flex-row justify-center gap-2">
                      <button className="btn btn-primary" onClick={() => replace(`dashboard/edit/${ele.id}`)}>แก้ไข</button>
                      <button className="btn btn-active btn-error">ลบ</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div> : <div className="grid h-[65vh] card bg-base-200 rounded-box place-items-center text-4xl">
          ไม่พบรายชื่อสมาชิก
        </div>
      }

      <div className="flex flex-row items-center justify-center p-2">
        <Pagination currentPage={currentPage} totalPages={data?.pageMeta?.totalPage || 1} onPageChange={setCurrentPage} />
      </div>
    </main>
  );
}
