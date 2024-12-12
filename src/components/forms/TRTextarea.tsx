'use client'
import { Input, Textarea } from '@nextui-org/input';
import React from 'react';
import {useFormContext } from "react-hook-form";

import { IRTextarea } from '@/types';

interface IProps extends IRTextarea{}

const TRTextarea = ({
    variant ='bordered',
    size="sm",
    isRequired=false,
    type="text",
    label,
    rows,
    name
}:IProps) => {


    const {register,
        formState:{errors},
    }=useFormContext()

    return (
        <Textarea
        {...register(name)}
        errorMessage={errors?.[name]? (errors[name]?.message as string ) :""}
        isInvalid={!!errors?.[name]}
        isRequired={isRequired}
        label={label}
        name={name}
        rows={rows}
        size={size}
        type={type}
        variant={variant}


        />
    );
};

export default TRTextarea;