import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import ReactStars from "react-rating-stars-component";
const RecentReviewsCard = ({ review }) => {
  return (
    <Card className="bg-white shadow-md rounded-xl h-80 p-5 hover:cursor-pointer">
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
              <div class="font-medium">
                <Link
                  class="text-indigo-400 underline hover:text-secondary font-medium"
                  to={`/reviews/${review.nickname}`}
                >
                  {review.university}
                </Link>{" "}
                <span class="text-gray-600">Student</span>
              </div>
              <span className="block text-sm mt-2 text-gray-600 font-semibold">
                08/08/2020
              </span>
            </div>
          </div>
          <div className=" flex justify-between items-center mt-3">
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
            </div>
            <div class="text-sm text-white  flex gap-3">
              <span>
                <span class="inline-flex rounded-full items-center px-2 py-1 text-xs bg-indigo-400  font-medium">
                  {review.course ? `Course` : ` University`}
                </span>
              </span>
            </div>
          </div>
          <div className="mt-10">
            <p class="text-gray-600 text-lg font-light line-clamp-2">
              {review.course ? review.courseSummary : review.universitySummary}
            </p>
            <button
              type="button"
              class="text-sm text-indigo-500 hover:underline"
            >
              See More
            </button>
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

export default RecentReviewsCard;
