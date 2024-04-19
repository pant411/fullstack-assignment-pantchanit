'use client'

import { HTMLInputTypeAttribute } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Datepicker from "react-tailwindcss-datepicker";

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
  const { control, formState: { errors } } = useFormContext();
  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Datepicker
            inputClassName={`w-full input input-bordered`}
            asSingle={true}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
      {errors && <p className="text-red-500">{errors.root?.message}</p>}
    </div>
  );
};

export default DatepickerForm;
