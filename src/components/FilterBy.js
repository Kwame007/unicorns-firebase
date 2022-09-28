import React from "react";

const FilterBy = ({ filter, setFilter, setCourse, setUni }) => {
  return (
    <div className=" my-4">
      <span class=" inline-flex rounded-full items-center px-2 py-1 text-sm bg-indigo-400 text-white  font-normal">
        {filter}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 ml-2 hover:cursor-pointer"
          onClick={() => {
            setFilter(true);
            setCourse("");
            setUni("uni");
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </div>
  );
};

export default FilterBy;
