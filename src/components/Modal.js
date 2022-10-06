import React from "react";

// backdrop component
const BackDrop = () => {
  return <div className="fixed inset-0 z-40 bg-black opacity-50" />;
};

const Modal = ({ children, isShowing }) => {
  return (
    isShowing && (
      <>
        {children}

        {/* set modal backdrop */}
        <BackDrop />
      </>
    )
  );
};

export default Modal;
