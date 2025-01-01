"use client"

import { Button } from "@nextui-org/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "../Loading";

import { useGetCartsItems } from "@/hooks/carts.hook";
import { getCurrentUser } from "@/services/AuthService";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { useUser } from "@/context/user.provider";

export default function CartBar() {
    const router = useRouter()
    const {data:cartsItemResult,isLoading}= useGetCartsItems()
    const [isCustomer, setIsCustomer] = useState(false);
    const {user}= useUser()

    useEffect(() => {
     
      const checkUserRole = async () => {
      
        if (user?.role !== "CUSTOMER") {
          setIsCustomer(false); 
        } else {
          setIsCustomer(true); 
        }
      };

      checkUserRole();
    }, []); 
  
 
  
    if (!isCustomer) {
      
      return null;
    }
    const cartItemQty = cartsItemResult?.data?.totalQuantity
    
    return (
        <>
       
        {

          isLoading ?  <> <ProfileSkeleton/> </> : <Button
          className="text-sm font-normal text-default-600 bg-default-100"
          variant="flat"
          
          onClick={()=>router.push("/cart")}
        >
              <span className="text-pink-700 font-bold text-lg">{cartItemQty}</span>
         <ShoppingCart/>
        </Button>
        }



        </>
    );
}