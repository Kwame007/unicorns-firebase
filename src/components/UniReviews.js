import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import ReviewCard from "./ReviewCard";
import LoadMore from "./LoadMore";
import { useGetCollectionSize } from "../hooks";

const UniReviews = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [lastElement, setLastElement] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  // get id from params
  const { ID } = useParams();

  // hook
  const collectionSize = useGetCollectionSize(
    query(collection(db, "universities", ID, "reviews"))
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
      collection(db, "universities", ID, "reviews"),
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
          collection(db, "universities", ID, "reviews"),
          orderBy("createdAt", "desc"),
          limit(2)
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
      setLoading(false);
    };
  }, [ID]);

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
      {reviews.length === 0 && loading && (
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

      <LoadMore {...config} />
    </div>
  );
};

export default UniReviews;
