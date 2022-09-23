import React, { useState } from "react";
import Modal from "./Modal";
import { XIcon, CheckCircleIcon } from "@heroicons/react/solid";
import Input from "./Input";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase";

const AddCourse = ({ isShowing, toggleModal, name, nickname }) => {
  const db = getFirestore(app);
  const [course, setCourse] = useState("");
  const [courseIsExisting, setCourseIsExisting] = useState(false);
  const [courseIsNew, setCourseIsNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const courseId = course.split(" ").join("-").toLocaleLowerCase();
  console.log(courseId);

  // handle change
  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  // add course
  const addCourse = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // document reference
      const docRef = doc(db, "universities", nickname, "programmes", courseId);
      const docSnap = await getDoc(docRef);

      // check if course already exists (for the selected university)
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCourseIsExisting(true);
        setCourseIsNew(false);
      } else {
        // Add a new document in collection "cities"
        await setDoc(
          doc(db, "universities", nickname, "programmes", courseId),
          {
            course,
            totalReviews: 0,
            overallRating: 0,
          }
        );
        console.log("test");
        console.log("No such document!");
        console.log("new user");

        setCourseIsNew(true);
      }

      setLoading(false);

      // store course id in local storage
      localStorage.setItem("courseId", courseId);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(course);
  return (
    <Modal isShowing={isShowing}>
      <div className="px-10 py-5 bg-white fixed inset-0 max-h-fit w-4/12 m-auto  shadow-md z-50 rounded-lg ">
        <XIcon
          className="w-6 absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            setCourseIsExisting(false);
            setCourseIsNew(false);
            toggleModal();
          }}
        />
        {!loading && !courseIsExisting && !courseIsNew && (
          <form onSubmit={addCourse}>
            <div className="w-full mx-auto">
              <div className="mb-5">
                <h1 className="text-3xl font-semibold mb-3 leading-5">
                  Add a course
                </h1>
                <p className="text-sm text-slate-500">
                  Be the first to add a particular course and write a review.
                </p>
              </div>
            </div>

            <div className=" mb-5">
              <div className="mb-0">
                <label htmlFor="text">
                  <Input
                    className="border-2 w-full h-12 px-2 rounded-lg focus:border-3 focus:border-indigo-500 focus:outline-none"
                    placeholder="Enter your course (eg. Bsc Computer Science )"
                    type="text"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <button
              className="flex items-center gap-3 px-10 mt-3 rounded-lg text-white bg-indigo-400 h-12 transition-all duration-500 hover:bg-indigo-500"
              type="submit"
            >
              Add
            </button>
          </form>
        )}

        {loading && (
          <div className="h-36 mt-20 text-center">
            <div class="progress"></div>

            <p className="font-semibold text-lg text-indigo-500">
              Adding Programme
            </p>
          </div>
        )}

        {courseIsNew && !loading && (
          <p className="font-semibold text-lg text-indigo-500">
            Programme added successfully
          </p>
        )}
        {courseIsExisting && !loading && (
          <p className="font-semibold text-lg text-indigo-500">
            Programme already exists
          </p>
        )}

        {/* <div className="h-36 mt-20 text-center">
        //   <CheckCircleIcon className="w-10 text-indigo-500 mx-auto" />
        //   <p className={`font-semibold text-lg ${"text-indigo-500"}`}>Done</p>
        //   <button className="w-36 mx-auto px-10 mt-3 rounded-lg text-white bg-indigo-400 h-12 transition-all duration-500 hover:bg-indigo-500">
        //     Close
        //   </button>
        // </div> */}
      </div>
    </Modal>
  );
};

export default AddCourse;
