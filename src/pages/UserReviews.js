import React from "react";
import { ReviewCard, UserReviewsPlaceHolder } from "../components";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useCallback } from "react";

const UserReviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // get current user id
  const userID = localStorage.getItem("id");

  // get all university reviews by current user
  const getUserReviews = useCallback(async () => {
    // setLoading(true);
    try {
      // universities collection ref
      const querySnapshot = await getDocs(collection(db, "universities"));

      querySnapshot.forEach(async (doc) => {
        // universities reviews reference
        const docSnap = await getDocs(
          collection(db, "universities", doc.id, "reviews")
        );

        // find doc with same id as current logged in user
        docSnap.forEach((doc_1) => {
          if (doc_1.id === userID) {
            // set review
            setUserReviews([doc_1.data()]);
          }
          return;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [userID]);

  // get all course reviews by current user
  const getCourseInfo = useCallback(async () => {
    try {
      // {get the university associated with the current user}
      // universities collection reference
      const querySnapshot = await getDocs(collection(db, "universities"));

      // {loop through documents in the universities collection & create a reference to the programmes sub-collection}
      querySnapshot.forEach((doc) => {
        // reference to the programmes sub-collection
        getDocs(collection(db, "universities", doc.id, "programmes")).then(
          (doc_1) =>
            // {loop through documents in the programmes sub-collection and create a reference to each reviews sub-collection}
            doc_1.forEach((doc_2) => {
              // reference to the programmes reviews sub-collection
              getDocs(
                collection(
                  db,
                  "universities",
                  doc.id,
                  "programmes",
                  doc_2.id,
                  "reviews"
                )
              ).then((doc_3) => {
                // {loop through documents in the programmes reviews sub-collection  & return review who's id === current user id}
                doc_3.forEach((review) => {
                  if (review.id === userID) {
                    setUserReviews((prev) => [...prev, review.data()]);
                  }
                });
              });
            })
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [userID]);

  useEffect(() => {
    setLoading(true);
    // execute both promises at once
    Promise.all([getUserReviews(), getCourseInfo()]).then(() =>
      setLoading(false)
    );
  }, [getUserReviews, getCourseInfo]);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-medium">{`My Reviews (${userReviews.length})`}</h1>
        <p className="text-lg pt-2">{userID}</p>
      </div>
      <div className="grid grid-cols-1 gap-10">
        {/* show all current user reviews */}
        {!loading &&
          userReviews.map((data) => <ReviewCard review={data} config={true} />)}

        {/* show placeholder when empty */}
        {userReviews.length === 0 &&
          loading &&
          Array.from(Array(2).keys()).map(() => <UserReviewsPlaceHolder />)}
      </div>
    </div>
  );
};

export default UserReviews;
