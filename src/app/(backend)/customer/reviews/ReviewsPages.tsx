"use client";

import { useEffect, useState } from "react";
import { getMyReviews } from "@/services/ReviewServices";
import ReviewsHistoryTable from "../../components/Tables/ReviewHistoryTable";

export default function ReviewsManage() {
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await getMyReviews();
        setReviewData(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2 className="text-xl mb-10">Reviews History</h2>
      <ReviewsHistoryTable reviewData={reviewData} />
    </>
  );
}
