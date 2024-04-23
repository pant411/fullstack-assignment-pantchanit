'use client'

import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TextField from "../../components/hook-form/InputForm"
import { GENDER } from "@/utils/enums/gender.enum";
import DatepickerForm from "@/components/hook-form/DatepickerForm";
import SelectForm from "@/components/hook-form/SelectForm";
import { ROLE_USER_UNIVERSITY } from "@/utils/interface/user-university/enums/role-user-university.enum";
import useSWR from "swr";
import { UsersUniversityStatus } from "@/utils/interface/user-university-status/user-university-status.interface";
import { fetcher } from "@/libs/axios/fetcher";
import { createUser } from "@/services/dashboard/dashboard.service";
import { CreateUserUniversityModel } from "@/utils/interface/user-university/user-university.interface";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

const CreateUserUniversitySchema = yup
  .object({
    firstname: yup.string().required('กรุณากรอกชื่อจริง'),
    lastname: yup.string().required('กรุณากรอกนามสกุล'),
    email: yup.string().email().required('กรุณากรอกนามสกุล'),
    password: yup.string()
      .min(8, 'รหัสผ่านควรมีความยาวอย่างน้อย 8 อักขระ')
      .matches(/[a-zA-Z0-9]/, 'รหัสผ่านต้องประกอบด้วยอักขระภาษาอังกฤษและตัวเลข')
      .required('กรุณากรอกรหัสผ่าน'),
    DOB: yup.string().required('กรุณากรอกวันเกิด'),
    gender: yup.string().oneOf([
      GENDER.NOT_SPECIFIED,
      GENDER.MALE, GENDER.
        FEMALE
    ]).required('กรุณาระบุเพศ'),
    phoneNumber: yup.string().required('กรุณากรอกเบอร์โทรศัพท์'),
    address: yup.string().optional(),
    subDistrict: yup.string().required('กรุณากรอกตำบล/แขวง'),
    city: yup.string().required('กรุณากรอกอำเภอ/เขต'),
    province: yup.string().required('กรุณากรอกจังหวัด'),
    country: yup.string().required('กรุณากรอกประเทศ'),
    zipCode: yup.string().required('กรุณากรอกรหัสไปรษณีย์'),
    role: yup.string().oneOf([
      ROLE_USER_UNIVERSITY.STUDENT,
      ROLE_USER_UNIVERSITY.TEACHER,
    ]).required('กรุณาเลือกประเภทของสมาชิก'),
    statusId: yup.number().required(),
  })
  .required();

const CreateUserUniversitySection = () => {
  const { push } = useRouter();

  const { data: dataStatus } = useSWR<UsersUniversityStatus[]>(
    'users-university-status',
    fetcher
  );

  const methods = useForm<CreateUserUniversityModel>({
    resolver: yupResolver(CreateUserUniversitySchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      gender: GENDER.NOT_SPECIFIED,
      DOB: '',
      phoneNumber: '',
      address: '',
      subDistrict: '',
      city: '',
      province: '',
      country: '',
      zipCode: '',
      role: ROLE_USER_UNIVERSITY.TEACHER,
      statusId: 2,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: CreateUserUniversityModel) => {
    try {
      await createUser(data);
      push('/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.message, { variant: 'error', autoHideDuration: 3000 });
      }
    }
  };

  const {
    handleSubmit,
  } = methods;
  return (
    <div className="w-[60%] p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-md:w-[100%]">
      <h1 className="text-3xl font-semibold text-center text-gray-700">เพิ่มสมาชิก</h1>
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-2 max-md:flex-col">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">ชื่อจริง</span>
              </label>
              <TextField name="firstname" type="text" placeholder="ชื่อจริง" />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">นามสกุล</span>
              </label>
              <TextField name="lastname" type="text" placeholder="นามสกุล" />
            </div>
          </div>

          <div className="flex flex-row gap-2 max-md:flex-col">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">อีเมล์</span>
              </label>
              <TextField name="email" type="email" placeholder="อีเมล์" />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">รหัสผ่าน</span>
              </label>
              <TextField name="password" type="password" placeholder="รหัสผ่าน" />
            </div>
          </div>

          <div className="flex flex-row gap-2 max-md:flex-col">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">ประเภทของสมาชิก</span>
              </label>
              <SelectForm name="role" renderOptions={<>
                <option value={ROLE_USER_UNIVERSITY.TEACHER}>ครู</option>
                <option value={ROLE_USER_UNIVERSITY.STUDENT}>นักเรียน</option>
              </>} />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">สถานะ</span>
              </label>
              <SelectForm
                name="statusId"
                renderOptions={
                  (dataStatus || [])
                    .map((ele) => <option key={ele.id} value={ele.id}>{ele.name}</option>)
                }
              />
            </div>
          </div>

          <div className="flex flex-row gap-2 max-md:flex-col">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">วันเกิด</span>
              </label>
              <DatepickerForm name="DOB" placeholder="วันเกิด" />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">เพศ</span>
              </label>
              <SelectForm
                name="gender"
                renderOptions={
                  <>
                    <option value={GENDER.NOT_SPECIFIED}>ไม่ระบุ</option>
                    <option value={GENDER.MALE}>เพศชาย</option>
                    <option value={GENDER.FEMALE}>เพศหญิง</option>
                  </>
                }
              />
            </div>
          </div>

          <div className="flex flex-row gap-2 max-md:flex-col">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">เบอร์โทรศัพท์</span>
              </label>
              <TextField name="phoneNumber" type="text" placeholder="เบอร์โทรศัพท์" />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">ที่อยู่</span>
              </label>
              <TextField name="address" type="text" placeholder="ที่อยู่" />
            </div>
          </div>

          <div className="flex flex-row gap-2 max-md:flex-col">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">ตำบล / แขวง</span>
              </label>
              <TextField name="subDistrict" type="text" placeholder="ตำบล / แขวง" />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">อำเภอ / เขต</span>
              </label>
              <TextField name="city" type="text" placeholder="อำเภอ / เขต" />
            </div>
          </div>

          <div className="flex flex-row gap-2 max-md:flex-col">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">จังหวัด</span>
              </label>
              <TextField name="subDistrict" type="text" placeholder="จังหวัด" />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">รหัสไปรษณีย์</span>
              </label>
              <TextField name="city" type="text" placeholder="รหัสไปรษณีย์" />
            </div>
          </div>

          <div>
            <button className="btn btn-block btn-info">สมัครสมาชิก</button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default CreateUserUniversitySection
