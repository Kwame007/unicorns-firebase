import React from "react";
import Card from "./Card";
import ReactStars from "react-rating-stars-component";
import LikeReview from "./LikeReview";
import { useDatePosted, useShowLineClamp } from "../hooks";

const ReviewCard = ({ review }) => {
  // show line clamp hook
  const { showMore, showMoreBtn, setShowMore } = useShowLineClamp({
    par: review,
    maxNum: 300,
  });

  // show days posted hook
  const { postedOn } = useDatePosted(review);

  return (
    <Card className=" bg-white shadow-sm border rounded-lg  mb-10 h-full p-5 hover:cursor-pointer">
      <section>
        <div>
          <div className="flex gap-5 items-center">
            <div className="">
              <span class="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                <svg
                  className="h-full w-full text-gray-300"
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
              <span class="inline-flex rounded-full items-center px-2 py-1 text-xs bg-indigo-400  font-light">
                {review.year}
              </span>
            </span>
            <span>
              <span class="inline-flex rounded-full items-center px-2 py-1 text-xs bg-indigo-400  font-light">
                {review.course ? `Course` : ` University`}
              </span>
            </span>
            <span>
              <span class="inline-flex rounded-full items-center px-2 py-1  text-xs bg-indigo-400 font-light">
                {review.course
                  ? `${review.course}`
                  : ` graduating year ${new Date(review.date).getFullYear()}`}
              </span>
            </span>
          </div>
          <div className="mt-10">
            <p
              class={` text-gray-600 font-light text-lg line-clamp-2  ${
                showMore ? "line-clamp-none" : "line-clamp-2"
              }`}
            >
              {review.course ? review.courseSummary : review.universitySummary}
              {/* hide show more button if showMore===true */}
              {!showMore && showMoreBtn && (
                <button
                  type="button"
                  class="text-sm text-indigo-500 hover:underline"
                  onClick={() => setShowMore(true)}
                >
                  See More
                </button>
              )}
            </p>
          </div>
          <div class="flex justify-between mt-5">
            <LikeReview review={review} />
          </div>
        </div>
      </section>
    </Card>
  );
};

export default ReviewCard;
