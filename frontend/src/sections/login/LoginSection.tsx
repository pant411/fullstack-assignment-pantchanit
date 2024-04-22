'use client'

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TextField from "../../components/hook-form/InputForm"
import { useAuth } from "@/stores/auth/hooks/auth.hook";

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
  const { login } = useAuth();

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

  const onSubmit = async (data: LoginModel) => {
    await login(data.email, data.password);
  };

  return (
    <div className="w-[35%] p-6 bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-md:w-[80%]">
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
            <button className="btn btn-block btn-info">Login</button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default LoginSection
