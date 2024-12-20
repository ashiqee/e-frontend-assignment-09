
import AllProductSection from "@/components/(pagesection)/Homepages/AllProductSection";
import FeaturedSection from "@/components/(pagesection)/Homepages/FeaturedSection";
import TopProductsCategories from "@/components/(pagesection)/Homepages/TopCategories";
import TopShops from "@/components/(pagesection)/Homepages/TopVendorShops";
import HomepageSlider from "@/components/ui/Slider/HomepageSlider";
import { Suspense } from "react";



export default async function Home() {



  return (
    <>
    
    <section className="max-h-[600px]">
      <Suspense fallback={<p>Loading banner</p>}>

   <HomepageSlider/>
      </Suspense>

    </section>
    <section className=" md:px-6">
 
<FeaturedSection />
  
    </section>
    <section className=" md:px-6">
  
<TopShops />

    </section>
    <section className=" md:px-6">

<TopProductsCategories />

    </section>
    <section className=" md:px-6">

<AllProductSection />

    </section>
 
    </>
  );
}
