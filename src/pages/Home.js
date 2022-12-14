import React, { useEffect, useState } from "react";
import {
  Hero,
  RecentReviews,
  ReviewGuide,
  TrendingUniversities,
} from "../components";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [allReviews, setAllReviews] = useState([]);
  const [trendingUniversities, setTrendingUniversities] = useState([]);
  const [allUniversities, setAllUniversities] = useState([]);
  const [recentUniversitiesReviews, setRecentUniversitiesReviews] = useState(
    []
  );
  const [recentCourseReviews, setRecentCourseReviews] = useState([]);
  const [lastElement, setLastElement] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  // uni ref
  const uniRef = collection(db, "universities");
  // orderBy
  const order = orderBy("rating", "desc");

  // update state func
  const updateState = (query) => {
    getDocs(query).then((doc) => {
      const response = doc.docs.map((doc_1) => doc_1.data());
      // check if query is empty
      if (response.length === 0) {
        setIsEmpty(true);
      }

      setTrendingUniversities((prevState) => [...prevState, ...response]);

      // get last document
      const lastVisible = doc.docs[doc.docs.length - 1];

      // set last visible
      setLastElement(lastVisible);
    });

    setLoading(false);
  };

  // load more universities
  const loadMore = () => {
    setLoading(true);
    const nextQuery = query(uniRef, order, startAfter(lastElement), limit(10));

    // fetch universities (sorted)
    updateState(nextQuery);
  };

  // fetch all universities
  useEffect(() => {
    const getAllUniversities = async () => {
      try {
        const response = await fetch(
          "https://universities-in-ghana.herokuapp.com/universities"
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not fetch UNIVERSITIES.");
        }

        // store university
        localStorage.setItem("universities", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    };
    getAllUniversities();
  }, []);

  // fetch all added universities
  useEffect(() => {
    const getAvailableUniversities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "universities"));

        // results
        const results = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          results.push(doc.data());
          setAllUniversities(results);

          // store the available universities
          localStorage.setItem(
            "availableUniversities",
            JSON.stringify(results)
          );
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAvailableUniversities();
  }, []);

  // fetch trending universities
  useEffect(() => {
    const getTopUniversities = async () => {
      setLoading(true);
      try {
        const firstQuery = query(uniRef, order, limit(10));

        // fetch universities (sorted)
        updateState(firstQuery);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getTopUniversities();
  }, []);

  // get all recent reviews
  useEffect(() => {
    const getRecentUniversityReviews = async () => {
      try {
        // reference to university collection
        const querySnapshot = await getDocs(collection(db, "universities"));

        let uniID = [];
        let recentReviews = [];

        querySnapshot.forEach((doc) => {
          // sub-collection reference
          const q2 = query(
            collection(db, "universities", doc.id, "reviews"),
            orderBy("createdAt"),
            limit(3)
          );

          // university collection id's
          uniID.push(doc.id);

          // subscribe to sub-collection (reviews)
          const unsubscribe = onSnapshot(q2, (querySnapshot) => {
            querySnapshot.forEach((doc_1) => {
              recentReviews.push(doc_1.data());

              setRecentUniversitiesReviews(recentReviews);
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getRecentCourseReviews = async () => {
      try {
        // reference to university collection
        const querySnapshot = await getDocs(collection(db, "universities"));

        let uniID = [];
        let recentReviews = [];

        querySnapshot.forEach((doc) => {
          // sub-collection reference
          const q2 = query(
            collection(db, "universities", doc.id, "programmes")
          );

          // university collection id's
          uniID.push(doc.id);

          // subscribe to sub-collection (reviews)
          const unsubscribe = onSnapshot(q2, (querySnapshot) => {
            querySnapshot.forEach((doc_1) => {
              // sub-collection reference
              const q3 = query(
                collection(
                  db,
                  "universities",
                  doc.id,
                  "programmes",
                  doc_1.id,
                  "reviews"
                ),
                orderBy("createdAt"),
                limit(1)
              );

              getDocs(q3).then((doc_2) => {
                doc_2.forEach((doc) => {
                  recentReviews.push(doc.data());

                  setRecentCourseReviews(recentReviews);
                });
              });
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    // execute both getRecentUniversityReviews & getRecentCourseReviews at the same time
    Promise.all([getRecentUniversityReviews(), getRecentCourseReviews()]).then(
      () =>
        // spread recent uni reviews & recent course reviews into all reviews array
        setAllReviews([...recentUniversitiesReviews, ...recentCourseReviews])
    );
  }, [recentCourseReviews.length, recentUniversitiesReviews.length]);

  return (
    <>
      <Hero results={allUniversities} />
      <TrendingUniversities
        data={trendingUniversities}
        loadMore={loadMore}
        isEmpty={isEmpty}
      />
      <ReviewGuide />
      <RecentReviews review={allReviews} />
    </>
  );
};

export default Home;
