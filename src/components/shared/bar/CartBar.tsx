"use client"
import CartsModal from "@/app/(frontend)/_components/modals/CartModal";
import { useGetCartsItems } from "@/hooks/carts.hook";
import { Button } from "@nextui-org/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../Loading";

export default function CartBar() {
    const router = useRouter()
    const {data:cartsItemResult,isLoading}= useGetCartsItems()

    if(isLoading){
        return <><Loading/></>
    }

    const cartItemQty = cartsItemResult?.data?.totalQuantity
    
    return (
        <>
       
        <Button
            onClick={()=>router.push("/cart")}
            className="text-sm font-normal text-default-600 bg-default-100"
            
            variant="flat"
          >
                <span className="text-pink-700 font-bold text-lg">{cartItemQty}</span>
           <ShoppingCart/>
          </Button>



        </>
    );
}