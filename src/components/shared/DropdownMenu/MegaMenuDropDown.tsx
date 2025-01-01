"use client"
import { useGetAllCategoriesForPublic } from "@/hooks/categories.hook";
import {
    Dropdown,
    DropdownSection,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    cn,
  } from "@nextui-org/react";
import { List } from "lucide-react";
import { useRouter } from "next/navigation";


  
  export default function MegaMenuDropDown() {
    const {data:results,isLoading}= useGetAllCategoriesForPublic();
    const router = useRouter()
        
    
        const categories = results?.data || [];
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  
    return (
      <Dropdown
        showArrow
        classNames={{
          base: "before:bg-default-200", // change arrow background
          content:
            "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
        }}
      >
        <DropdownTrigger>
        <div className="flex gap-2 items-center p-2.5 border border-slate-500/45 bg-transparent hover:bg-slate-600/45 rounded-2xl px-8">
              <List /> <span> All Categories</span>
            </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown menu with description" variant="faded">

            {categories?.slice(0,15).map((cat:any) => (
                 <DropdownItem
                 key={`new-${cat.id}`}
                 onClick={() => router.push(`/products?searchTerm=${cat.name}`)}
               >
                 {cat.name}
               </DropdownItem>
               
            ))}
      
         
        </DropdownMenu>
      </Dropdown>
    );
  }
  