"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card as NextUiCard, CardBody, Image} from "@nextui-org/react";
import Link from "next/link";

import RegistrationTabs from "../components/RegistrationTabs";


const RegisterPage = () => {
  

  return (
 

<div className="relative h-screen w-full overflow-hidden">
  {/* Background video  */}

  <video
    autoPlay
    loop
    muted
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  >
    <source src="/video/bg_video_2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <motion.div animate={{ y: [-200, 100, 0] }} className="relative z-10  items-center h-full flex justify-center">
      <NextUiCard
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 "
        shadow="md"
      >

        <CardBody className="md:p-10 md:min-w-[40vw]  mx-auto md:px-20 2xl:px-40">
          <div className="md:flex items-center justify-center gap-20">

          <div className="md:min-w-[20vw] w-full text-center pb-5">
            <Link href={'/'}> <h2 className="text-3xl font-bold uppercase">Kidz Bazar</h2></Link>
            <small>All Kinds Of kids Shop</small>
            
            <h3 className="text-xl mt-2">Registration Now</h3>
            </div>
          
<RegistrationTabs/>
          </div>
         
        </CardBody>
      </NextUiCard>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
