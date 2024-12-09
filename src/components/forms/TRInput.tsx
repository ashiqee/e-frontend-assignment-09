'use client'
import { Input } from '@nextui-org/input';
import React from 'react';
import {useFormContext } from "react-hook-form";

import { IInput } from '@/types';

interface IProps extends IInput{}

const TRInput = ({
    variant ='bordered',
    size="sm",
    isRequired=false,
    type="text",
    label,
    name
}:IProps) => {


    const {register,
        formState:{errors},
    }=useFormContext()

    return (
        <Input
        {...register(name)}
        errorMessage={errors?.[name]? (errors[name]?.message as string ) :""}
        isInvalid={!!errors?.[name]}
        isRequired={isRequired}
        label={label}
        name={name}
        size={size}
        type={type}
        variant={variant}


        />
    );
};

export default TRInput;