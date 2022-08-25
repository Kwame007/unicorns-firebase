import React from "react";

// backdrop component
const BackDrop = () => {
  return <div className="fixed inset-0 z-40 bg-black opacity-30" />;
};

const Modal = ({ children, isShowing }) => {
  // const { isShowing, toggleModal } = useContext(context);
  console.log(isShowing);

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
