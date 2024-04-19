'use client'

import { FormProvider, useForm } from "react-hook-form";
import TextField from "../../components/hook-form/InputForm"
import { GENDER } from "@/utils/enums/gender.enum";
import DatepickerForm from "@/components/hook-form/DatepickerForm";
import SelectForm from "@/components/hook-form/SelectForm";

interface RegisterModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  DOB: Date; // dateOfBirth 
  gender: GENDER;
  phoneNumber: string;
}

const RegisterSection = () => {
  const methods = useForm<RegisterModel>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = (data: RegisterModel) => {
    console.log(data);
  };

  return (
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50">
      <h1 className="text-3xl font-semibold text-center text-gray-700">สมัครเป็นผู้ดูแลระบบ</h1>
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
            <div className="w-full" />
          </div>

          <div>
            <button className="btn btn-block">สมัครสมาชิก</button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default RegisterSection
