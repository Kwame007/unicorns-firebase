import React, { useRef } from "react";

const Step3 = ({ dispatch, courseSummary, universitySummary }) => {
  const courseRef = useRef();
  const uniRef = useRef();

  // handle change
  const handleChange = (ref, type) => {
    dispatch({ type, payload: ref.current.value });
  };

  console.log(courseSummary);
  return (
    <>
      <div className="max-w-4xl my-12 mx-auto">
        <h1 className="text-left px-6 mt-10 text-3xl font-bold mx-auto max-w-4xl">
          {" "}
          Add your reviews
        </h1>
        <form className="flex flex-col px-6">
          <div className="w-full my-10">
            <h2 className="text-left text-2xl text-slate-800 font-semibold">
              Write your <span className="text-indigo-500">Course</span>{" "}
              comments
            </h2>
            <p className="pt-2 text-base text-slate-600 font-normal leading-6">
              Write your overall course experience while you were enrolled in
              this university. The summary should include positive experiences
              as well as negatives you had while taking this course. Short,
              concise and helpful information.
            </p>
            <textarea
              className="w-full h-40 mt-10 p-5 border-2 rounded-lg text-xl  focus:outline-indigo-500 focus:border-0 focus:ring-2 placeholder:font-semibold placeholder:text-slate-500 placeholder:text-base"
              type="text"
              placeholder="Please provide your review summary here..."
              ref={courseRef}
              value={courseSummary}
              onChange={() => handleChange(courseRef, "SET_COURSE_SUMMARY")}
            />
          </div>

          <div className="w-full my-6">
            <h2 className="text-left text-2xl text-slate-800 font-semibold">
              Write your <span className="text-indigo-500">University</span>{" "}
              comments
            </h2>
            <p className=" pt-2 text-base text-slate-600 font-normal leading-6">
              Write your total university experience while you were enrolled in
              this university. Should include positive experiences as well as
              negatives you had while in this university. Short, concise and
              helpful information.
            </p>
            <textarea
              className="w-full h-40 mt-10 p-5 border-2 rounded-lg text-xl  focus:outline-indigo-500 focus:border-0 focus:ring-2 placeholder:font-semibold placeholder:text-slate-500 placeholder:text-base"
              type="text"
              placeholder="Please provide your review summary here..."
              ref={uniRef}
              value={universitySummary}
              onChange={() => handleChange(uniRef, "SET_UNI_SUMMARY")}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Step3;
