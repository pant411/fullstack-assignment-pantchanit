'use client'

import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface InputProps {
  name: string;
  placeholder?: string;
  rules?: Record<string, any>;
}

const DatepickerForm = ({
  name,
  rules,
  placeholder,
}: InputProps) => {
  const { control, formState: { errors }, watch } = useFormContext();
  const value = watch();
  const [valueDate, setValueDate] = useState<DateValueType>({ 
    startDate: value?.DOB, 
    endDate: value?.DOB 
  });
  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const { onChange, value, ...others } = field;
          return (
            <Datepicker
              inputClassName={`w-full input input-bordered`}
              asSingle={true}
              placeholder={placeholder}
              useRange={false}
              maxDate={new Date()}
              onChange={(e) => { onChange(e?.startDate || '', e); setValueDate(e || { startDate: null, endDate: null }); }}
              value={valueDate}
              {...others}
            />
          )
        }}
      />
      {errors[name]?.message && <p className="text-red-500">{errors[name]?.message as string}</p>}
    </div>
  );
};

export default DatepickerForm;
