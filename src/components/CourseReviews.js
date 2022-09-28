import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import Card from "./Card";
import {
  collection,
  updateDoc,
  query,
  onSnapshot,
  doc,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import ReviewCard from "./ReviewCard";

const CourseReviews = ({
  ID,
  courseID,
  filter,
  setCourse,
  setUni,
  setFilter,
}) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [lastElement, setLastElement] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  // update state func
  const updateState = (query) => {
    getDocs(query).then((doc) => {
      const response = doc.docs.map((doc_1) => doc_1.data());
      // check if query is empty
      if (response.length === 0) {
        setIsEmpty(true);
      }

      setReviews((prevState) => [...prevState, ...response]);

      // get last document
      const lastVisible = doc.docs[doc.docs.length - 1];

      // set last visible
      setLastElement(lastVisible);
      setLoading(false);
    });
  };

  // load more universities
  const loadMore = () => {
    setLoading(true);

    const nextQuery = query(
      collection(db, "universities", ID, "programmes", courseID, "reviews"),
      orderBy("createdAt", "desc"),
      startAfter(lastElement),
      limit(1)
    );

    updateState(nextQuery);
  };

  useEffect(() => {
    setLoading(true);
    const fetchAllReviews = async () => {
      try {
        // reference to university reviews collection
        const uniQuery = query(
          collection(db, "universities", ID, "programmes", courseID, "reviews"),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        updateState(uniQuery);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllReviews();

    // clean up
    return () => {
      // clear all uni reviews
      setReviews([]);
      // setLoading(true);
    };
  }, [ID, courseID]);

  return (
    <div className="mt-5">
      {reviews?.map((review) => (
        <ReviewCard review={review} />
      ))}

      {/* loading spinner */}
      {reviews.length === 0 && (
        <div className="h-96 w-60 text-center pt-32 mx-auto">
          <div class="progress"></div>

          <p className="font-bold text-lg text-indigo-500">Loading reviews</p>
        </div>
      )}

      {/* feedback */}
      {reviews.length === 0 && !loading && (
        <di>
          <h2 className="text-2xl text-slate-600 font-medium h-96  flex items-center justify-center">
            No University reviews yet
          </h2>
        </di>
      )}

      {/* load more reviews  */}
      {reviews.length !== 0 && !isEmpty && (
        <button
          className="border-2 h-12 mt-40 m cursor-pointer px-8 rounded-lg transition-all duration-500 hover:bg-slate-200"
          onClick={loadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CourseReviews;
