import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const useLikeReviews = (document) => {
  const [likes, setLikes] = useState(document.likes);
  const [isLiked, setIsLiked] = useState(false);

  const likeReview = async () => {
    setIsLiked((prevState) => !prevState);
    setLikes((prevState) => (!isLiked ? ++prevState : --prevState));

    if (document.course) {
      console.log(document.likes);
      // course id
      const courseId = document.course.split(" ").join("-").toLocaleLowerCase();

      // get a reference to the click doc in database
      const docRefCourse = doc(
        db,
        "universities",
        document.nickname,
        "programmes",
        courseId,
        "reviews",
        document.id
      );

      //increase likes of clicked course review if isLiked===true else decrease likes of click course review
      !isLiked
        ? await updateDoc(docRefCourse, {
            likes: document.likes + 1,
          })
        : await updateDoc(docRefCourse, {
            likes: document.likes === 0 ? 0 : --document.likes,
          });
    } else {
      console.log(document.likes);

      // get a reference to the click doc in database
      const docRefUni = doc(
        db,
        "universities",
        document.nickname,
        "reviews",
        document.id
      );

      //increase likes of clicked uni review if isLiked===true else decrease likes of click uni review

      !isLiked
        ? await updateDoc(docRefUni, {
            likes: document.likes + 1,
          })
        : await updateDoc(docRefUni, {
            likes: document.likes === 0 ? 0 : --document.likes,
          });
    }
  };
  return { likes, isLiked, likeReview };
};

export default useLikeReviews;
