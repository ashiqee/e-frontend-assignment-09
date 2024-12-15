import { useMutation } from "@tanstack/react-query"

import { searchItems } from "@/services/SearchService"


export const useSearchItems = ()=>{
    return useMutation({
        mutationKey:["SEARCH"],
        mutationFn: async (searchTerm: string)=> await searchItems(searchTerm)
    });
}