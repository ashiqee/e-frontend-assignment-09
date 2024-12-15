
import axiosInstance from "@/lib/AxiosInstance";




export const getVendorShopData =  async (id:any)=>{
    const {data} = await axiosInstance.get(`/vendorShop/${id}`);

    console.log(data);
    

    return data;
}