import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Card from "./Card";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import Input from "./Input";
import CourseReviews from "./CourseReviews";

const CoursesList = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCourseClicked, setIsCourseClicked] = useState(false);

  // url parameter
  const { ID } = useParams();

  // courseID ref
  const courseIdRef = useRef("");

  // config
  const config = {
    ID,
    courseID: courseIdRef.current,
  };

  // handle input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // get course id
  const getCourseID = (course) => {
    courseIdRef.current = course.id;
    setIsCourseClicked(true);
    console.log(courseIdRef);
  };

  useEffect(() => {
    // get all courses for a university
    const getCourses = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(
          collection(db, "universities", ID, "programmes")
        );
        let title = [];

        querySnapshot.forEach((doc) => {
          title.push({ title: doc.data().course, id: doc.id });

          setCourses(title);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getCourses();
    return () => {
      setCourses([]);
    };
  }, [ID]);

  return (
    <>
      {/* show search input component*/}
      {!isCourseClicked && (
        <div>
          <div className="w-2/4 mb-10">
            <label htmlFor="" className="w-full relative">
              {/* search icon */}
              <SearchIcon className="h-5 w-5 absolute top-4 ml-2 md:h-6 md:w-6" />
              <Input
                type="text"
                className="pl-10 pr-5 w-full h-10 rounded-xl border-2 md:h-12 placeholder:text-sm focus:border-3 focus:border-indigo-500 focus:outline-none "
                placeholder="Search for your course 📚..."
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
      )}

      {/* show back btn */}
      {isCourseClicked && (
        <div className="mb-5">
          <p
            onClick={() => {
              // set search query back to an empty string
              setSearchQuery("");

              setIsCourseClicked(false);
            }}
            className="text-sm font-medium capitalize text-indigo-500 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeftIcon className="w-6" /> back
          </p>
        </div>
      )}

      {/* show course component */}
      {!isCourseClicked && (
        <div className="grid grid-cols-2 gap-5 h-fit mb-36 md:grid-cols-4">
          {courses
            // return all courses that matches the search query
            .filter((item) => item.title.toLowerCase().includes(searchQuery))
            .map((course) => (
              <div
                onClick={() => {
                  // pass the currently clicked course data
                  getCourseID(course);
                }}
              >
                <Card className=" bg-white shadow-md rounded-xl h-32 p-5 hover:cursor-pointer">
                  <section className="flex justify-center items-center h-full">
                    <p className="text-base font-medium"> {course.title}</p>
                  </section>
                </Card>
              </div>
            ))}
        </div>
      )}

      {/* show course reviews component */}
      {isCourseClicked && <CourseReviews {...config} />}
    </>
  );
};

export default CoursesList;
