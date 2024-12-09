import { Button } from "@nextui-org/button";
import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import TRForm from "@/components/forms/TRFrom";
import TRInput from "@/components/forms/TRInput";

import { useUserRegistration } from "@/hooks/auth.hook";
import Loading from "@/components/shared/Loading";
import { useUser } from "@/context/user.provider";
import registrationValidation from "@/schema/register.schema";

const RegistrationForm = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const {
    mutate: handleRegister,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit = async (data: any) => {
    const userData = {
      ...data,
      profilePhoto: "/images/avataaars.png",
    };

    handleRegister(userData);
    userLoading(true);
  };

  if (isSuccess) {
    userLoading(false);
    router.push("/profile");
  }

  return (
    <>
      {isPending && <Loading />}
      <TRForm
        //! Only for development
        defaultValues={{
          name: "Ashiqee",
          email: "ashiqee@gmail.com",
          mobileNumber: "01614654397",
          password: "123456",
        }}
        resolver={zodResolver(registrationValidation)}
        onSubmit={onSubmit}
       
      >
        <div className="py-1.5 flex gap-4">
          {" "}
          <TRInput isRequired label="Full Name" name="name" type="text" />
          <TRInput isRequired label="Mobile" name="mobileNumber" />
        </div>
        <div className="py-1.5 flex gap-4">
        <TRInput isRequired label="Email" name="email" type="email" />
        {" "}
          <TRInput
            isRequired
            label="Password"
            name="password"
            type="password"
          />
          
        </div>
        <div className="py-1.5">
         
        <TRInput isRequired label="Profile Image" name="name" type="file" />
          
        </div>
      

        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type="submit">
            Registration 
          </Button>
        </div>
        <p className="text-center text-small py-2">
          Already have an account?{" "}
          <Link className="text-blue-700 hover:text-blue-500" href={"/login"}>
            Login
          </Link>
        </p>
      </TRForm>
    </>
  );
};

export default RegistrationForm;
