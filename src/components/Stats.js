import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

const Stats = ({ rating, totalReviews }) => {
  return (
    <div className=" flex gap-1 text-sm font-bold">
      <span className="mr-2">{rating?.toFixed(1)}</span>

      {rating && (
        <ReactStars
          className="text-xl"
          count={5}
          activeColor="#ffd700"
          size={15}
          isHalf={true}
          value={rating}
          edit={false}
        />
      )}

      <span className="ml-2">{totalReviews} reviews</span>
    </div>
  );
};

export default Stats;
