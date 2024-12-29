import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@nextui-org/react"; // Use Modal components as per NextUI's API
import Image from "next/image";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ZoomSliderModal = ({
  isOpen,
  images,
  currentImage,
  onClose,
}: {
  isOpen: boolean;
  images: string[];
  currentImage: string;
  onClose: () => void;
}) => {
  const currentIndex = images.findIndex((img) => img === currentImage);

  const sliderSettings = {
    initialSlide: currentIndex,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <button onClick={onClose} className="text-red-500 font-bold">
            Close
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="relative">
            <Slider {...sliderSettings}>
              {images.map((img, index) => (
                <div key={index} className="flex justify-center items-center">
                  <Image
                    src={img}
                    alt={`Product Image ${index + 1}`}
                    width={800}
                    height={600}
                    className="object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={onClose} className="text-blue-500 font-bold">
            Done
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ZoomSliderModal;
