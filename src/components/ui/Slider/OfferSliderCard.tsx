"use client";
import { Image, Link } from "@nextui-org/react";

export default function OfferSliderCard() {
  return (
    <div className=" md:w-[40vw] hidden md:block ">
      <div className="flex flex-col w-full  justify-center items-center gap-4">
        <Link href="/products">
          <Image
            className="w-full md:min-w-[390px] md:max-h-[166px] 2xl:min-w-[500px] 2xl:max-w-[500px] 2xl:min-h-[240px]"
            src="https://opencart4.magentech.com/themes/so_emarket/layout20/image/catalog/banners/id20/bn2.jpg"
            width={800}
            height={290}
          />
        </Link>
        <Link href="/products">
          <Image
            className="w-full md:min-w-[390px] md:max-h-[166px] 2xl:min-w-[500px] 2xl:max-w-[500px] 2xl:min-h-[240px]"
            src="https://opencart4.magentech.com/themes/so_emarket/layout32/image/catalog/banners/index32/bn5.jpg"
            width={800}
            height={290}
          />
        </Link>
      </div>
    </div>
  );
}
