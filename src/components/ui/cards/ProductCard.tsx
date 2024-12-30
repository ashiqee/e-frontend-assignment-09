'use client'
import React, { useState } from 'react';
import { motion } from "framer-motion"
import { Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { useAddToCart } from '@/hooks/carts.hook';
import CartsModal from '@/app/(frontend)/_components/modals/CartModal';
import { useGetCurrentUser } from '@/hooks/users.hook';





const ProductCard = ({item, index}:{item:any,index:number}) => {
  const addtoCartMutation = useAddToCart()
  const {data:user,isLoading}= useGetCurrentUser();
  const queryClient = useQueryClient();
  const [isHover,setIsHover]= useState(null);
  const [isOpen,setIsOpen]=useState(false);
  const router = useRouter()

console.log(item);


      const handleIsHover = (i:any)=>{
        setIsHover(i)


      }

      const handleAddToCart = ()=>{

        if(!user){
          toast.warning("Please registation first for add to cart")
          router.push("/register")

          return
        }else if(user?.role !== "CUSTOMER"){
          toast.warning("Only Customer can add to cart")

          return
        }

        const formData = new FormData();
      
        const cartsData = {
          cart: {
            productId:item.id,
            quantity:1
          }
        }
      
        formData.append("data", JSON.stringify(cartsData));
      
        addtoCartMutation.mutate(formData, {
          onSuccess: () => {
              toast.success("Product added to cart successfully");
            queryClient.invalidateQueries({ queryKey: ['carts'] }); 
            setIsOpen(true); 
          },
          onError: (error: any) => {
            toast.error(error.message || 'Failed to add product to cart');
          },
        });
      };


    return (<>
    {
  isOpen && <><CartsModal cartsData={""} id="" isOpen={isOpen} setIsOpen={setIsOpen}/></>
}
      <Card className='shadow-md max-w-40  md:max-w-full mx-auto hover:shadow-xl' key={index} isPressable shadow="sm" onMouseOut={()=>setIsHover(null)}
       onMouseOver={()=>handleIsHover(index)} onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible shadow-md hover:shadow-xl w-full relative p-0">
{
          
  item?.flashSale && <p className='bg-red-900/65 p-1 text-[10px] animate-pulse absolute z-20 bottom-0 right-0 rounded-sm '>Flash Offer</p>
}          <Link href={`/products/${item.id}`}>
          {/* <Link href={`/shop/${item.title.replace(/\\s+/g,'-')}}`}> */}
          <Image
              alt={item?.name}
              className="mx-auto min-w-60 rounded-none object-cover h-[160px] w-full  md:h-[240px]"
              radius="lg"
              shadow="sm"
              src={item.images[0]}
              width="100%"
            />
          </Link>

           {isHover === index &&  (
    <motion.button
    animate={{ opacity: 1 }}
    className="md:p-2 p-1 md:px-4 bg-sky-700 text-white w-24 text-sm md:w-40 self-center font-semibold text-center mb-2 absolute z-20 bottom-0 rounded-md"
    exit={{ opacity: 0 }}  
    initial={{ opacity: 0 }}
    layoutId="underline" 
      transition={{ 
      opacity: { duration: 1 }, 
      ease: "easeInOut" 
    }}
    onClick={handleAddToCart}
    >
      Add To Cart
    </motion.button>
    )}
          </CardBody>
          <CardFooter className="text-small border border-black/10 flex flex-col h-full justify-between  py-3">
            <h6 className='text-green-300/75 text-[8px] hidden my-1 px-1 rounded bg-sky-200/15 font-light'>
             {item?.category?.name}</h6>
           <div className='flex flex-col gap-1'>
           <Link href={`/products/${item.id}`}>
           {/* <Link href={`/shop/${item.title.replace(/\\s+/g,'-')}}`}> */}
           
           <p className='md:text-[14px] font-light text-[10px] my-1.5'>{item?.name.slice(0,30)}</p></Link>
           <p className="md:text-[18px] font-semibold text-sky-600 text-md">{item.price}৳   <span className='line-through ml-4 text-gray-600'>{item.discount && item.price+item.discount+"৳"}  </span></p>
           </div>
            
          </CardFooter>
        </Card>
        </>
    )
};

export default ProductCard;
