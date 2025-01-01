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
    const {mutate:handleSearch,data,isPending,isSuccess,}= useSearchItems()
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
        <div className='w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Input
            {...register("search")}
      aria-label="Search"
      className=" rounded-lg  min-w-[500px]"
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none  flex-shrink-0" />
      }
      type="search"
    /> */}

<div className=" ">
      <Input
        isClearable
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-white dark:placeholder:text-white/60",
            "focus:shadow-transparent",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/25",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        {...register("search")}
        aria-label="Search"
        className=" rounded-lg  min-w-[500px]"
        labelPlacement="outside"
        placeholder="Type to search..."
        radius="lg"
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    </div>

    </form>
    {isPending  && <p className='absolute top-16 bg-gray-600/45 w-60 rounded-lg p-4 '>Loading...</p>}

{searchResult.length > 0  && <SearchPostModal postData={postsData}  reset={reset} setIsOpen={setSearchResult}/>}
        </div>
    );
};

export default DebounceSearch;