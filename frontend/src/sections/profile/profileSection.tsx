'use client'

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TextField from "../../components/hook-form/InputForm"
import { GENDER } from "@/utils/enums/gender.enum";
import DatepickerForm from "@/components/hook-form/DatepickerForm";
import SelectForm from "@/components/hook-form/SelectForm";
import { editProfile } from "@/services/auth/auth.service";
import { ProfileModel } from "@/utils/interface/user.interface";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

const ProfileSchema = yup
  .object({
    firstname: yup.string().required('กรุณากรอกชื่อจริง'),
    lastname: yup.string().required('กรุณากรอกนามสกุล'),
    email: yup.string().email().required('กรุณากรอกนามสกุล'),
    DOB: yup.string().required('กรุณากรอกวันเกิด'),
    gender: yup.string().oneOf([
      GENDER.NOT_SPECIFIED,
      GENDER.MALE, GENDER.
        FEMALE
    ]).required('กรุณาระบุเพศ'),
    phoneNumber: yup.string().required('กรุณากรอกเบอร์โทรศัพท์'),
  })
  .required();

const ProfileSection = ({ profile }: { profile?: ProfileModel }) => {
  const { push } = useRouter();

  const methods = useForm<ProfileModel>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      firstname: profile?.firstname || '',
      lastname: profile?.lastname || '',
      email: profile?.email || '',
      gender: profile?.gender || GENDER.NOT_SPECIFIED,
      DOB: profile?.DOB.toString() || '',
      phoneNumber: profile?.phoneNumber || '',
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (data: ProfileModel) => {
    // console.log(data);
    if (profile?.id) {
      try {
        await editProfile(profile.id, data);
        push('/dashboard');        
      } catch (err) {
        if (err instanceof AxiosError) {
          enqueueSnackbar(err.message, { variant: 'error', autoHideDuration: 3000 });
        }
      }
    }
  };

  return (
    <div className="w-[60%] p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-md:w-[100%]">
      <h1 className="text-3xl font-semibold text-center text-gray-700">โปรไฟล์</h1>
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
            <button className="btn btn-block btn-info">แก้ไขโปรไฟล์</button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default ProfileSection
