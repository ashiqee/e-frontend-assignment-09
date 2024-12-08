import nexiosInstance from "@/config/naxios.config";




export const getVendorShopData =  async (id:any)=>{
    const {data} = await nexiosInstance.get(`/vendorShop/${id}`);

    console.log(data);
    

    return data;
}