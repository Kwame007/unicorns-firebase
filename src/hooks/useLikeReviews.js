import React, { useState, useContext, useRef } from "react";
import { db } from "../firebase";
import {
  doc,
  updateDoc,
  increment,
  arrayRemove,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { context } from "../store";

const useLikeReviews = (review) => {
  // logged in user id
  const userId = localStorage.getItem("id");

  const [isLiked, setIsLiked] = useState(review?.likedBy?.includes(userId));
  const [likesCount, setLikesCount] = useState(review.likes);
  const [isShowing, setIsShowing] = useState(false);

  // likes ref
  const likesRef = useRef(review.likes);
  const likedBy = useRef([]);

  // auth context
  const { isLoggedIn } = useContext(context);

  // get a reference to the click doc in database
  const docRefUni = doc(
    db,
    "universities",
    review.nickname,
    "reviews",
    review.id
  );

  // get the recent data of clicked review
  const getRecentReviewData = (ref) => {
    const unsub = onSnapshot(ref, (doc) => {
      likedBy.current = doc.data().likedBy;
    });
  };

  // update likes function {updates likes field based on provided reference}
  const updateLikes = (reviewRef, likedBy) => {
    if (likedBy.current.includes(userId) && isLiked) {
      setLikesCount((prevState) => --prevState);
      setIsLiked((prevState) => !prevState);

      updateDoc(reviewRef, {
        likes: likesRef.current === 0 ? 0 : likesRef.current - 1,
        likedBy: arrayRemove(userId),
      })
        .then(() => {
          console.log("unLiked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setLikesCount((prevState) => ++prevState);
      setIsLiked((prevState) => !prevState);

      updateDoc(reviewRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleLike = () => {
    // check if current user is authenticated
    if (!isLoggedIn) {
      setIsShowing(true);
      return;
    }

    // check if clicked review is a course or uni review
    if (review.course) {
      // course id
      const courseId = review.course.split(" ").join("-").toLocaleLowerCase();

      // get a reference to the click doc in database
      const docRefCourse = doc(
        db,
        "universities",
        review.nickname,
        "programmes",
        courseId,
        "reviews",
        review.id
      );

      getRecentReviewData(docRefCourse);
      // update course review likes
      updateLikes(docRefCourse, likedBy);
    } else {
      getRecentReviewData(docRefUni);

      // update university review likes
      updateLikes(docRefUni, likedBy);
    }

    // unsubscribe
  };

  return {
    likesCount,
    isLiked,
    isShowing,
    setIsShowing,
    handleLike,
  };
};

export default useLikeReviews;
