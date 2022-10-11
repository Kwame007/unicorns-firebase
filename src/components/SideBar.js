import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="bg-slate-100 text-white shadow-sm border h-full top-0 bottom-0 font-semibold p-5 text-primary md:p-10">
      <div>
        <div className=" mb-10 rounded-lg  cursor-pointer">
          <Link
            to="my-reviews"
            className="py-2 px-8 rounded font-medium 
            text-white   duration-500 transition-all  pl-5 flex justify-start items-center  bg-indigo-400 h-12 w-full  hover:bg-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-7 h-7 mr-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            My reviews
          </Link>
        </div>
        <div className=" rounded-lg  cursor-pointer ">
          <Link
            to="account"
            className="py-2 px-8 rounded font-medium 
            text-white   duration-500 transition-all  pl-5 flex justify-start items-center  bg-indigo-400 h-12 w-full  hover:bg-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-7 h-7 mr-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Account
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
