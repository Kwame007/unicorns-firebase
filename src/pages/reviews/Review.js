import React, { useEffect, useState, useContext } from "react";
import {
  ClassYearsPlaceHolder,
  CoursesList,
  FilterBy,
  Header,
  RatingBreakDownPlaceHolder,
  RatingPlaceHolder,
  SignIn,
  Stats,
  UniReviews,
} from "../../components";
import { PhotographIcon, UploadIcon } from "@heroicons/react/outline";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import ReactStars from "react-rating-stars-component";
import { db } from "../../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { context } from "../../store";
import { calculateOverallRating } from "../../helpers/app";

const Review = () => {
  const [uni, setUni] = useState("uni");
  const [course, setCourse] = useState("");
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [university, setUniversity] = useState([]);
  const [ratingBreakDown, setRatingBreakDown] = useState([]);

  // login status
  const { isLoggedIn } = useContext(context);

  const { ID } = useParams();
  const navigate = useNavigate();

  // filter config object
  const config = {
    filter: course,
    setCourse,
    setUni,
    setFilter,
  };

  // toggle modal
  const showModal = () => {
    setIsShowing((prevState) => !prevState);
  };

  // handle filter change
  const handleFilterChange = (event) => {
    setFilter(false);

    // check if uni is truthy, then setUni('') & setCourse(course) vice versa
    if (uni) {
      setUni("");
      setCourse(event.target.value);
    } else {
      setUni(event.target.value);
      setCourse("");
    }
  };

  useEffect(() => {
    // get the uni current user is reviewing & store in local storage
    const getUniversity = async () => {
      setLoading(true);

      try {
        // university doc ref
        const universityRef = query(collection(db, "universities"));

        // setup listener for universities document
        const unsubscribe = onSnapshot(universityRef, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id === ID) {
              setUniversity(doc.data());
              // store the university the user is reviewing in local storage
              localStorage.setItem(
                "currentUniversity",
                JSON.stringify(doc.data())
              );
              setLoading(false);
            } else {
              // doc.data() will be undefined in this case
              setLoading(false);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUniversity();
  }, [ID, navigate, university.length]);

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        // reference to university collection
        const q = query(collection(db, "universities"));

        // subscribe to collection
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // get the current university data
            if (doc.id === ID) {
              localStorage.setItem("uniID", doc.id);
            }

            // sub-collection reference
            const q2 = query(collection(db, "universities", ID, "reviews"));

            const courseRating = [];
            const facultyRating = [];
            const facilitiesRating = [];
            const recommendationRating = [];

            // subscribe to sub-collection (reviews)
            const unsubscribe = onSnapshot(q2, (querySnapshot) => {
              querySnapshot.forEach((doc_1) => {
                // push faculty ratings from each university into one array
                facultyRating.push(doc_1.data().facultyRating);

                // push facilities ratings from each university into one array
                facilitiesRating.push(doc_1.data().facilityRating);

                // push recommendation ratings from each university into one array
                recommendationRating.push(doc_1.data().recommendationRating);

                // push course ratings from each university into one array
                courseRating.push(doc_1.data().courseRating);
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
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAllReviews();
  }, [ID]);

  return (
    <>
      <Header title={university?.name} image={university?.imageUrl} />
      <div className=" mx-4 pt-5 text-gray-800 md:m-10 md:p-5">
        <div className="flex justify-between items-center mb-10 md:mb-28 ">
          <div>
            <div className="mb-5">
              <Link
                to="/reviews"
                className="flex items-center gap-3 transition-all duration-500 hover:text-indigo-500"
              >
                <ArrowLeftIcon className="w-4 " /> All reviews
              </Link>
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
              className=" items-center gap-3 px-3 rounded-lg text-white bg-indigo-400 h-12 hidden  hover:bg-indigo-500 md:p-5 md:transition-all md:duration-500 md:flex"
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
            <button
              className="border-2 h-12 cursor-pointer px-8 rounded-lg transition-all duration-500 hidden hover:bg-slate-100 disabled:cursor-not-allowed md:block"
              disabled
            >
              Add photos
              <UploadIcon className="w-6 inline-block ml-3" />
            </button>

            {/* show on mobile */}
            <button
              className="border h-10 cursor-pointer px-2 rounded-md transition-all duration-500 hover:bg-slate-100 disabled:cursor-not-allowed md:hidden"
              disabled
            >
              <PhotographIcon className="w-6 inline-block" />{" "}
              <small> 0 photos</small>
            </button>
          </div>
        </div>

        {/* show this on  mobile screen */}
        <div className=" flex gap-5 mb-10 md:hidden">
          <button
            onClick={() => {
              // user logged in ? proceed else prompt user to login
              if (isLoggedIn) {
                navigate("write-review");
              } else {
                setIsShowing(true);
              }
            }}
            className="flex items-center gap-3 px-3 rounded-md text-white bg-indigo-400 h-10  hover:bg-indigo-500 md:p-5 md:transition-all md:duration-500"
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
          <button
            className="border h-10 cursor-pointer px-3 rounded-md transition-all duration-500  hover:bg-slate-100 disabled:cursor-not-allowed"
            disabled
          >
            Add photos
            <UploadIcon className="w-6 inline-block ml-3" />
          </button>
        </div>

        <div className="flex flex-col gap-20 md:flex-row">
          <div className="md:w-6/12">
            <div className=" mb-16">
              <h3 className="font-bold text-xl">Rating Breakdown</h3>
              <div className="mt-5">
                {ratingBreakDown?.map((rating) => (
                  <div className="flex items-center gap-10 md:gap-40 md:items-baseline">
                    <h3 className="text-sm font-medium capitalize w-1/3">
                      {rating.title}
                    </h3>

                    <div className=" mb-3 md:mb-5">
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
            <div className="flex justify-between   border-b-2 pb-5 ">
              <h2 className="text-lg font-semibold">
                All reviews ({university?.totalReviews})
                <small className="hidden font-light text-sm text-gray-600 md:block">
                  NB: The total value here includes both courses & universities
                  reviews
                </small>
              </h2>
              <div>
                <label htmlFor="sort">Filter by</label>
                <select
                  name="sort"
                  id="sort"
                  className="border font-medium text-gray-700 text-sm  h-10 rounded-lg ml-3 focus:outline-none focus:border-indigo-500"
                  onChange={handleFilterChange}
                >
                  <option value="uni" selected={filter}>
                    University
                  </option>
                  <option value="course">Course</option>
                </select>
              </div>
            </div>

            {/* show filter component */}
            {course && <FilterBy {...config} />}

            <div>
              {/* show university reviews or course list */}
              {uni ? <UniReviews /> : <CoursesList />}
            </div>
          </div>
        </div>
      </div>
      {isShowing && <SignIn isShowing={isShowing} showModal={showModal} />}
    </>
  );
};

export default Review;
