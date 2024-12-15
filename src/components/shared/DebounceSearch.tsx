"use client"
import { Input } from '@nextui-org/input';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
    SearchIcon,
   
  } from "@/components/icons";
import { useSearchItems } from '@/hooks/search.hook';
import useDebounce from '@/hooks/useDebounce';
import SearchPostModal from '@/app/(frontend)/_components/modals/SearchModal';




interface ISPost {
    _id: string;
    postContent: string;
    image?: string; 
    categories?: string;
    tags: string[];
  }
  
  interface ISearchResult {
    success: boolean;
    message: string;
    data: ISPost[];
  }



const DebounceSearch = () => {
    const {mutate:handleSearch,data,isPending,isSuccess}= useSearchItems()
    const {register,handleSubmit,watch,reset}= useForm()
    const [ searchResult,setSearchResult]=useState<ISearchResult[]|[]>([])
    

    const postsData = data || [];

 
   
   
    
const searchTerm = useDebounce(watch('search'))

    useEffect(()=>{
        if(searchTerm){
            handleSearch(searchTerm)
        }
    },[searchTerm])

    const onSubmit: SubmitHandler<FieldValues>=(d)=>{
            
            
    }

    useEffect(()=>{
        if(!searchTerm){
            setSearchResult([])
        }

        if(!isPending && isSuccess && data && searchTerm){
            setSearchResult(postsData as any)
        }
    },[isPending,isSuccess,data,searchTerm])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Input
            {...register("search")}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
        
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
    </form>

{searchResult.length > 0 && <SearchPostModal postData={postsData} reset={reset} setIsOpen={setSearchResult}/>}
        </div>
    );
};

export default DebounceSearch;