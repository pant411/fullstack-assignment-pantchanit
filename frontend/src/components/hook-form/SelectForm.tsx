'use client'

import { HTMLInputTypeAttribute } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  renderOptions: React.ReactNode;
  rules?: Record<string, any>;
}

const SelectForm = ({
  name,
  rules,
  renderOptions,
}: InputProps) => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <select className="select select-bordered w-full" {...field}>
            {renderOptions}
          </select>
        )}
      />
      {errors && <p className="text-red-500">{errors.root?.message}</p>}
    </div>
  );
};

export default SelectForm;
