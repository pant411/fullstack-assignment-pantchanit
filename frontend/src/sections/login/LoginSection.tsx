'use client'

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TextField from "../../components/hook-form/InputForm"

interface LoginModel {
  email: string;
  password: string;
}

const LoginSchema = yup
  .object({
    email: yup.string().email().required('กรุณากรอกอีเมล์'),
    password: yup.string().required('กรุณากรอกรหัสผ่าน'),
  })
  .required();

const LoginSection = () => {

  const methods = useForm<LoginModel>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = (data: LoginModel) => {
    console.log(data);
  };

  return (
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700">เข้าสู่ระบบ</h1>
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              <span className="text-base label-text">อีเมล์</span>
            </label>
            <TextField name="email" type="text" placeholder="Email Address" />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">รหัสผ่าน</span>
            </label>
            <TextField name="password" type="password" placeholder="Enter Password" />
          </div>
          <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">ลืมรหัสผ่าน?</a>
          <div>
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default LoginSection
