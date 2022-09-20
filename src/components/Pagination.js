import React from "react";

const Pagination = ({
  currentPage,
  maxPageLimit,
  minPageLimit,
  data,
  setCurrentPage,
  onPrevClick,
  onNextClick,
  fetchNextPage,
}) => {
  const totalPages = data?.length - 1;

  // handle page click function
  const handlePageClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  // create an array of pages
  const pages = [];
  for (let i = 0; i <= totalPages; i++) {
    pages.push(i);
  }

  // create ui for all page numbers
  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          className={
            currentPage === page
              ? "rounded-full transition duration-500 ease-in-out border-2 bg-indigo-500 h-6 w-6 flex items-center justify-center  text-white font-bold border-indigo-500 text-sm cursor-pointer"
              : " rounded-full transition duration-500 ease-in-out h-6 w-6 flex items-center justify-center text-gray-500 font-bold  text-sm cursor-pointer"
          }
          id={page}
          onClick={handlePageClick}
        >
          {page}
        </li>
      );
    }
    return null;
  });

  return (
    <>
      <ul className="flex gap-4 my-10 justify-start items-center">
        <li>
          <button
            onClick={onPrevClick}
            disabled={currentPage === pages[1]}
            className="disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="rounded-full transition duration-500 ease-in-out border-2 bg-white h-7 w-7 flex items-center justify-center py-1  "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </li>

        {pageNumbers}

        <li>
          <button
            onClick={() => {
              onNextClick();
              fetchNextPage();
            }}
            disabled={currentPage === pages[pages.length - 1]}
            className="disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="rounded-full transition duration-500 ease-in-out border-2 bg-white h-7 w-7 flex items-center justify-center py-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
