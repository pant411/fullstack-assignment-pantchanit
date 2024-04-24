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
import { deleteUser } from "@/services/dashboard/dashboard.service";
import Loading from "@/components/loading/Loading";
import { useSnackbar } from "notistack";

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
    columnHeader: 'สถานะ',
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

const pageSize = 8;

export default function Dashboard() {
  // tab
  const [currentTab, setTab] = useState<string>('All');
  const { replace } = useRouter();
  const { isAuthenticated } = useAuth();
  const [selectId, setSelectId] = useState<number | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { 
    data, 
    isLoading, 
    mutate 
  } = useSWR<PaginationResponse<UsersUniversity>>(
    `admin/users-university?page=${currentPage}&pageSize=${pageSize}&${currentTab !== 'All' ? `role=${currentTab}` : undefined}`,
    fetcher
  );

  const listData = data?.items || [];

  if (isLoading) {
    return <Loading />
  }

  const handleDeleteUser = async () => {
    if (selectId) {
      await deleteUser(selectId);
      enqueueSnackbar('Delete User Successfully', { variant: 'success', autoHideDuration: 3000 });
      setSelectId(null);
      mutate();
    }
  }

  return (
    <main className="min-h-screen p-6">
      <p className="my-4 text-center text-2xl font-bold">รายชื่อสมาชิก</p>
      <div className="flex flex-row justify-end" onClick={() => replace(`dashboard/create`)}>
        <button className="btn btn-info" >เพิ่มสมาชิก</button>
      </div>
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
                    <td align={'center'} >{ele.role}</td>
                    <td align={'center'} >{ele.usersUniversityStatus.name}</td>
                    <td align={'center'} >{ele.email}</td>
                    <td align={'center'} >{format(ele.DOB, 'dd-MM-yyyy')}</td>
                    <td align={'center'} >
                      {ele.gender === GENDER.FEMALE ? 'หญิง' : 'ชาย'}
                    </td>
                    <td align={'center'} >{ele.phoneNumber}</td>

                    <td align={'center'} className="flex flex-row justify-center gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => replace(`dashboard/edit/${ele.id}`)}
                      >
                        แก้ไข
                      </button>
                      <label
                        htmlFor="modal-for-delete-user"
                        className="btn btn-active btn-error"
                        onClick={() => setSelectId(ele.id)}
                      >
                        ลบ
                      </label>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div> :
          <div 
            className="grid h-[65vh] card bg-base-200 rounded-box place-items-center text-4xl mt-4"
          >
            ไม่พบรายชื่อสมาชิก
          </div>
      }

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="modal-for-delete-user" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">คำเตือน</h3>
          <p className="py-4">คุณต้องการลบสมาชิกนี้ใช่หรือไม่</p>
          <div className="modal-action">
            <label 
              htmlFor="modal-for-delete-user" 
              className="btn btn-active btn-info" 
              onClick={handleDeleteUser}
            >
              ยืนยัน
            </label>
            <label 
              htmlFor="modal-for-delete-user" 
              className="btn"
            >
              ปิด
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center p-2">
        <Pagination currentPage={currentPage} totalPages={data?.pageMeta?.totalPage || 1} onPageChange={setCurrentPage} />
      </div>
    </main>
  );
}
