import nexiosInstance from "@/config/naxios.config";


export const getAllUsers = async () => {
  
        const {data} = await nexiosInstance.get<any>("/users");

        return data.data;

}

