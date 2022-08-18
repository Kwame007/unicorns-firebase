import React from "react";

const Card = ({ children }) => {
  return (
    <article className="bg-white shadow-light w-4/5 mx-auto rounded-2xl hover:cursor-pointer">
      {children}
    </article>
  );
};

export default Card;
