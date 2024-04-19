'use client'

import { HTMLInputTypeAttribute } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  rules?: Record<string, any>;
}

const TextField = ({
  name,
  placeholder,
  type,
  rules,
}: InputProps) => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            type={type}
            className="w-full input input-bordered"
            placeholder={placeholder}
            {...field}
          />
        )}
      />
      {errors && <p className="text-red-500">{errors.root?.message}</p>}
    </div>
  );
};

export default TextField;
