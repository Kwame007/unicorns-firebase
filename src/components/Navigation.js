import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { context } from "../store";
import { SignIn } from ".";

const Navigation = () => {
  const { isLoggedIn } = useContext(context);
  const [open, setOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  // toggle modal
  const showModal = () => {
    console.log("click");
    setIsShowing((prevState) => !prevState);
  };

  return (
    <>
      <header className="relative h-24 w-full py-4 px-4 flex flex-row justify-between items-center shadow-sm">
        <div className="flex flex-col items-start">
          <Link to="/">
            <h1 className="text-2xl font-black text-gray-800 md:text-3xl">
              Unicorns 🏫{" "}
            </h1>
            <p className="text-indigo-500 font-semibold text-xs md:text-sm">
              Rate Universities and Courses
            </p>
          </Link>
        </div>
        <nav className="px-8 hidden sm:flex items-center text-lg font-medium absolute inset-y-0 right-0 ">
          <ul className="flex flex-row items-center gap-x-8">
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>

            {!isLoggedIn ? (
              <li className="bg-indigo-400 text-white text-sm h-10 px-3  flex items-center rounded-lg font-bold uppercase transition-all duration-500 hover:bg-indigo-500">
                <p onClick={showModal} className="hover:cursor-pointer">
                  Sign In
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-7 h-7 inline-block ml-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </p>
              </li>
            ) : (
              <Link
                to="dashboard/my-reviews"
                className="bg-indigo-400 text-white text-sm h-10 px-3  flex items-center rounded-lg font-bold uppercase transition-all duration-500 hover:cursor-pointer hover:bg-indigo-500"
              >
                Dashboard
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 ml-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </Link>
            )}
          </ul>
        </nav>

        <nav className="px-8 sm:hidden font-mono absolute right-0 inset-y-auto  ">
          {!open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10"
              onClick={() => setOpen(false)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </nav>
        {open && (
          <ul className="sm:hidden flex flex-col items-start w-full absolute top-24 left-0 bg-white z-30 px-4 py-4 font-medium text-lg gap-y-3">
            <li className="h-14">
              <Link to="/reviews">Reviews</Link>
            </li>

            <li className="w-full">
              <Link
                to="dashboard/my-reviews"
                className="bg-indigo-400 text-white text-sm h-14 px-3  flex items-center justify-center rounded-lg font-bold uppercase transition-all duration-500 hover:cursor-pointer hover:bg-indigo-500"
              >
                Dashboard
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 ml-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        )}
      </header>
      {createPortal(
        <SignIn isShowing={isShowing} showModal={showModal} />,
        document.getElementById("root-modal")
      )}
    </>
  );
};

export default Navigation;
