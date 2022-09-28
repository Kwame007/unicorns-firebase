import React from "react";
import { SignIn } from ".";
import { useLikeReviews } from "../hooks";

const LikeReview = ({ review }) => {
  // like reviews hook
  const { likesCount, isLiked, isShowing, setIsShowing, handleLike } =
    useLikeReviews(review);

  // toggle modal
  const showModal = () => {
    setIsShowing((prevState) => !prevState);
  };

  return (
    <>
      <div class="flex items-center">
        <span class="text-gray-600 text-sm mr-1">{likesCount}</span>
        <button
          className="disabled:cursor-not-allowed"
          type="button"
          onClick={handleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class={`h-5 w-5 transition-colors ${
              !isLiked ? "text-gray-500" : "text-red-500"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {/* show modal */}
      {isShowing && <SignIn isShowing={isShowing} showModal={showModal} />}
    </>
  );
};

export default LikeReview;
