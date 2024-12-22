import React, { useState } from "react";
import TRForm from "@/components/forms/TRFrom";
import TRInput from "@/components/forms/TRInput";
import TRTextarea from "@/components/forms/TRTextarea";
import { addReview } from "@/services/ReviewServices";

// Star Rating Component
const StarRatingInput = ({
  value,
  onChange,
  max = 5,
}: {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
}) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: max }, (_, index) => (
        <button
          type="button"
          key={index}
          onClick={() => onChange(index + 1)}
          className={`w-8 h-8 ${
            index < value ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={index < value ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

const ReviewSubmitModal = ({
  exitsData,
  setIsOpen,
  setIsAllOpen
}: {
  exitsData: any;
  setIsOpen: any;
  setIsAllOpen: any;
}) => {
  const [rating, setRating] = useState(0); 
 
  

  const handleAddReview = async (data:any) => {
console.log(exitsData);


    const reviewData = {
      comment: data.comment,
      rating,
      productId: exitsData,
    }
    

    const res = await addReview(reviewData)

    console.log("Submitted Review:", res);
    setIsOpen(false); 
    setIsAllOpen(false)


  };

  return (
    <>
      <div className="absolute z-50">
        <div className="fixed z-40 inset-0 bg-slate-500/35 flex flex-col w-full bg-opacity-75 justify-center items-center">
          <div className="md:max-w-[70vw]">
            <div
              className="relative z-40 md:min-w-3xl md:max-w-3xl mx-auto max-h-[90vh] my-auto 
         rounded-xl p-6 overflow-hidden overflow-y-auto 
          bg-gray-900 text-white text-center"
            >
              <button
                className="absolute top-4 right-4"
                onClick={() => setIsOpen(false)}
              >
                X
              </button>

              {/* Main Form Body */}
              <div className="p-6 min-w-3xl">
                <TRForm onSubmit={handleAddReview}>
                  {/* Star Rating Input */}
                  <div className="mb-6 flex flex-col justify-center items-center">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-300">
                      Give Rating
                    </label>
                    <StarRatingInput value={rating} onChange={setRating} />
                    <input type="hidden" name="rating" value={rating} />
                  </div>

                  {/* Comment Input */}
                  <div className="mb-6 min-w-96">
                    <TRTextarea
                      name="comment"
                      type="text"
                      label="Comment"
                     
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500/35 text-white rounded-md hover:bg-blue-600"
                    >
                      Submit Review
                    </button>
                  </div>
                </TRForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewSubmitModal;
