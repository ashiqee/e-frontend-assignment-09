interface Review {
  username: string;
  rating: number;
  comment: string;
}

const ReviewsSection = ({ reviews }: { reviews: Review[] }) => {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="p-6  shadow-md rounded-md">
      {/* Average Rating */}
      <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
      <p className="text-lg font-semibold mb-6">
        Average Rating:{" "}
        <span className="text-yellow-500">{averageRating.toFixed(1)}</span> /5
      </p>

      {/* Review List */}
      <div className="space-y-4">
        {reviews?.map((review, index) => (
          <div
            key={index}
            className="p-4 border rounded-md shadow-sm bg-gray-400/5"
          >
            {/* Username */}
           <div className="flex justify-between items-center">
           <h4 className="text-md font-medium">{review.username}</h4>
           <h4 className="text-md font-medium">{"21/12/2024"}</h4>
           </div>
            {/* Rating */}
            <div className="flex items-center my-2">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < review.rating ? "#FFD700" : "#E5E7EB"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              ))}
            </div>
            {/* Comment */}
            <p className="text-sm ">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
