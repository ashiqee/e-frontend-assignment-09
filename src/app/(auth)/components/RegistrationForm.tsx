"use client"

import React, { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";


import TRForm from "@/components/forms/TRFrom";
import TRInput from "@/components/forms/TRInput";
import { useUserRegistration } from "@/hooks/auth.hook";
import Loading from "@/components/shared/Loading";
import { useUser } from "@/context/user.provider";
import registrationValidation from "@/schema/register.schema";
import TRTextarea from "@/components/forms/TRTextarea";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import envConfig from "@/config/envConfig";
import { toast } from "sonner";

interface RegistrationFormProps {
  userRole: string;
}


const RegistrationForm: React.FC<RegistrationFormProps> = ({userRole}) => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const router = useRouter();
  const { setIsLoading: userLoading,isLoading } = useUser();
  const [isPending,setIsPending]= useState(false)
 

  const onSubmit = async (data: any) => {
   
setIsPending(true)
    // Create a FormData object
    const formData = new FormData();

    // Add JSON data
    const registerData = {
      password: data.password,
      user: {
        fullName: data.fullName,
        email: data.email,
        contactNumber: data.contactNumber,
        address: data?.address || "",
        role: userRole,
      },
    };
    

    formData.append("data", JSON.stringify(registerData));

    if (profilePhoto) {
      formData.append("file", profilePhoto);
    }

   
    try {
      
      const response = await axios.post(`${envConfig.baseApi}/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      toast('User registration Success:', response.data.message);
    } catch (error) {
      toast.error('Error registering user:');
    } finally {
      // Trigger loading state
      userLoading(false);
      router.push("/login");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(event.target.files[0]);
    }
  };

 
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
          <TRInput isRequired label="Full Name" name="fullName" type="text" />
          <TRInput isRequired label="Mobile" name="contactNumber" />
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
         
        <TRTextarea
          label="Address"
          name="address"
          rows={1}
          type="text"
        />
        </div>
        <div className="py-1.5">
         
        <Input
        accept="image/*"
          label="Profile Picture"
          type="file"
          onChange={handleFileChange}
        />
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
