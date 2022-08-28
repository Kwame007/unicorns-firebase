import React from "react";

const Card = ({ children, className }) => {
  return <article className={className}>{children}</article>;
};

export default Card;
