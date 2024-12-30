"use client"
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

import { siteConfig } from '@/config/site';

export default function HomepageSlider() {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        className="mySwiper"
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        spaceBetween={30}
      >

        { siteConfig.bannerImg.map((img,i)=>(
            <SwiperSlide key={i}>

            <Image alt='KidzBazar Banner' className='w-full md:max-h-[400px] 2xl:max-h-[600px] object-cover' 
            height={1400} src={img.imgUrl} width={1980}/>
            </SwiperSlide>

        ))}
       
      </Swiper>
    </>
  );
}
