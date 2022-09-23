import React from "react";
import Card from "./Card";
import ReactStars from "react-rating-stars-component";
import moment from "moment/moment";

// function to return first element in an array
const firstElement = (array) => {
  array.forEach((element, index) => {
    if (index === 0) {
      // console.log(element);
      return element;
    }
  });
};
firstElement([1, 2, 3, 4, 5]);

const ReviewCard = ({ review }) => {
  // convert server timeStamp to milliseconds
  let epochTimestamp = review?.createdAt.toMillis();

  // date posted
  const postedOn = moment(epochTimestamp).fromNow();

  return (
    <Card className=" bg-white shadow-md rounded-xl  mb-10 h-full p-5 hover:cursor-pointer">
      <section>
        <div>
          <div className="flex gap-5 items-center">
            <div className="">
              <span class="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                <svg
                  class="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </span>
            </div>
            <div>
              <ReactStars
                count={5}
                activeColor="#ffd700"
                size={18}
                isHalf={true}
                value={
                  review.course
                    ? `${review.courseRating}`
                    : ` ${review.overallRating}`
                }
                edit={false}
              />
              <span className="block text-xs mt-2 text-slate-600 font-semibold">
                Posted : {postedOn}
              </span>
            </div>
          </div>
          <div class="text-sm text-white mt-5 flex gap-3">
            <span>
              <span class="inline-flex rounded-full items-center px-2 py-1 text-xs bg-indigo-400  font-medium">
                {review.year}
              </span>
            </span>
            <span>
              <span class="inline-flex rounded-full items-center px-2 py-1 text-xs bg-indigo-400  font-medium">
                {review.course ? `Course` : ` University`}
              </span>
            </span>
            <span>
              <span class="inline-flex rounded-full items-center px-2 py-1  text-xs bg-indigo-400  font-medium">
                {review.course
                  ? `${review.course}`
                  : ` graduating year ${new Date(review.date).getFullYear()}`}
              </span>
            </span>
          </div>
          <div className="mt-10">
            <p class=" text-gray-600 font-light text-lg">
              {review.course ? review.courseSummary : review.universitySummary}
              <button
                type="button"
                class="text-primary text-sm ml-2 text-indigo-500 hover:underline"
              >
                See More
              </button>
            </p>
          </div>
          <div class="flex justify-between mt-5">
            <div class="flex items-center">
              <span class="text-gray-600 text-sm mr-1">{review.likes}</span>
              <button type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-colors text-gray-500"
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
      </section>
    </Card>
  );
};

export default ReviewCard;
