"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

import nexiosInstance from "@/config/naxios.config";
import axiosInstance from "@/lib/AxiosInstance";


// registration part

interface AuthResponse{
    success:boolean;
    data:{
        accessToken:string;
        refreshToken:string;
    }
}

export const registerUser = async (userData: FieldValues) => {
      try {
      
       
      const { data } = await nexiosInstance.post(
        "/users/register",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      revalidateTag("users");
    
      
  
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };

export const loginUser = async (userData: FieldValues) => {
  try {
   
    const { data } = await nexiosInstance.post<AuthResponse>("/auth/login", userData);
   

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  redirect('/login')
};

// get current user

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  

  if (accessToken) {
   

    try {
      const { data } = await nexiosInstance.get<any>("/users/my-profile");
     
   
      return data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  };
    


  }



// new accessToken

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await nexiosInstance.post<any>(
      "/auth/refresh-token",
      {},
      {
        withCredentials: true,
        headers: {
          cookies: `refreshToken=${refreshToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};


export const changePassword = async(updatePassword:FieldValues)=>{

  try{
    

    
    const res = await nexiosInstance.post<any>('/auth/change-password',{
      "oldPassword":updatePassword.oldPassword,
      "newPassword":updatePassword.newPassword,
    },
    
        )


    return res.data;

  }catch(error:any){
    throw new Error(error)
  }

}


export const forgotPassword = async(data:any)=>{

  try{
    
    const res = await nexiosInstance.post<any>('/auth/forgot-password',data)


    return res.data;

  }catch(error:any){
    throw new Error(error)
  }

}

export const resetPassword = async(data:any)=>{

  try{
    

    
    const res = await nexiosInstance.post<any>('/auth/reset-password',data,
    
        )


    return res.data;

  }catch(error:any){
    throw new Error(error)
  }

}


export const updateUserProfile = async(data:any)=>{

  try{

    const res = await nexiosInstance.put<any>('/users/update',data,
    
        )

    return res.data;

  }catch(error:any){
    throw new Error(error)
  }

}