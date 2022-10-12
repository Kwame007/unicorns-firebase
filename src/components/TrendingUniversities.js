import React from "react";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import TrendingUniversitiesPlaceHolder from "./TrendingUniversitiesPlaceHolder";
import { LoadMore } from ".";
import { useGetCollectionSize } from "../hooks";
import { db } from "../firebase";
import { query, collection } from "firebase/firestore";

const TrendingUniversities = ({ data, loadMore, isEmpty }) => {
  // hook
  const collectionSize = useGetCollectionSize(
    query(collection(db, "universities"))
  );

  // config
  const config = {
    data,
    loadMore,
    isEmpty,
    type: "universities",
    collectionRef: collectionSize,
  };
  return (
    <section className="container mx-auto mt-20 mb-10 py-10 relative">
      <h2 className="font-semibold  container mx-auto p-5 text-2xl text-gray-600 uppercase  leading-normal md:mb-20 md:text-4xl md:text-center ">
        Best universities based on student reviews
      </h2>

      <div class="overflow-x-auto ">
        <div class="min-w-screen h-100 bg-gray-100 flex items-start justify-center  font-sans  overflow-scroll">
          <div class="w-full lg:w-5/6">
            <div class="bg-white shadow-md rounded md:my-6">
              <table class="min-w-max w-full table-auto">
                <thead>
                  <tr class="bg-gray-200 flex justify-between text-gray-600 uppercase text-sm leading-normal ">
                    <th class="py-3 px-6 text-left  md:w-4/12">Universities</th>
                    <th class="py-3 px-6 text-left hidden md:w-4/12 md:block">
                      Location
                    </th>
                    <th class="py-3 px-6 text-center hidden md:w-2/12 md:block">
                      Rating
                    </th>
                    <th class="py-3 px-6 text-center  md:w-2/12">Reviews</th>
                  </tr>
                </thead>
                <tbody class="text-gray-600  text-lg font-light">
                  {data?.map((universities, index) => (
                    <>
                      <tr
                        class="border-b w-97 border-gray-200 flex  hover:bg-gray-100 md:w-full"
                        key={index}
                      >
                        <Link
                          to={`reviews/${universities.nickname}`}
                          className=" hover:text-indigo-500 hover:underline  w-8/12 md:w-4/12"
                        >
                          <td class="py-6 px-6 text-left whitespace-pre-line ">
                            <div class="flex items-center">
                              <span class="font-medium">
                                {universities.name}
                              </span>
                            </div>
                          </td>
                        </Link>
                        <td class="py-6 px-6 text-left hidden md:w-4/12 md:block">
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
                        <td class="py-6 px-6 text-center hidden md:w-2/12 md:block">
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
                        <td class="py-6 px-6 text-center w-4/12 md:w-2/12">
                          <span class="bg-indigo-200 text-indigo-600 py-1 px-3 rounded-full text-xs">
                            {universities.totalReviews} reviews
                          </span>
                        </td>
                      </tr>
                    </>
                  ))}

                  {/* show placeholder */}
                  {data.length === 0 &&
                    // create an array with N number of elements
                    Array.from(Array(10).keys()).map((_, index) => (
                      <TrendingUniversitiesPlaceHolder key={index} />
                    ))}
                </tbody>
              </table>
            </div>

            {/* load more  */}
            <LoadMore {...config} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingUniversities;
