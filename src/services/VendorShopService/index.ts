"use server"
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";




export const getVendorShopData =  async (id:any)=>{
    const {data} = await axiosInstance.get(`/vendorShop/${id}`);



    return data;
}


export const getVendorShopOrderData =  async (id:any)=>{
    const {data} = await axiosInstance.get(`/vendorShop/orders/${id}`);



    return data;
}

export const getAllShops =  async ()=>{
    const {data} = await axiosInstance.get(`/vendorShop/`);



    return data;
}

export const getAllShopsProduct =  async (id:string)=>{
    const {data} = await axiosInstance.get(`/vendorShop/products/${id}`);



    return data;
}

export const addFollowUnfollow =  async (shopId:any)=>{
   
    
    const {data} = await axiosInstance.put(`/vendorShop/follow`,shopId);

    if(data?.success){   revalidateTag("shops")}
 


    return data;
}