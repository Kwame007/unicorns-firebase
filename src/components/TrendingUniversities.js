import React from "react";
import Card from "./Card";
import img from "../assets/images/asu.jpg";
import img2 from "../assets/images/havard.jpg";
import img3 from "../assets/images/sydney.jpg";
import { LocationMarkerIcon, StarIcon } from "@heroicons/react/solid";

const TrendingUniversities = () => {
  return (
    <section className="max-w-6xl mx-auto mt-20 mb-10 py-10 relative">
      <div className="absolute bottom-0 right-0 -z-10">
        <svg
          width="491"
          height="490"
          viewBox="0 0 491 490"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="356.5"
            cy="356.5"
            r="356.5"
            fill="url(#paint0_linear_6:37)"
          ></circle>
          <defs>
            <linearGradient
              id="paint0_linear_6:37"
              x1="356.5"
              y1="0"
              x2="356.5"
              y2="713"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#4A6CF7"></stop>
              <stop offset="1" stop-color="#1E3BB3"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute -z-10">
        <svg
          width="48"
          height="95"
          viewBox="0 0 48 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="0.5"
            cy="47.5"
            r="47.5"
            fill="url(#paint0_radial_6:121)"
          ></circle>
          <defs>
            <radialGradient
              id="paint0_radial_6:121"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(0.5) rotate(90) scale(95)"
            >
              <stop stop-color="white"></stop>
              <stop offset="0.569" stop-color="#F0F4FD"></stop>
              <stop offset="0.993" stop-color="#D9E0F0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <h2 className="font-bold  container mx-auto p-5 text-3xl text-left md:mb-20 md:text-4xl md:text-center">
        Most Reviewed <br className="md:hidden" />
        Universities 🔥
      </h2>
      <aside className=" grid grid-cols-1 gap-5 md:grid-cols-3 ">
        <Card className="bg-white shadow-light w-4/5 mx-auto rounded-2xl hover:cursor-pointer">
          <div className="p-5">
            <img src={img} alt="" className="w-full h-52 rounded-2xl" />
            <div>
              <h3 className="text-lg font-medium my-5 text-left">
                Arizona State
              </h3>
              <span className=" flex text-sm justify-between items-center">
                <p className="flex justify-center items-center">
                  <LocationMarkerIcon className="h-5 w-5 pr-1" />
                  Arizona, AZ
                </p>
                <p className="flex justify-center items-center">
                  <StarIcon className="h-5 w-5 pr-1" />
                  200 reviews
                </p>
              </span>
            </div>
          </div>
        </Card>
        <Card className="bg-white shadow-light w-4/5 mx-auto rounded-2xl hover:cursor-pointer">
          <div className="p-5">
            <img src={img3} alt="" className="w-full h-52 rounded-2xl" />
            <div>
              <h3 className="text-lg font-medium my-5 text-left">
                Sydney College
              </h3>
              <span className=" flex text-sm justify-between items-center">
                <p className="flex justify-center items-center">
                  <LocationMarkerIcon className="h-5 w-5 pr-1" />
                  Australia, AU
                </p>
                <p className="flex justify-center items-center">
                  <StarIcon className="h-5 w-5 pr-1" />
                  100 reviews
                </p>
              </span>
            </div>
          </div>
        </Card>
        <Card className="bg-white shadow-light w-4/5 mx-auto rounded-2xl hover:cursor-pointer">
          <div className="p-5">
            <img src={img2} alt="" className="w-full h-52 rounded-2xl" />
            <div>
              <h3 className="text-lg font-medium my-5 text-left">
                Havard University
              </h3>
              <span className=" flex text-sm justify-between items-center">
                <p className="flex justify-center items-center">
                  <LocationMarkerIcon className="h-5 w-5 pr-1" />
                  Boston, MA
                </p>
                <p className="flex justify-center items-center">
                  <StarIcon className="h-5 w-5 pr-1" />
                  50 reviews
                </p>
              </span>
            </div>
          </div>
        </Card>
      </aside>
    </section>
  );
};

export default TrendingUniversities;
