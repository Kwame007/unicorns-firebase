import React from "react";

const LoadMore = ({ data, isEmpty, loadMore, type, collectionRef }) => {
  return (
    <nav
      class="flex items-center justify-center my-5 md:justify-between"
      aria-label="Pagination"
    >
      <div>
        <div class="text-sm text-gray-700 hidden md:block">
          Showing <span class="font-medium">{data.length}</span> of{" "}
          <span class="font-medium">{collectionRef} </span> {type}
        </div>
      </div>
      {data.length !== 0 && !isEmpty && (
        <button
          type="button"
          className="transition-colors py-2 px-8 rounded font-medium hover:bg-gray-100
       border bg-white text-gray-700 border-gray-300 "
          onClick={loadMore}
        >
          Load More
        </button>
      )}
    </nav>
  );
};

export default LoadMore;
