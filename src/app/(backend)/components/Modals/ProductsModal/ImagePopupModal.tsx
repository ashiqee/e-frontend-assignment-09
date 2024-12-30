import { Image } from "@nextui-org/react";

export default function ImagePopupModal({ previewImage,
    setIsOpen,
     }: { previewImage: string; setIsOpen?: any;  }) {

        console.log("Modal", previewImage);
        
    return (
        <div className="absolute z-50">
        <div 
        onClick={() => setIsOpen(false)}
        className="fixed   z-40 inset-0 bg-black/50 flex flex-col w-full   justify-center items-center ">
             <div className="">
               <div
                 className=" relative  z-40 min-w-3xl max-w-3xl mx-auto max-h-[90vh] my-auto 
              rounded-xl p-10 overflow-hidden overflow-y-auto 
              "
               >
                 
                 <Image 
                   src={previewImage}
                   className="w-full"
                   width={600}
                   height={600}
                   alt="image"
                 />
               </div>
             </div>
           </div>
        </div>
    );
}