import React, { useState, useRef } from "react";
import { useEffect } from "react";

const RatingIndicator = ({ rating, className }) => {
  const [rateCount, setRateCount] = useState(4);

  useEffect(() => {
    setRateCount(rating);
  }, [rating]);

  return (
    <>
      <span className={rateCount >= 1 ? `text-yellow-400` : `text-slate-300`}>
        <span className={className}>★</span>
      </span>
      <span className={rateCount >= 2 ? `text-yellow-400` : `text-slate-300`}>
        <span className={className}>★</span>
      </span>
      <span className={rateCount >= 3 ? `text-yellow-400` : `text-slate-300`}>
        <span className={className}>★</span>
      </span>
      <span className={rateCount >= 4 ? `text-yellow-400` : `text-slate-300`}>
        <span className={className}>★</span>
      </span>
      <span className={rateCount >= 5 ? `text-yellow-400` : `text-slate-300`}>
        <span className={className}>★</span>
      </span>
    </>
  );
};

export default RatingIndicator;
