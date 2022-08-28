import React from "react";
import { Card, Header } from "../../components";
// import { StarIcon } from "@heroicons/react/solid";
import { StarIcon, UploadIcon, PencilIcon } from "@heroicons/react/outline";
// import PencilSquareIcon from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { FaEdit, FaUpload } from "react-icons/fa";

const Review = () => {
  return (
    <>
      <Header title="University of Ghana" />
      <div className=" mx-10 p-5 text-gray-800 my-10">
        <div className="flex justify-between mb-28 ">
          <div>
            <div className=" flex gap-3 mb-5">
              <ArrowLeftIcon className="w-6 " />{" "}
              <Link to="reviews">All reviews</Link>
            </div>
            <div className=" flex gap-3">
              <span>2.0</span>
              <span className=" flex">
                <StarIcon className="w-5" />
                <StarIcon className="w-5" />
                <StarIcon className="w-5" />
                <StarIcon className="w-5" />
                <StarIcon className="w-5" />
              </span>
              <span>2 reviews</span>
            </div>
          </div>
          <div className=" flex gap-5">
            <Link
              to="/"
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
            </Link>
            <button className="border-2 h-12 cursor-pointer px-8 rounded-lg transition-all duration-500 hover:bg-slate-100">
              Add photos
              <UploadIcon className="w-6 inline-block ml-3" />
            </button>
          </div>
        </div>
        <div className="flex gap-20">
          <div className="w-6/12"></div>
          <div className="w-full">
            <div className="flex justify-between mb-10 ">
              <h2 className="text-lg font-semibold">All reviews (3)</h2>
              <div>
                <label htmlFor="sort">Filter by</label>
                <select
                  name="sort"
                  id="sort"
                  className="border-2 border-slate-400 h-10 rounded-lg ml-3 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Name">Recent</option>
                  <option value="Name">Most likes</option>
                </select>
              </div>
            </div>
            {[1, 2, 3].map((data) => (
              <Card className="bg-white shadow-light mb-10  rounded-2xl h-fit hover:cursor-pointer">
                <div className="flex items-center gap-5 text-slate-600">
                  <div className="w-3/12">
                    {/* <img src={img} alt="" className="w-full h-full rounded-lg" /> */}
                  </div>
                  <div className="w-full grid grid-rows-2 items-center gap-5">
                    <h3 className="text-lg font-medium">University of Ghana</h3>
                    <div>
                      <StarIcon className="w-6" />
                      <p className="text-sm">5 reviews</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
