'use client'
import React, { useState } from 'react';
import { motion } from "framer-motion"
import { Card, CardBody, CardFooter, Image} from "@nextui-org/react";
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
      <Card key={index} isPressable shadow="sm" onMouseOut={()=>setIsHover(null)}
       onMouseOver={()=>handleIsHover(index)} onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible w-full relative p-0">
          <Link href={`/shop/${item.id}`}>
          {/* <Link href={`/shop/${item.title.replace(/\\s+/g,'-')}}`}> */}
          <Image
              alt={item.name}
              className="mx-auto rounded-none object-cover h-[160px] w-full  md:h-[240px]"
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
    >
      Add To Cart
    </motion.button>
    )}
          </CardBody>
          <CardFooter className="text-small flex flex-col h-full justify-between  p-4 ">
            <h6 className='text-green-600/45 text-[12px] my-1 px-2 rounded-md bg-sky-200/15 font-light'>
             {item.category.name}</h6>
           <div className='flex flex-col gap-1'>
           <Link href={`/shop/${item.id}`}>
           {/* <Link href={`/shop/${item.title.replace(/\\s+/g,'-')}}`}> */}
           
           <b className='`text-[12px] my-1.5'>{item.name}</b></Link>
           <p className="text-[18px] font-semibold text-sky-600 text-md">{item.price}৳   <span className='line-through ml-4 text-gray-600'> 500৳ </span></p>
           </div>
            
          </CardFooter>
        </Card>
    )
};

export default ProductCard;
