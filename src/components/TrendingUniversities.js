import React from "react";
import { LocationMarkerIcon, StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import TrendingUniversitiesPlaceHolder from "./TrendingUniversitiesPlaceHolder";

const TrendingUniversities = ({ data, loadMore, isEmpty }) => {
  return (
    <section className="container mx-auto mt-20 mb-10 py-10 relative">
      <h2 className="font-semibold  container mx-auto p-5 text-3xl text-gray-600 uppercase  leading-normal md:mb-20 md:text-4xl md:text-center">
        Best universities based on student reviews
      </h2>

      <div class="overflow-x-auto ">
        <div class="min-w-screen h-100 bg-gray-100 flex items-start justify-center  font-sans  overflow-scroll">
          <div class="w-full lg:w-5/6">
            <div class="bg-white shadow-md rounded my-6">
              <table class="min-w-max w-full table-auto">
                <thead>
                  <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">Universities</th>
                    <th class="py-3 px-6 text-left">Location</th>
                    <th class="py-3 px-6 text-center">Rating</th>
                    <th class="py-3 px-6 text-center">Reviews</th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 text-lg font-light">
                  {data?.map((universities) => (
                    <>
                      <tr class="border-b border-gray-200  hover:bg-gray-100">
                        <Link
                          to={`reviews/${universities.nickname}`}
                          className="w-full hover:text-indigo-500 hover:underline"
                        >
                          <td class="py-6 px-6 text-left whitespace-nowrap">
                            <div class="flex items-center">
                              <span class="font-medium">
                                {universities.name}
                              </span>
                            </div>
                          </td>
                        </Link>
                        <td class="py-6 px-6 text-left">
                          <div class="flex items-center">
                            <p className="flex justify-center items-center">
                              <LocationMarkerIcon className="h-5 w-5 pr-0.5" />
                              {universities.location
                                .split(",")
                                .slice(0, 2)
                                .join(",")}
                            </p>
                          </div>
                        </td>
                        <td class="py-6 px-6 text-center">
                          <div class="flex items-center justify-center">
                            <p className="flex justify-center items-center">
                              <p className="pr-1">
                                {universities.rating.toFixed(1)}
                              </p>
                              <ReactStars
                                count={5}
                                activeColor="#ffd700"
                                size={13}
                                isHalf={true}
                                value={universities.rating}
                                edit={false}
                              />
                            </p>
                          </div>
                        </td>
                        <td class="py-6 px-6 text-center">
                          <span class="bg-indigo-200 text-indigo-600 py-1 px-3 rounded-full text-xs">
                            {universities.totalReviews} reviews
                          </span>
                        </td>
                      </tr>
                    </>
                  ))}
                  {data.length === 0 &&
                    // create an array with N number of elements
                    Array.from(Array(10).keys()).map(() => (
                      <TrendingUniversitiesPlaceHolder />
                    ))}
                </tbody>
              </table>
            </div>

            {!isEmpty && (
              <div className="w-1/4 mb-5">
                <button
                  className="border-2 h-12 cursor-pointer px-8 rounded-lg transition-all duration-500 hover:bg-slate-200"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingUniversities;
