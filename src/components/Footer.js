import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // current date
  const date = new Date();

  return (
    <div className="w-full h-fit py-20 text-center bg-indigo-500 text-white flex flex-col justify-center relative">
      {/* <p className="font-black">Unicorns</p>{" "} */}
      <div className="mb-5">
        <h1 className="text-3xl font-black">Unicorns 🏫 </h1>
        <p className="text-sm font-light">Rate Universities and Courses</p>
      </div>
      <div className="mb-5 md:flex md:gap-5 md:text-center md:mx-auto">
        <p>
          <Link to="/about">About Us</Link>
        </p>
        <p>
          <Link to="/help">Help</Link>
        </p>
        <p>
          <Link to="/">Terms & Conditions</Link>
        </p>
        <p>
          <Link to="/">Privacy Policy</Link>
        </p>
      </div>
      <small className="font-bold">
        {/* get current year */}
        All Rights Reserved &copy; {date.getFullYear()}
      </small>{" "}
      <div className="absolute top-5 right-5">
        <svg
          width="61"
          height="77"
          viewBox="0 0 61 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <circle
              cx="45.0001"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 45.0001 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 16.0001 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 59.0001 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 30.6668 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 1.66683 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 45.0001 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 16.0001 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 59.0001 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 30.6668 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 1.66683 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 45.0001 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 45.0001 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 16.0001 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 16.0001 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 59.0001 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 59.0001 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 30.6668 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 30.6668 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 1.66683 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 1.66683 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 45.0001 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 16.0001 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 59.0001 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 30.6668 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 1.66683 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 45.0001 60.3332)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 16.0001 60.3332)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 59.0001 60.3332)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 30.6668 60.3332)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 1.66683 60.3332)"
              fill="white"
            ></circle>
          </g>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0">
        <svg
          width="61"
          height="77"
          viewBox="0 0 61 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <circle
              cx="45.0001"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 45.0001 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 16.0001 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 59.0001 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 30.6668 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="1.66667"
              r="1.66667"
              transform="rotate(90 1.66683 1.66667)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 45.0001 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 16.0001 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 59.0001 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 30.6668 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="16.3332"
              r="1.66667"
              transform="rotate(90 1.66683 16.3332)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 45.0001 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 45.0001 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 16.0001 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 16.0001 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 59.0001 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 59.0001 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 30.6668 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 30.6668 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="31.0002"
              r="1.66667"
              transform="rotate(90 1.66683 31.0002)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="74.6667"
              r="1.66667"
              transform="rotate(90 1.66683 74.6667)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 45.0001 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 16.0001 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 59.0001 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 30.6668 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="45.6667"
              r="1.66667"
              transform="rotate(90 1.66683 45.6667)"
              fill="white"
            ></circle>
            <circle
              cx="45.0001"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 45.0001 60.3332)"
              fill="white"
            ></circle>
            <circle
              cx="16.0001"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 16.0001 60.3332)"
              fill="white"
            ></circle>
            <circle
              cx="59.0001"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 59.0001 60.3332)"
              fill="white"
            ></circle>
            <circle
              cx="30.6668"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 30.6668 60.3332)"
              fill="white"
            ></circle>
            <circle
              cx="1.66683"
              cy="60.3332"
              r="1.66667"
              transform="rotate(90 1.66683 60.3332)"
              fill="white"
            ></circle>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Footer;
