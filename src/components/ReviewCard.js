import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";
import ReactStars from "react-rating-stars-component";
import LikeReview from "./LikeReview";
import { useDatePosted, useShowLineClamp } from "../hooks";
import { db } from "../firebase";
import {
  deleteDoc,
  doc,
  query,
  collection,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Modal from "./Modal";
import { calculateOverallRating } from "../helpers/app";

const ReviewCard = ({ review, config }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);

  // ref
  const confirm = useRef(false);

  // show line clamp hook
  const { showMore, showMoreBtn, setShowMore } = useShowLineClamp({
    par: review,
    maxNum: 300,
  });

  // show days posted hook
  const { postedOn } = useDatePosted(review);

  //function to toggle modal
  const showModal = () => {
    setIsShowing((prevState) => !prevState);
  };

  // delete review
  const deleteReview = async (review) => {
    if (review.course) {
      setIsShowing(false);

      // set confirm to true {meaning proceed to delete the course review}
      confirm.current = true;

      // construct current user course ID from the review
      const courseID = review.course.split(" ").join("-").toLowerCase();

      if (confirm) {
        // course document reference
        const courseRef = doc(
          db,
          "universities",
          review.nickname,
          "programmes",
          courseID,
          "reviews",
          review.id
        );

        // document snapshot
        const docSnap = await getDoc(courseRef);

        if (docSnap.exists()) {
          // delete
          deleteDoc(courseRef).then(() => {
            //  update total reviews & rating for current university
            updateDoc(doc(db, "universities", review.nickname), {
              totalReviews: totalReviews - 1,
            }).then(() => {
              window.location.reload();
            });
          });
        }
      }
    } else {
      setIsShowing(false);

      // set confirm to true {meaning proceed to delete the university review}
      confirm.current = true;

      // university document reference
      const uniRef = doc(
        db,
        "universities",
        review.nickname,
        "reviews",
        review.id
      );

      if (confirm) {
        // overall rating
        const overallRatings = [];

        // reference to current university reviews collection
        const currentUniversityReviewsRef = await getDocs(
          query(collection(db, "universities", review.nickname, "reviews"))
        );

        // loop through each document
        currentUniversityReviewsRef.forEach((doc_1) => {
          // push overall ratings from each university into one array
          overallRatings.push(Number(doc_1.data().overallRating));
        });

        // delete
        deleteDoc(uniRef).then(() => {
          //  update total reviews & rating for current university
          updateDoc(doc(db, "universities", review.nickname), {
            // subtract 1 from total review & update with results {subtract 1 cos one review has been deleted}
            totalReviews: totalReviews - 1,

            // re-calculate & update rating value {only re-calculate rating if deleting a university review (cos we are computing the rating based on all overall ratings from each specific university review )...}
            // {return 0 if the length of overall rating equals 1 (which means only one review left) else re-evaluate rating value}
            rating:
              overallRatings.length === 1
                ? 0
                : calculateOverallRating(...overallRatings),
          }).then(() => {
            // reload the page after deleting and updating data
            window.location.reload();
          });
        });
      }
    }
  };

  useEffect(() => {
    // get total review for current university {ie; already existing total reviews}
    const getTotalReviews = async () => {
      // reference to current university document
      const docRef = doc(db, "universities", review.nickname);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // get previous total reviews
        setTotalReviews(docSnap.data().totalReviews);
      }
    };

    getTotalReviews();
  }, [review.nickname]);

  return (
    <>
      <Card className="bg-white shadow-sm border rounded-lg  h-fit p-5 hover:cursor-pointer">
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
                    review?.course
                      ? `${review?.courseRating}`
                      : `${review?.overallRating}`
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
                  {review?.year}
                </span>
              </span>
              <span>
                <span class="inline-flex rounded-full items-center px-2 py-1 text-xs bg-indigo-400  font-light">
                  {review?.course ? `Course` : ` University`}
                </span>
              </span>
              <span>
                <span class="inline-flex rounded-full items-center px-2 py-1  text-xs bg-indigo-400 font-light">
                  {review?.course
                    ? `${review?.course}`
                    : ` graduating year ${new Date(
                        review?.date
                      ).getFullYear()}`}
                </span>
              </span>
            </div>
            <div className="mt-10">
              <p
                class={` text-gray-600 font-light text-lg line-clamp-2  ${
                  showMore ? "line-clamp-none" : "line-clamp-2"
                }`}
              >
                {review?.course
                  ? review?.courseSummary
                  : review?.universitySummary}
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
                  onClick={() => {
                    setIsShowing(true);
                  }}
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

      {/* modal */}
      <Modal isShowing={isShowing}>
        <div class="fixed z-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
          <h3 class="p-4 bg-white text-center sm:text-left text-xl sm:text-2xl leading-6 font-medium ">
            Are you sure you want to delete this review?
          </h3>
          <div class="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-400 text-base font-medium text-white transition-all duration-500 hover:bg-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => deleteReview(review)}
            >
              Confirm
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 
              transition-all duration-500 hover:bg-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={showModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReviewCard;
