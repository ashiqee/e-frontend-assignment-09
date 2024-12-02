'use client'
import React, { useState } from 'react';
import { motion } from "framer-motion"
import {Button, Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import Link from 'next/link';




const ProductCard = ({item, index}:{item:any,index:number}) => {

  const [isHover,setIsHover]= useState(null);

    const list = [
        {
          title: "Castle Tent House for kids",
          img: "https://babytoysbd.com/wp-content/uploads/2023/02/CASTLE-TENT-HOUSE.webp",
          price: "105.50",
        },
        {
          title: "Transparent Bus Toys",
          img: "https://babytoysbd.com/wp-content/uploads/2023/03/1000020018.jpg",
          price: "103.00",
        },
        {
          title: "Raspberry",
          img: "https://htmldemo.net/kidol/kidol/assets/img/shop/details/1.jpg",
          price: "1010.00",
        },
        {
          title: "Early Education Learning Machine",
          img: "https://babytoysbd.com/wp-content/uploads/2023/03/1000036711.jpg",
          price: "105.30",
        },
        {
          title: "Avocado",
          img: "https://htmldemo.net/kidol/kidol/assets/img/shop/details/1.jpg",
          price: "1015.70",
        },
        {
          title: "Lemon 2",
          img: "https://htmldemo.net/kidol/kidol/assets/img/shop/details/1.jpg",
          price: "108.00",
        },
        {
          title: "Banana",
          img: "https://htmldemo.net/kidol/kidol/assets/img/shop/details/1.jpg",
          price: "107.50",
        },
        {
          title: "Watermelon",
          img: "https://htmldemo.net/kidol/kidol/assets/img/shop/details/1.jpg",
          price: "1012.20",
        },
      ];


      const handleIsHover = (i:any)=>{
        setIsHover(i)
      }

    return (
      <Card key={index} isPressable shadow="sm" onMouseOut={()=>setIsHover(null)} onMouseOver={()=>handleIsHover(index)} onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible w-full relative p-0">
          <Link href={`/shop/${item.id}`}>
          {/* <Link href={`/shop/${item.title.replace(/\\s+/g,'-')}}`}> */}
          <Image
              alt={item.title}
              className="w-full rounded-none object-center h-[180px]  md:h-[380px]"
              radius="lg"
              shadow="sm"
              src={item.thumbnail}
              width="100%"
            />
          </Link>

           {isHover === index &&  (
    <motion.button
    layoutId="underline"  // Used for layout animations (optional for your case)
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}  // Optional: if you want to animate out when removed
    transition={{ 
      opacity: { duration: 1 }, // Slower fade-in with a duration of 1.5 seconds
      ease: "easeInOut"  // Optional: to make it smooth and ease in/out
    }}
      className="md:p-2 p-1 md:px-4 bg-sky-700 text-white w-24 text-sm md:w-40 self-center font-semibold text-center mb-2 absolute z-20 bottom-0 rounded-md"
    >
      Add To Cart
    </motion.button>
    )}
          </CardBody>
          <CardFooter className="text-small flex flex-col  p-4 ">
            <h6 className='text-green-600/45 text-[12px] border px-2 rounded-md bg-sky-200/15 font-light'> category</h6>
           <div className='flex flex-col gap-1'>
           <Link href={`/shop/${item.id}`}>
           {/* <Link href={`/shop/${item.title.replace(/\\s+/g,'-')}}`}> */}
           
           <b className='md:text-xl text-[12px]'>{item.title}</b></Link>
           <p className=" md:text-xl font-semibold text-sky-600 text-md">{item.price}৳   <span className='line-through ml-4 text-gray-600'> 500৳ </span></p>
           </div>
            
          </CardFooter>
        </Card>
    )
};

export default ProductCard;
