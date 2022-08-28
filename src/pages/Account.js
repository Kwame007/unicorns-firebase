import React from "react";
import { Card } from "../components";

const Account = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-medium">My Account</h1>
        <p className="text-lg pt-2">darteyw@gmail.com</p>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <Card className="bg-white p-5 shadow-light mx-auto rounded-2xl h-60 hover:cursor-pointer">
            <div className="grid grid-rows-2 items-center gap-8">
              <div className="">
                <h2 className="text-2xl font-light mb-5">Sign Out</h2>
                <p className="text-slate-500">
                  To sign back in to this account, you'll be emailed a sign in
                  link again.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div></div>
                <div className="flex items-center gap-2">
                  <button className=" text-white font-bold bg-indigo-400 py-2 px-8 rounded-lg duration-500 transition-all hover:bg-indigo-500">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card className="bg-white p-5 shadow-light mx-auto rounded-2xl h-60 hover:cursor-pointer">
            <div className="grid grid-rows-2 items-center gap-8">
              <div className="">
                <h2 className="text-2xl font-light mb-5">Delete Account</h2>
                <p className="text-slate-500">
                  This action cannot be undone. To delete your reviews instead,
                  go to My Reviews in the dashboard.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div></div>
                <div className="flex items-center gap-2">
                  <button className=" text-white font-bold bg-red-400 py-2 px-6 rounded-lg duration-500 transition-all hover:bg-red-500">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;