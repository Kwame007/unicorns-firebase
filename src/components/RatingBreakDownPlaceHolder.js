import React from "react";
import ReactStars from "react-rating-stars-component";

const RatingBreakDownPlaceHolder = () => {
  return (
    <div class="flex items-start justify-between mt-5">
      <div
        data-placeholder
        class="mb-2 h-6 w-1/3  overflow-hidden relative bg-gray-100"
      ></div>
      <div className="w-44">
        <ReactStars count={5} edit={false} size={20} />
      </div>
    </div>
  );
};

export default RatingBreakDownPlaceHolder;
