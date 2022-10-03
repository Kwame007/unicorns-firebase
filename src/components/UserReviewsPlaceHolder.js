import React from "react";

const UserReviewsPlaceHolder = () => {
  return (
    <div class="flex bg-white shadow-sm border  rounded-2xl h-fit p-5">
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
          <div></div>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-slate-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReviewsPlaceHolder;
