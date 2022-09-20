import React from "react";
import ReactStars from "react-rating-stars-component";

const RatingPlaceHolder = () => {
  return (
    <div class="flex items-center gap-3 h-6 justify-between mt-5">
      <div
        data-placeholder
        class=" h-6 w-1/3  overflow-hidden relative bg-gray-100"
      ></div>
      <div className="w-44">
        <ReactStars count={5} edit={false} />
      </div>
      <div
        data-placeholder
        class=" h-6 w-1/3  overflow-hidden relative bg-gray-100"
      ></div>
    </div>
  );
};

export default RatingPlaceHolder;
