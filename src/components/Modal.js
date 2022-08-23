import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "../features";

// backdrop component
const BackDrop = () => {
  return <div className="fixed inset-0 z-40 bg-black opacity-60" />;
};

const Modal = ({ children }) => {
  const isShowing = useSelector((state) => state.modal.isShowing);
  const dispatch = useDispatch();

  return (
    isShowing && (
      <>
        <div className="px-10 py-5 bg-white fixed inset-0 max-h-fit w-4/12 m-auto  shadow-md z-50 rounded-lg ">
          <XIcon
            className="w-6 absolute top-2 right-2 cursor-pointer"
            onClick={() => dispatch(showModal())}
          />
          {children}
        </div>
        {/* set modal backdrop */}
        <BackDrop />
      </>
    )
  );
};

export default Modal;
