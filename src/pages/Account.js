import React from "react";
import { Card } from "../components";
import { useNavigate } from "react-router-dom";

const Account = () => {
  // const [isShowing, setIsShowing] = useState(false);

  // handle sign out
  // const handleSignOut = () => {
  //   console.log("clicked");

  //   // clear from local storage
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("id");
  //   localStorage.removeItem("uniID");
  //   localStorage.removeItem("courseId");
  //   localStorage.removeItem("expirationTime");
  //   localStorage.removeItem("currentUniversity");
  // };

  return (
    <>
      <div className="h-100">
        <div className="mb-10">
          <h1 className="text-3xl font-medium">My Account</h1>
          <p className="text-lg pt-2">darteyw@gmail.com</p>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <Card className="bg-white p-5 shadow-xs border mx-auto rounded-2xl h-60 transition-all duration-500 hover:cursor-pointer hover:shadow-md">
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
                    <button
                      className=" py-2 px-8 rounded font-medium 
        text-white  bg-indigo-400 duration-500 transition-all hover:bg-indigo-500"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="bg-white p-5 shadow-xs border mx-auto rounded-2xl h-60 transition-all duration-500 hover:cursor-pointer hover:shadow-md">
              <div className="grid grid-rows-2 items-center gap-8">
                <div className="">
                  <h2 className="text-2xl font-light mb-5">Delete Account</h2>
                  <p className="text-slate-500">
                    This action cannot be undone. To delete your reviews
                    instead, go to My Reviews in the dashboard.
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <div></div>
                  <div className="flex items-center gap-2">
                    <button
                      className=" py-2 px-8 rounded font-medium 
      text-white bg-red-400  duration-500 transition-all hover:bg-red-500"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* modal */}
      {/* <Modal isShowing={isShowing}>
        <div class="fixed z-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
          <h3 class="p-4 bg-white text-center sm:text-left text-xl sm:text-2xl leading-6 font-medium ">
            Are you sure you want to delete this review?
          </h3>
          <div class="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-400 text-base font-medium text-white transition-all duration-500 hover:bg-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => deleteReview(review)}
            >
              Confirm
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 
              transition-all duration-500 hover:bg-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={showModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default Account;
