import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import { Card, Header } from "../../components";
import img from "../../assets/images/asu.jpg";

const Reviews = () => {
  return (
    <>
      <Header title="All universities & courses" image={img} />
      <div className="max-w-5xl mx-auto p-5 text-gray-800 my-10">
        <div className="flex justify-between mb-28 ">
          <h2 className="text-2xl font-semibold">
            Browse 300 universities & courses reviews
          </h2>
          <div>
            <label htmlFor="sort">Sort by</label>
            <select
              name="sort"
              id="sort"
              className="border-2 border-slate-400 h-10 rounded-lg ml-3 focus:outline-none focus:border-indigo-500"
            >
              <option value="Name">All</option>
              <option value="Name">Universities</option>
              <option value="Name">Courses</option>
              <option value="Name">Number of reviews</option>
              <option value="Name">Highest rating</option>
            </select>
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((data) => (
          <Card className="bg-white shadow-light mb-10  rounded-2xl h-fit hover:cursor-pointer">
            <div className="flex items-center gap-5 text-slate-600">
              <div className="w-3/12">
                <img src={img} alt="" className="w-full h-full rounded-lg" />
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
    </>
  );
};

export default Reviews;
