
import AllProductSection from "@/components/(pagesection)/Homepages/AllProductSection";
import FeaturedSection from "@/components/(pagesection)/Homepages/FeaturedSection";
import Newsletter from "@/components/(pagesection)/Homepages/NewsLaterSection";
import TopProductsCategories from "@/components/(pagesection)/Homepages/TopCategories";
import TopShops from "@/components/(pagesection)/Homepages/TopVendorShops";
import HomepageSlider from "@/components/ui/Slider/HomepageSlider";
import OfferSliderCard from "@/components/ui/Slider/OfferSliderCard";
import { Suspense } from "react";



export default async function Home() {



  return (
    <>
    
    <section className="md:max-h-[600px] my-4 md:flex md:px-6 2xl:px-0 gap-4 container mx-auto">
    

      <HomepageSlider/>
      {/* offer section  */}
    <OfferSliderCard/>
    

    </section>
    <section className=" md:px-6">
 
<FeaturedSection />
  
    </section>
    
    <section className=" md:px-6">

<TopProductsCategories />

    </section>
    <section className=" md:px-6">

<AllProductSection />

    </section>
    <section className=" md:px-6">

<Newsletter />

    </section>
 
    </>
  );
}
