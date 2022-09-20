import React, { useState, useRef } from "react";

const RatingButton = (props) => {
  const rating = useRef(props.rating);
  const [rateCount, setRateCount] = useState(0);

  return (
    <>
      <button
        onClick={() => props.setRating((rating.current = 1))}
        className={
          rateCount === 0 && rating?.current >= 1
            ? `text-yellow-400`
            : rateCount >= 1
            ? `text-yellow-400`
            : null
        }
        onMouseOver={() => setRateCount(1)}
        onMouseOut={() => setRateCount(0)}
      >
        <span>★</span>
      </button>
      <button
        onClick={() => props.setRating((rating.current = 2))}
        className={
          rateCount === 0 && rating?.current >= 2
            ? `text-yellow-400`
            : rateCount >= 2
            ? `text-yellow-400`
            : null
        }
        onMouseOver={() => setRateCount(2)}
        onMouseOut={() => setRateCount(0)}
      >
        <span>★</span>
      </button>
      <button
        onClick={() => props.setRating((rating.current = 3))}
        className={
          rateCount === 0 && rating?.current >= 3
            ? `text-yellow-400`
            : rateCount >= 3
            ? `text-yellow-400`
            : null
        }
        onMouseOver={() => setRateCount(3)}
        onMouseOut={() => setRateCount(0)}
      >
        <span>★</span>
      </button>
      <button
        onClick={() => props.setRating((rating.current = 4))}
        className={
          rateCount === 0 && rating?.current >= 4
            ? `text-yellow-400`
            : rateCount >= 4
            ? `text-yellow-400`
            : null
        }
        onMouseOver={() => setRateCount(4)}
        onMouseOut={() => setRateCount(0)}
      >
        <span>★</span>
      </button>
      <button
        onClick={() => props.setRating((rating.current = 5))}
        className={
          rateCount === 0 && rating?.current >= 5
            ? `text-yellow-400`
            : rateCount >= 5
            ? `text-yellow-400`
            : null
        }
        onMouseOver={() => setRateCount(5)}
        onMouseOut={() => setRateCount(0)}
      >
        <span>★</span>
      </button>
    </>
  );
};

export default RatingButton;
