import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative h-24 w-full py-4 px-4 flex flex-row justify-between items-center">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-black text-gray-800 md:text-3xl">
          Unicorns 🏫{" "}
        </h1>
        <p className="text-xs font-light md:text-sm">
          Rate Universities and Courses
        </p>
      </div>
      <nav className="px-8 hidden sm:flex items-center text-lg font-mono absolute inset-y-0 right-0 ">
        <ul className="flex flex-row gap-x-8">
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
      </nav>
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
