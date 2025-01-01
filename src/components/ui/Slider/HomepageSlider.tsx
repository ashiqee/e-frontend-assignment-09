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
import Link from 'next/link';

export default function HomepageSlider() {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        className="mySwiper rounded-2xl "
        modules={[Autoplay, Pagination, Navigation]}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        spaceBetween={30}
        
      >

        { siteConfig.bannerImg.map((img,i)=>(
            <SwiperSlide key={i}>
<Link href={img.pageUrl}>

<Image alt='KidzBazar Banner' className='w-full
min-h-[200px] max-h-[200px]
md:min-h-[350px] md:max-h-[350px] 
2xl:min-h-[500px] 
object-cover' 
            height={1400} src={img.imgUrl} width={1980}/>
</Link>
            </SwiperSlide>

        ))}
       
      </Swiper>
    </>
  );
}
