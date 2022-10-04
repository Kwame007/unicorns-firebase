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
import { useGetCollectionSize } from "../hooks";
import LoadMore from "./LoadMore";

const CourseReviews = ({
  ID,
  courseID,
  filter,
  setCourse,
  setUni,
  setFilter,
}) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [lastElement, setLastElement] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  // hook
  const collectionSize = useGetCollectionSize(
    query(collection(db, "universities", ID, "programmes", courseID, "reviews"))
  );

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
    };
  }, [ID, courseID]);
  console.log(loading);

  // config
  const config = {
    data: reviews,
    loadMore,
    isEmpty,
    type: "reviews",
    collectionRef: collectionSize,
  };

  return (
    <div className="mt-5">
      {reviews?.map((review) => (
        <ReviewCard review={review} />
      ))}

      {/* loading spinner */}
      {loading && (
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
      <LoadMore {...config} />
    </div>
  );
};

export default CourseReviews;
