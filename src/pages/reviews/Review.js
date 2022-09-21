import React, { useEffect, useState, useContext } from "react";
import {
  ClassYearsPlaceHolder,
  Header,
  Modal,
  RatingBreakDownPlaceHolder,
  RatingPlaceHolder,
  ReviewCard,
  SignIn,
  Stats,
} from "../../components";
import { UploadIcon } from "@heroicons/react/outline";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import ReactStars from "react-rating-stars-component";
import { db } from "../../firebase";
import {
  collection,
  updateDoc,
  query,
  onSnapshot,
  doc,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { context } from "../../store";

// calculate overall rating
function calculateOverallRating(...ratings) {
  let totalRating = 0;
  ratings.forEach((rating) => {
    totalRating += rating;
  });
  return totalRating / ratings.length;
}

const Review = () => {
  const [university, setUniversity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [uniRating, setUniRating] = useState();
  const [ratingBreakDown, setRatingBreakDown] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [ratings, setRatings] = useState({});

  const { isLoggedIn } = useContext(context);

  const { ID } = useParams();
  const navigate = useNavigate();

  // toggle modal
  const showModal = () => {
    setIsShowing((prevState) => !prevState);
  };

  useEffect(() => {
    const getUniversity = async () => {
      setLoading(true);
      try {
        // university doc ref
        const universityRef = query(collection(db, "universities"));

        // setup listener for universities document
        const unsubscribe = onSnapshot(universityRef, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id);
            if (doc.id === ID) {
              console.log("Document data:", doc.data());
              setUniversity(doc.data());
              // store the university the user is reviewing in local storage
              localStorage.setItem(
                "currentUniversity",
                JSON.stringify(doc.data())
              );
              setLoading(false);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              setLoading(false);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUniversity();
  }, [ID, setUniversity]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        let allReviews = [];

        const uniQuery = query(collection(db, "universities", ID, "reviews"));
        const courseQuery = query(
          collection(db, "universities", ID, "programmes")
        );

        const unsubscribes = onSnapshot(uniQuery, (querySnapshot) => {
          querySnapshot.forEach((doc) => allReviews.push(doc.data()));
        });

        const unsubscribe = onSnapshot(courseQuery, (querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            // reviews collection reference {reviews inside programmes}
            const docs = await getDocs(
              collection(
                db,
                "universities",
                ID,
                "programmes",
                doc.id,
                "reviews"
              )
            );

            docs.forEach((doc_1) => {
              if (doc_1) {
                allReviews.push(doc_1.data());

                setReviews(allReviews);
              }
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllReviews();
  }, [ID]);

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        // reference to university collection
        const q = query(collection(db, "universities"));

        // total reviews for a specific university
        let totalReviews = 0;

        // subscribe to collection
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          //check if collection is not empty
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              // get the current university data
              if (doc.id === ID) {
                totalReviews = doc.data().totalReviews;
              }

              // sub-collection reference
              const q2 = query(collection(db, "universities", ID, "reviews"));

              // university collection id's
              const overallRatings = [];
              const courseRating = [];
              const facultyRating = [];
              const facilitiesRating = [];
              const recommendationRating = [];

              // subscribe to sub-collection (reviews)
              const unsubscribe = onSnapshot(q2, (querySnapshot) => {
                querySnapshot.forEach((doc_1) => {
                  // push overall ratings from each university into one array
                  overallRatings.push(Number(doc_1.data().overallRating));

                  // push faculty ratings from each university into one array
                  facultyRating.push(doc_1.data().facultyRating);

                  // push facilities ratings from each university into one array
                  facilitiesRating.push(doc_1.data().facilityRating);

                  // push recommendation ratings from each university into one array
                  recommendationRating.push(doc_1.data().recommendationRating);

                  // push course ratings from each university into one array
                  courseRating.push(doc_1.data().courseRating);

                  setRatings({
                    facilities: doc_1.data().facilityRating,
                    faculty: doc_1.data().facilityRating,
                    recommendation: doc_1.data().facilityRating,
                  });
                });

                // rating breakdown
                setRatingBreakDown([
                  {
                    value: calculateOverallRating(...courseRating),
                    title: "course",
                  },
                  {
                    value: calculateOverallRating(...facultyRating),
                    title: "faculty",
                  },
                  {
                    value: calculateOverallRating(...facilitiesRating),
                    title: "facilities",
                  },
                  {
                    value: calculateOverallRating(...recommendationRating),
                    title: "recommendation",
                  },
                ]);

                // calculate rating based on overall ratings
                setUniRating(calculateOverallRating(...overallRatings));
              });
            });
          }
        });
        console.log(totalReviews);
        console.log(uniRating);
      } catch (error) {
        console.log(error);
      }
    };

    getAllReviews().then(() => {
      // current university reference
      const uniRef = doc(db, "universities", ID);

      //update if uni rating value is available
      if (uniRating) {
        updateDoc(uniRef, {
          totalReviews: reviews.length,
          rating: uniRating,
        });
      }
    });
  }, [ID, reviews.length, uniRating]);

  return (
    <>
      <Header title={university?.name} image={university?.imageUrl} />
      <div className=" mx-10 p-5 text-gray-800 my-10">
        <div className="flex justify-between mb-28 ">
          <div>
            <div className=" flex gap-3 mb-5">
              <ArrowLeftIcon className="w-6 " />{" "}
              <Link to="/reviews">All reviews</Link>
            </div>
            {ratingBreakDown.length > 0 && (
              <Stats
                rating={university.rating}
                totalReviews={university.totalReviews}
              />
            )}
            {ratingBreakDown.length === 0 && <RatingPlaceHolder />}
          </div>
          <div className=" flex gap-5">
            <button
              onClick={() => {
                // user logged in ? proceed else prompt user to login
                if (isLoggedIn) {
                  navigate("write-review");
                } else {
                  setIsShowing(true);
                }
              }}
              className="flex items-center gap-3 px-5 rounded-lg text-white bg-indigo-400 h-12 transition-all duration-500 hover:bg-indigo-500"
            >
              <p>Write Review</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
            <button className="border-2 h-12 cursor-pointer px-8 rounded-lg transition-all duration-500 hover:bg-slate-100">
              Add photos
              <UploadIcon className="w-6 inline-block ml-3" />
            </button>
          </div>
        </div>
        <div className="flex gap-20">
          <div className="w-6/12">
            <div className=" mb-16">
              <h3 className="font-bold text-xl">Rating Breakdown</h3>
              <div className="mt-5">
                {ratingBreakDown?.map((rating) => (
                  <div className="flex items-baseline gap-40">
                    <h3 className="text-xl font-medium capitalize w-1/3">
                      {rating.title}
                    </h3>

                    <div className="mb-5">
                      <ReactStars
                        className="text-xl"
                        count={5}
                        activeColor="#ffd700"
                        size={20}
                        isHalf={true}
                        value={rating.value}
                        edit={false}
                      />
                    </div>
                  </div>
                ))}
                {ratingBreakDown.length === 0 &&
                  // create an array with N number of elements
                  Array.from(Array(4).keys()).map(() => (
                    <RatingBreakDownPlaceHolder />
                  ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl">
                Class Years{" "}
                <small className="text-xs text-slate-500">(coming soon)</small>
              </h3>

              <div className="mt-5">
                {/* // create an array with N number of elements */}
                {Array.from(Array(5).keys()).map(() => (
                  <ClassYearsPlaceHolder />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between mb-10  border-b-2 pb-5 ">
              <h2 className="text-lg font-semibold">
                All reviews ({university?.totalReviews})
              </h2>
              <div>
                <label htmlFor="sort">Filter by</label>
                <select
                  name="sort"
                  id="sort"
                  className="border-2 h-10 rounded-lg ml-3 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Name">All</option>
                  <option value="Name">Recent</option>
                  <option value="Name">Course</option>
                  <option value="Name">University</option>
                </select>
              </div>
            </div>

            <div className="">
              {!loading && reviews?.map((data) => <ReviewCard review={data} />)}

              {reviews.length === 0 && loading && (
                <div className="h-96 w-60 text-center pt-32 mx-auto">
                  <div class="progress"></div>

                  <p className="font-bold text-lg text-indigo-500">
                    Loading reviews
                  </p>
                </div>
              )}

              {reviews.length === 0 && !loading && (
                <di>
                  <h2 className="text-2xl text-slate-600 font-medium h-96  flex items-center justify-center">
                    No University reviews yet
                  </h2>
                </di>
              )}
              {/* load more reviews  */}
              <button
                className="border-2 h-12 cursor-pointer px-8 rounded-lg transition-all duration-500 hover:bg-slate-200"
                // onClick={loadMore}
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
      {isShowing && <SignIn isShowing={isShowing} showModal={showModal} />}
    </>
  );
};

export default Review;
