
import axiosInstance from "@/lib/AxiosInstance";


export const getAllUsers = async (query:Record<any,any>) => {
  
        const fetchOptions = {
            next: {
              tags: ["users"],
            },
          };
        const queryString = new URLSearchParams(query).toString()
        
        const res = await axiosInstance.get(`/users?${queryString}`);
                
          if (!res) {
            throw new Error('Failed to fetch posts');
          }
         
          return res.data;
        };