import React from "react";
import ReactStars from "react-rating-stars-component";

const TrendingUniversitiesPlaceHolder = () => {
  return (
    <>
      <tr class="border-b flex border-gray-200  hover:bg-gray-100">
        <td class="py-6 px-6 text-left whitespace-nowrap w-1/2 md:w-4/12">
          <div class="flex items-center">
            <div
              data-placeholder
              class=" h-8 overflow-hidden relative w-full  bg-gray-200"
            ></div>
          </div>
        </td>

        <td class="py-6 px-6 text-left hidden w-4/12 md:block">
          <div class="flex items-center">
            <div
              data-placeholder
              class=" h-8 overflow-hidden relative w-full  bg-gray-200"
            ></div>
          </div>
        </td>
        <td class="py-6 px-6 text-center w-2/12 hidden md:block">
          <div class="flex items-center justify-center">
            <p className="flex justify-center items-center">
              <ReactStars count={5} size={13} edit={false} />
            </p>
          </div>
        </td>
        <td class="py-6 px-6 text-center w-1/2 md:w-2/12">
          <div
            data-placeholder
            class="h-8 overflow-hidden relative w-20 mx-auto rounded-full bg-gray-200"
          ></div>
        </td>
      </tr>
    </>
  );
};

export default TrendingUniversitiesPlaceHolder;
