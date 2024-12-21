'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Select, SelectItem } from '@nextui-org/react';

import { IInput } from '@/types';

interface IOption {
  label: string;
  value: string | number;
}

interface IProps extends IInput {
  options: IOption[]; // Accepts options as an array of {label, value}
}

const TRSelect = ({
  variant = 'bordered',
  size = 'sm',
  isRequired = false,
  label,
  name,
  options,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <Select
        {...register(name, { required: isRequired })}
        aria-label={label}
        isInvalid={!!errors?.[name]}
        label={label}
        size={size}
        className='text-white'
        color='default'
        validationState={errors?.[name] ? 'invalid' : 'valid'}
        variant={variant}
      >
        {options.map((option) => (
          <SelectItem  key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name]?.message as string) || `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default TRSelect;
