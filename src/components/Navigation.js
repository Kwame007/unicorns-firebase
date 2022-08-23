import { UserCircleIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import { showModal } from "../features";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  const dispatch = useDispatch();
  console.log(isLoggedIn);
  return (
    <header className="relative h-24 w-full py-4 px-4 flex flex-row justify-between items-center">
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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {!isLoggedIn ? (
            <li className="bg-indigo-500 text-white text-sm h-10 px-3  flex items-center rounded-lg font-bold uppercase transition-all duration-500 hover:bg-indigo-700">
              <p
                onClick={() => dispatch(showModal())}
                className="hover:cursor-pointer"
              >
                Sign In
                <UserCircleIcon className="w-8 ml-2 inline-block" />
              </p>
            </li>
          ) : (
            <div>
              <UserCircleIcon
                className="w-10 inline-block text-indigo-500 "
                onClick={() => setShow((prev) => !prev)}
              />
            </div>
          )}
        </ul>
      </nav>
      <UserProfile show={show} />
      <nav className="px-8 sm:hidden text-lg font-mono absolute right-0 inset-y-0 ">
        {/* <button
          className="flex text-5xl font-black h-24 items-center"
          onClick={() => setOpen(!open)}
        >
          {!open ? (
            <MenuAlt3Icon className="h-8 w-8 text-black" />
          ) : (
            <XIcon className="h-8 w-8 text-black" />
          )}
        </button> */}
      </nav>
      {open && (
        <ul className="sm:hidden flex flex-col items-start w-full absolute top-24 left-0 bg-white z-30 px-4 py-4 font-medium text-lg gap-y-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navigation;
