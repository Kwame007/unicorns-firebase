import React from "react";

const ClassYearsPlaceHolder = () => {
  return (
    <div class="flex items-center gap-3 h-6 justify-between mt-5">
      <div
        data-placeholder
        class=" h-6 w-24  overflow-hidden relative bg-gray-100"
      ></div>
      <div
        data-placeholder
        class=" h-2 w-60  overflow-hidden relative bg-gray-100"
      ></div>

      <div
        data-placeholder
        class=" h-6 w-10  overflow-hidden relative bg-gray-100"
      ></div>
    </div>
  );
};

export default ClassYearsPlaceHolder;
