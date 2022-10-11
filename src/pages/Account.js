import React, { useState } from "react";
import { Card } from "../components";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components";
import { useRef } from "react";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const Account = () => {
  const [isShowing, setIsShowing] = useState(false);

  const navigate = useNavigate();

  // current ref
  const confirm = useRef(false);
  const isDelete = useRef(false);

  // current user
  const userID = localStorage.getItem("id");

  // handle sign out
  const handleSignOut = () => {
    // set confirm to true
    confirm.current = true;

    if (confirm.current) {
      // clear local storage {including auth token}
      localStorage.clear();

      // hide modal
      setIsShowing(false);

      // redirect to homepage
      navigate("/", { replace: true });

      // reload page
      window.location.reload();
    }
    // set confirm to default
    confirm.current = false;
  };

  // handle sign out
  const handleDeleteUserAccount = async () => {
    //  find user in user collection
    await deleteDoc(doc(db, "users", userID));

    // clear local storage {including auth token}
    localStorage.clear();

    // hide modal
    setIsShowing(false);

    // redirect to homepage
    navigate("/", { replace: true });

    // reload page
    window.location.reload();
  };

  // cancel
  const cancelAction = () => {
    // hide modal
    setIsShowing(false);

    // proceed with action
    confirm.current = false;

    // set is delete back to false
    isDelete.current = false;
  };

  return (
    <>
      <div className="">
        <div className="mb-10">
          <h1 className="text-3xl font-medium">My Account</h1>
          <p className="text-lg pt-2">darteyw@gmail.com</p>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <Card className="bg-white p-5 shadow-xs border mx-auto rounded-2xl h-fit transition-all duration-500 hover:cursor-pointer hover:shadow-md md:h-60">
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
                      onClick={() => {
                        setIsShowing(true);

                        // set delete to false
                        isDelete.current = false;
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="bg-white p-5 shadow-xs border mx-auto rounded-2xl h-fit transition-all duration-500 hover:cursor-pointer hover:shadow-md md:h-60">
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
                      value="delete"
                      onClick={() => {
                        setIsShowing(true);

                        // set delete to true
                        isDelete.current = true;
                      }}
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
      <Modal isShowing={isShowing}>
        <div
          class={`fixed top-20 md:top-60 ${
            isDelete.current && "md:left-80"
          } z-50 rounded-lg text-left overflow-hidden w-11/12 mx-auto shadow-xl transform transition-all sm:my-8 ${
            isDelete.current ? "sm:max-w-4xl" : "sm:max-w-lg"
          } sm:w-full`}
        >
          <div className="p-4 bg-white">
            <h3 class="  sm:text-left text-xl sm:text-2xl leading-6 font-medium ">
              {!isDelete.current
                ? "Are you sure you want to sign out?"
                : "Are you sure you want to delete?"}
            </h3>

            {/* show if is delete action */}
            {isDelete.current && (
              <p className="mt-3 text-gray-500 text-xs md:text-base">
                This action will permanently remove your account from the
                system. Your anonymous reviews will not be deleted. If you want
                to delete your reviews, you can do that manually in the
                dashboard.
              </p>
            )}
          </div>
          <div class="bg-gray-100 flex gap-10 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 mt-3 bg-indigo-400 text-base font-medium text-white transition-all duration-500 hover:bg-indigo-500 sm:ml-3 sm:w-auto sm:text-sm md:mt-0"
              onClick={
                // if isDelete is truthy return signOut func else return deleteAcc func
                !isDelete.current ? handleSignOut : handleDeleteUserAccount
              }
            >
              Confirm
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 
              transition-all duration-500 hover:bg-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={cancelAction}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Account;
