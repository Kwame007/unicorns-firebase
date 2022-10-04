import React from "react";
import Card from "./Card";
import ReactStars from "react-rating-stars-component";
import LikeReview from "./LikeReview";
import { useDatePosted, useShowLineClamp } from "../hooks";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const ReviewCard = ({ review, config }) => {
  // show line clamp hook
  const { showMore, showMoreBtn, setShowMore } = useShowLineClamp({
    par: review,
    maxNum: 300,
  });

  // show days posted hook
  const { postedOn } = useDatePosted(review);

  // delete review
  const deleteReview = async (review) => {
    if (review.course) {
      // course id
      const courseID = review.course.split(" ").join("-").toLowerCase();

      // course doc ref
      const courseRef = doc(
        db,
        "universities",
        review.nickname,
        "programmes",
        courseID,
        "reviews",
        review.id
      );

      // confirm("are you sure");
      // delete
      await deleteDoc(courseRef);
      console.log(courseRef);
    } else {
      // uni doc ref
      const uniRef = doc(
        db,
        "universities",
        review.nickname,
        "reviews",
        review.id
      );
      // confirm("are you sure");

      // delete
      await deleteDoc(uniRef);
      console.log("uni");
    }
  };

  return (
    <Card className=" bg-white shadow-sm border rounded-lg  mb-10 h-fit p-5 hover:cursor-pointer">
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
            {/* if config is truthy show delete icon*/}
            {config ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 transition-colors duration-500 hover:text-red-500"
                onClick={() => deleteReview(review)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            ) : (
              <LikeReview review={review} />
            )}
          </div>
        </div>
      </section>
    </Card>
  );
};

export default ReviewCard;
