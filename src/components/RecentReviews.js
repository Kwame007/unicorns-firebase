import React from "react";
import { RecentReviewsCard } from ".";
import ReviewPlaceHolder from "./ReviewsPlaceHolder";

const RecentReviews = ({ review }) => {
  return (
    <div className="container mx-auto mt-6 mb-6 p-5 ">
      <h2 className="text-3xl font-semibold text-center my-12  mb-10 text-gray-600 uppercase leading-normal  md:mb-20 md:text-4xl">
        Recent Reviews
      </h2>
      <div className="grid grid-cols-1 gap-8 justify-center items-center w-full hover:cursor-pointer md:grid-cols-3 ">
        {review?.map((data) => (
          <RecentReviewsCard review={data} key={data.id} />
        ))}
        {review.length === 0 &&
          [0, 0, 0, 0, 0, 0].map((_, index) => (
            <ReviewPlaceHolder key={index} />
          ))}
      </div>
    </div>
  );
};

export default RecentReviews;
