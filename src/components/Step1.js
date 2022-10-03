import React, { useState, useRef, useEffect, useContext } from "react";
import { AddCourse } from ".";
import { context } from "../store";
import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ReactStars from "react-rating-stars-component";

function Step1({
  courseRating,
  facultyRating,
  facilityRating,
  recommendationRating,
  dispatch,
  overallRating,
  name,
  nickname,
  university,
  programme,
}) {
  const show = useRef(false);
  const [isValid, setIsValid] = useState(false);
  const [programmes, setProgrammes] = useState([]);

  const { isShowing, toggleModal } = useContext(context);

  const courseId = localStorage.getItem("courseId");

  // calculate average rating
  function averageRating(n) {
    const sum = [...n].reduce((prev, curr) => prev + curr);
    const avg = sum / [...n].length;
    if (!avg.isInteger && avg % 1 !== 0) {
      return avg.toFixed(1);
    } else {
      return avg;
    }
  }

  const handleUniChange = (event) => {
    dispatch({ type: "SET_UNIVERSITY", payload: event.target.value });
  };
  const handleProgramChange = (event) => {
    dispatch({ type: "SET_PROGRAMME", payload: event.target.value });

    // store course id in local storage
    localStorage.setItem(
      "courseId",
      event.target.value.toLowerCase().split(" ").join("-")
    );
  };

  // set overall rating
  useEffect(() => {
    dispatch({
      type: "OVERALL_RATING",
      payload: averageRating([
        courseRating,
        facultyRating,
        facilityRating,
        recommendationRating,
      ]),
    });
  }, [
    courseRating,
    facultyRating,
    facilityRating,
    recommendationRating,
    dispatch,
  ]);

  // show overall rating
  useEffect(() => {
    const showOverallRating = show.current;

    if (
      courseRating &&
      facilityRating &&
      facultyRating &&
      recommendationRating &&
      overallRating
    ) {
      setIsValid(true);
    }

    if (isValid) {
      showOverallRating.classList.replace("hidden", "block");
    }

    console.log(showOverallRating);
  }, [
    recommendationRating,
    overallRating,
    isValid,
    facilityRating,
    facultyRating,
    courseRating,
  ]);

  // get all programmes by selected university
  useEffect(() => {
    const fetchAllUniCourses = async () => {
      try {
        const q = query(collection(db, "universities", nickname, "programmes"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let responds = [];
          querySnapshot.forEach((doc) => {
            responds.push(doc.data());
          });

          setProgrammes(responds);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUniCourses();
  }, [nickname]);

  return (
    <>
      {/* select uni & course */}
      <h1 className="text-left px-6 mt-10 text-3xl text-stone-800 font-semibold mx-auto max-w-4xl">
        {" "}
        Add your review
      </h1>
      <div className="px-6 flex  space-y-8 mx-auto my-12 justify-between max-w-4xl gap-x-0 md:gap-x-4 md:flex-row md:space-y-0">
        <div className="w-full">
          <select
            className="w-full p-2 text-base font-semibold text-slate-700  border border-slate-400 h-12 rounded-lg focus:outline-none focus:border-indigo-500 "
            onChange={handleUniChange}
            value={university}
          >
            <option value="">Select University</option>
            <option value={name}>{name}</option>
          </select>
        </div>

        <div className="w-full">
          <select
            className="w-full p-2 text-base font-semibold text-slate-700 border border-slate-400 h-12 rounded-lg focus:outline-none focus:border-indigo-500 "
            onChange={handleProgramChange}
            value={programme}
          >
            <option>Select Course</option>
            {programmes?.map((data, index) => (
              <option key={index} value={data.course}>
                {data.course}
              </option>
            ))}
          </select>
          <p
            className="mt-3 text-sm font-bold text-indigo-500 cursor-pointer flex justify-end"
            onClick={toggleModal}
          >
            Add your course{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 ml-2"
            >
              <path
                fill-rule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
          </p>
        </div>
      </div>

      {/* rating course */}
      <div className="flex flex-col max-w-4xl mx-auto px-6 space-y-12 mt-20 items-center">
        <div className="w-full flex flex-col space-y-5 md:flex-row md:space-y-0">
          <div className="flex flex-col flex-1 text-left">
            <h2 className="text-2xl text-slate-700 font-semibold">
              Rate the <span className="text-indigo-500">course</span>
            </h2>
            <p className="max-w-md pt-2 text-base text-slate-700 font-normal leading-5">
              How did you find the execution and delivery of the course and
              course materials?
            </p>
          </div>
          <div className="flex flex-1 md:justify-end">
            <div className="text-3xl text-gray-300 space-x-0.5">
              <ReactStars
                count={5}
                onChange={(rating) =>
                  dispatch({ type: "COURSE_RATING", payload: rating })
                }
                size={28}
                isHalf={true}
                activeColor="#ffd700"
                value={courseRating}
              />
            </div>
          </div>
        </div>

        {/* rating faculty */}
        <div className="w-full flex flex-col space-y-5 md:flex-row md:space-y-0">
          <div className="flex flex-col flex-1 text-left">
            <h2 className="text-2xl text-slate-700 font-semibold">
              Rate the <span className="text-indigo-500">faculty</span>
            </h2>
            <p className="max-w-md pt-2 text-base text-slate-700 font-normal leading-5">
              How did you find the faculty? Did it provide adequate support and
              information??
            </p>
          </div>
          <div className="flex flex-1 md:justify-end">
            <div className="text-3xl text-gray-300 space-x-0.5">
              <ReactStars
                count={5}
                onChange={(rating) =>
                  dispatch({ type: "FACULTY_RATING", payload: rating })
                }
                size={28}
                isHalf={true}
                activeColor="#ffd700"
                value={facultyRating}
              />
            </div>
          </div>
        </div>

        {/* rating facilities */}
        <div className="w-full flex flex-col space-y-5 md:flex-row md:space-y-0">
          <div className="flex flex-col flex-1 text-left">
            <h2 className="text-2xl text-slate-700 font-semibold">
              Rate the <span className="text-indigo-500">facilities</span>
            </h2>
            <p className="max-w-md pt-2 text-base text-slate-700 font-normal leading-5">
              Did the facilities within the school meet your expectation?
            </p>
          </div>
          <div className="flex flex-1 md:justify-end">
            <div className="text-3xl text-gray-300 space-x-0.5">
              <ReactStars
                count={5}
                onChange={(rating) =>
                  dispatch({ type: "FACILITY_RATING", payload: rating })
                }
                size={28}
                isHalf={true}
                activeColor="#ffd700"
                value={facilityRating}
              />
            </div>
          </div>
        </div>

        {/* rating recommendations */}
        <div className="w-full flex flex-col space-y-5 md:flex-row md:space-y-0">
          <div className="flex flex-col flex-1 text-left">
            <h2 className="text-2xl text-slate-700 font-semibold">
              Rate the <span className="text-indigo-500">recommendations</span>
            </h2>
            <p className="max-w-md pt-2 text-base text-slate-700 font-normal leading-5">
              Taking everything into consideration, are you able to recommend
              this institution to anyone?
            </p>
          </div>
          <div className="flex flex-1 md:justify-end">
            <div className="text-3xl text-gray-300 space-x-0.5">
              <ReactStars
                count={5}
                onChange={(rating) =>
                  dispatch({ type: "RECOMMENDATION_RATING", payload: rating })
                }
                size={28}
                isHalf={true}
                activeColor="#ffd700"
                value={recommendationRating}
              />
            </div>
          </div>
        </div>
      </div>
      <p
        ref={show}
        className="text-2xl text-center mt-10 mb-10 font-normal hidden"
      >
        Your Overall Rating :{" "}
        <b className="tracking-widest text-xl text-slate-700 font-bold">
          <span className="text-indigo-500">{overallRating}</span>/5
          <span className="text-yellow-400">★</span>
        </b>
      </p>

      <AddCourse
        isShowing={isShowing}
        toggleModal={toggleModal}
        nickname={nickname}
      />
    </>
  );
}

export default Step1;
