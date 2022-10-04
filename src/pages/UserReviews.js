import React from "react";
import { ReviewCard, UserReviewsPlaceHolder } from "../components";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useCallback } from "react";
import { useRef } from "react";

const UserReviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uniID, setUniID] = useState(false);

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
            // set current university id
            setUniID(doc_1.data().nickname);

            // set review
            setUserReviews([doc_1.data()]);

            return;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [userID]);

  // get all course reviews by current user
  const getCourseInfo = useCallback(async () => {
    try {
      // universities collection ref
      const querySnapshot = await getDocs(
        collection(db, "universities", uniID, "programmes")
      );

      querySnapshot.forEach((doc_1) => {
        getDocs(
          collection(
            db,
            "universities",
            uniID,
            "programmes",
            doc_1.id,
            "reviews"
          )
        ).then((doc_2) => {
          doc_2.forEach((doc) => {
            if (doc.id === userID) {
              setUserReviews((prev) => [...prev, doc.data()]);
            }
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [uniID, userID]);

  useEffect(() => {
    // execute both promises at once
    Promise.all([getUserReviews(), getCourseInfo()]);

    setLoading(false);
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
          Array.from(Array(2).keys()).map(() => <UserReviewsPlaceHolder />)}
      </div>
    </div>
  );
};

export default UserReviews;
