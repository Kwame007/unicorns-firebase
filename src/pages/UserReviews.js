import React from "react";
import { Card } from "../components";
import { StarIcon } from "@heroicons/react/solid";
const UserReviews = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-medium">My Reviews (0)</h1>
        <p className="text-lg pt-2">darteyw@gmail.com</p>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <Card className="bg-white p-5 shadow-light mx-auto rounded-2xl h-60 hover:cursor-pointer">
            <div className="grid grid-rows-2 items-center gap-20">
              <div className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10 text-indigo-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                  />
                </svg>

                <h2 className="text-2xl font-light">University of Ghana</h2>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-md ">Total reviews</p>
                  <span className="text-3xl font-semibold">100</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 text-indigo-400" />
                  <span>4.5</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card className="bg-white p-5 shadow-light mx-auto rounded-2xl h-60 hover:cursor-pointer">
            <div className="grid grid-rows-2 items-center gap-20">
              <div className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10 text-indigo-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                <h2 className="text-2xl font-light">Bsc. Computer Science</h2>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-md ">Total reviews</p>
                  <span className="text-3xl font-semibold">5</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 text-indigo-400" />
                  <span>4.0</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
