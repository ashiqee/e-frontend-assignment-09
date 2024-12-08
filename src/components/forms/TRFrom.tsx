"use client";
import React, { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface ITRFormProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const TRForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: ITRFormProps) => {
  const formConfig: formConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default TRForm;
