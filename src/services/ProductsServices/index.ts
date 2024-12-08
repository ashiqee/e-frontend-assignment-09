import nexiosInstance from "@/config/naxios.config";


export const getAllProducts = async () => {
  
        const {data} = await nexiosInstance.get<any>("/product");

        return data.data;

}


