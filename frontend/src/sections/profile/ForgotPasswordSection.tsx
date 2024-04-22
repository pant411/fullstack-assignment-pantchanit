'use client'

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TextField from "../../components/hook-form/InputForm"
import { changePassword } from "@/services/auth/auth.service";

interface ForgotPasswordModel {
  oldPassword: string;
  newPassword: string;
}

const ForgotPasswordSchema = yup
  .object({
    oldPassword: yup.string().required('กรุณากรอกรหัสผ่านเก่า'),
    newPassword: yup.string().required('กรุณากรอกรหัสผ่านใหม่'),
  })
  .required();

const ForgotPasswordSection = () => {
  const { push } = useRouter();
  const methods = useForm<ForgotPasswordModel>({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (data: ForgotPasswordModel) => {
    // console.log(data);
    await changePassword(data.oldPassword, data.newPassword);
    push('/dashboard');
  };

  return (
    <div className="w-[35%] p-6 bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-md:w-[80%]">
      <h1 className="text-3xl font-semibold text-center text-gray-700">เปลี่ยนรหัสผ่าน</h1>
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              <span className="text-base label-text">รหัสผ่านเก่า</span>
            </label>
            <TextField name="oldPassword" type="password" placeholder="รหัสผ่านเก่า" />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">รหัสผ่านใหม่</span>
            </label>
            <TextField name="newPassword" type="password" placeholder="รหัสผ่านใหม่" />
          </div>
          <div>
            <button className="btn btn-block btn-info">แก้ไข</button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default ForgotPasswordSection
