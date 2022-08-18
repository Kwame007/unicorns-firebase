import React, { useState } from "react";
import { LogIn, SignUp } from "../components";

const Authentication = () => {
  const [showForm, setShowForm] = useState(true);

  const changeForm = (event) => {
    event.preventDefault();

    console.log("click");

    setShowForm((prevState) => !prevState);
  };

  return (
    <section className=" mx-5 mt-20 mb-10 bg-white shadow-light rounded-lg md:max-w-5xl md:mx-auto">
      {showForm ? (
        <LogIn showForm={showForm} changeForm={changeForm} />
      ) : (
        <SignUp showForm={showForm} changeForm={changeForm} />
      )}
    </section>
  );
};

export default Authentication;
