import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ReviewPlaceHolder = () => {
  return (
    <div class="flex bg-white shadow-md  rounded-2xl h-72 p-5">
      <div className="w-full">
        <div className="flex gap-5 items-center">
          <div className="">
            <div
              data-placeholder
              class="mr-2 h-14 w-14 rounded-full overflow-hidden relative bg-gray-100"
            ></div>
          </div>
          <div>
            <div class="font-medium">
              <div
                data-placeholder
                class="mb-2 h-5 w-40 overflow-hidden relative bg-gray-100"
              ></div>
            </div>
            <div
              data-placeholder
              class="mb-2 h-3 w-20 overflow-hidden relative bg-gray-100"
            ></div>
          </div>
        </div>
        <div className=" flex justify-between items-center mt-3">
          <div>
            <ReactStars count={5} size={18} edit={false} />
          </div>
          <div class="text-sm text-white  flex gap-3">
            <div
              data-placeholder
              class="mb-2 h-4 w-14 rounded-2xl overflow-hidden relative bg-gray-100"
            ></div>
          </div>
        </div>
        <div className="mt-10">
          <div
            data-placeholder
            class="h-1 w-full mb-1  overflow-hidden relative bg-gray-100"
          ></div>
          <div
            data-placeholder
            class="h-1 w-full mb-1 overflow-hidden relative bg-gray-100"
          ></div>
          <div
            data-placeholder
            class="h-1 w-full mb-1 overflow-hidden relative bg-gray-100"
          ></div>
          <div
            data-placeholder
            class="h-1 w-full mb-1 overflow-hidden relative bg-gray-100"
          ></div>
          <br />
          <div
            data-placeholder
            class="mb-2 h-3 w-20 overflow-hidden relative bg-gray-100"
          ></div>
        </div>
        <div class="flex justify-between mt-5">
          <div class="flex items-center">
            <button type="button">
              <svg
                xmlns="http://www.w3.org/1000/svg"
                class="h-5 w-5 transition-colors text-gray-100"
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
        </div>
      </div>
    </div>
  );
};

export default ReviewPlaceHolder;
