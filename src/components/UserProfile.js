import React from "react";
import { VscTriangleUp } from "react-icons/vsc";
import { Link } from "react-router-dom";

// triangle component
export const Triangle = () => {
  return (
    <VscTriangleUp className="text-5xl text-slate-100 absolute right-2 -top-8 " />
  );
};

const UserProfile = ({ show }) => {
  console.log(show);
  return (
    show && (
      <aside className=" bg-white w-72 relative right-1 top-28 z-10 p-5 rounded-lg shadow-light">
        <Triangle />
        <div>
          <h3>
            <span>Email :</span> test@gmail.com
          </h3>
          <h4 className="font-bold my-3 uppercase">Logout</h4>
          <Link
            to="dashboard/my-reviews"
            className="bg-indigo-500 w-full text-white text-sm h-10 px-3 flex justify-center items-center rounded-lg font-bold uppercase transition-all duration-500 hover:bg-indigo-700"
          >
            Dashboard
          </Link>
        </div>
      </aside>
    )
  );
};

export default UserProfile;
