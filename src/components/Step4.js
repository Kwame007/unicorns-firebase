import React from "react";

const Step4 = ({
  recommendationRating,
  overallRating,
  facilityRating,
  facultyRating,
  courseRating,
  courseSummary,
  universitySummary,
  date,
  year,
  university,
  programme,
}) => {
  return (
    <>
      <div className="max-w-4xl my-12 mx-auto px-6">
        <h2 className="w-full text-left text-2xl text-semibold font-bold mb-10">
          You are about to submit your review entry for the{" "}
          <span className="text-indigo-500">{programme}</span> &{" "}
          <span className="text-indigo-500">{university} </span>{" "}
        </h2>

        <div className=" bg-slate-100 p-5 mt-4 rounded-2xl">
          <div className="flex">
            <div className="w-4/5 space-y-2">
              <p className="text-left font-semibold text-2xl">Ratings</p>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <p className="text-left text-lg">Course rating - &nbsp; </p>
                <span className="text-left pl-0 w-1/2 font-semibold text-2xl sm:pl-2">
                  {" "}
                  {courseRating}/5
                  <span className="text-yellow-400">★</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <p className="text-left text-lg">Faculty rating - &nbsp; </p>
                <span className="text-left pl-0 w-1/2 font-semibold text-2xl sm:pl-2">
                  {" "}
                  {facultyRating}/5
                  <span className="text-yellow-400">★</span>{" "}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <p className="text-left text-lg">Facilities rating - &nbsp; </p>
                <span className="text-left pl-0 w-1/2 sm:pl-2 font-semibold text-2xl">
                  {" "}
                  {facilityRating}/5
                  <span className="text-yellow-400">★</span>{" "}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <p className="text-left text-lg">
                  Recommendation rating - &nbsp;{" "}
                </p>
                <span className="text-left pl-0 w-1/2 sm:pl-2 font-semibold text-2xl">
                  {" "}
                  {recommendationRating}/5
                  <span className="text-yellow-400">★</span>{" "}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <p className="text-left text-lg font-medium">
                  Overall rating - &nbsp;{" "}
                </p>
                <span className="tracking-widest text-2xl text-semibold font-bold">
                  {" "}
                  <span className="text-indigo-500">{overallRating}</span>
                  /5<span className="text-yellow-400">★</span>
                </span>
              </div>
            </div>
            <div className="w-2/5 mt-6 ml-0 space-y-2 ">
              <div className="flex flex-col">
                <p className="text-left text-lg">Graduation year :</p>{" "}
                <span className="p-1 rounded-xl mt-3 w-fit max-h-min bg-indigo-300 text-white font-semibold">
                  {date}
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-left text-lg">Level :</p>{" "}
                <span className="p-1 rounded-xl mt-3 w-fit max-h-min bg-indigo-300 text-white font-semibold">
                  {year}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-slate-100 py-5 px-10 mt-4 rounded-2xl">
          <div className="mt-2">
            <p className="text-left font-semibold text-2xl">
              Course Review summary
            </p>
            <div className="py-4 space-y-2">
              <p className="text-left text-base text-slate-500">
                {courseSummary}
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-slate-100 py-5 px-10 mt-4 rounded-2xl">
          <div className="mt-2">
            <p className="text-left font-semibold text-2xl">
              University Review summary
            </p>
            <div className="py-4 space-y-2">
              <p className="text-left text-base text-slate-500">
                {universitySummary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step4;
