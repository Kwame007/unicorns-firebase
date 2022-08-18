import React from "react";
import img from "../assets/images/review-form.png";

const ReviewGuide = () => {
  return (
    <section className="container mx-auto p-5 bg-gradient text-gray-800 mt-20 mb-10 grid grid-cols-1 md:grid-cols-2 md:gap-10 md:p-8">
      <div className="relative">
        <span className="hidden absolute inset-0 top-20 md:block">
          <svg
            width="818"
            height="286"
            viewBox="0 0 818 286"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="a21"
          >
            <circle
              cx="409"
              cy="409"
              r="408.5"
              stroke="url(#paint0_linear_0:1)"
            ></circle>
            <circle
              cx="409"
              cy="409"
              r="349.5"
              stroke="url(#paint1_linear_0:1)"
            ></circle>
            <defs>
              <linearGradient
                id="paint0_linear_0:1"
                x1="-34.5"
                y1="291.5"
                x2="851"
                y2="291.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0.35"></stop>
                <stop
                  offset="0.218415"
                  stop-color="white"
                  stop-opacity="0"
                ></stop>
                <stop
                  offset="0.728079"
                  stop-color="white"
                  stop-opacity="0"
                ></stop>
                <stop offset="1" stop-color="white" stop-opacity="0.35"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_0:1"
                x1="29.4768"
                y1="308.45"
                x2="787.24"
                y2="308.45"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0.35"></stop>
                <stop
                  offset="0.218415"
                  stop-color="white"
                  stop-opacity="0"
                ></stop>
                <stop
                  offset="0.777261"
                  stop-color="white"
                  stop-opacity="0"
                ></stop>
                <stop offset="1" stop-color="white" stop-opacity="0.35"></stop>
              </linearGradient>
            </defs>
          </svg>
        </span>
        <h2 className="font-bold mb-10 text-3xl text-left md:mb-20 md:text-4xl ">
          {" "}
          Choosing a university or course with less hassle
        </h2>

        <div className="flex gap-5 mb-5 md:mb-10">
          <div className="text-3xl">🏫</div>
          <div className="text-left">
            <h3 className=" text-xl leading-6 font-medium text-gray-800">
              Read students reviews
            </h3>
            <p className="mt-2 text-base text-gray-700 line-clamp-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              ex quod delectus magnam illum. At tenetur porro architecto quas
              explicabo! Vero aspernatur ipsam id earum soluta at repellendus,
              nemo aperiam.
            </p>
          </div>
        </div>
        <div className="flex gap-5 mb-5 md:mb-10">
          <div className="text-3xl">📚</div>
          <div className="text-left">
            <h3 className=" text-xl leading-6 font-medium text-gray-800">
              Read course reviews
            </h3>
            <p className="mt-2 text-base text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              ex quod delectus magnam illum. At tenetur porro architecto quas
              explicabo! Vero aspernatur ipsam id earum soluta.
            </p>
          </div>
        </div>
        <div className="flex gap-5 mb-5 ">
          <div className="text-3xl">📝</div>
          <div className="text-left">
            <h3 className=" text-xl leading-6 font-medium text-gray-900">
              Write reviews anonymously
            </h3>
            <p className="mt-2 text-base  text-gray-700 ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              ex quod delectus magnam illum. At tenetur porro architecto quas
              explicabo! Vero aspernatur ipsam id earum soluta at repellendus.
            </p>
          </div>
        </div>
      </div>
      <div>
        <img src={img} alt="" className="rounded-2xl" />
      </div>
    </section>
  );
};

export default ReviewGuide;
