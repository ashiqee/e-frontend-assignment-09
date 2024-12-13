"use server"
import nexiosInstance from "@/config/naxios.config";


export const getAllProducts = async () => {
  
        const {data} = await nexiosInstance.get<any>("/product");

        return data.data;

}




export const getAllProductsForVendor = async (query:Record<any,any>) => {
  
        const queryString = new URLSearchParams(query).toString()
      
         const res = await nexiosInstance.get(`/product/vendor?${queryString}`, {
          next: { tags: ["products"] }, // Enable caching with a specific tag
        });
      
        if (!res) {
          throw new Error('Failed to fetch posts');
        }
       
        return res.data;
      };
      