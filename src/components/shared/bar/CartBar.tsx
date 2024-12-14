"use client"
import CartsModal from "@/app/(frontend)/_components/modals/CartModal";
import { Button } from "@nextui-org/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function CartBar() {
    const [isOpen,setIsOpen]=useState(false)
    return (
        <>
        <Button
            onClick={()=>setIsOpen(true)}
            className="text-sm font-normal text-default-600 bg-default-100"
            
            variant="flat"
          >
           <ShoppingCart/>
          </Button>

          {
  isOpen && <><CartsModal id="" isOpen={isOpen} setIsOpen={setIsOpen} cartsData={""}/></>
}

        </>
    );
}