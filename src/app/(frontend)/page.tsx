
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
    <Suspense fallback={<p>Loading Feateteu</p>}>
<FeaturedSection />
    </Suspense>
    </section>
    <section className=" md:px-6">
    <Suspense fallback={<p>Loading Shops</p>}>
<TopShops />
</Suspense>
    </section>
    <section className=" md:px-6">
    <Suspense fallback={<p>Loading All</p>}>
<AllProductSection />
</Suspense>
    </section>
    <section className=" md:px-6">
    <Suspense fallback={<p>Loading cat</p>}>
<TopProductsCategories />
</Suspense>
    </section>
    </>
  );
}
