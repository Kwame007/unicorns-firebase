import React from "react";

const Input = ({ className, placeholder, type, onChange }) => {
  return (
    <>
      <div>
        <input
          type={type || "text"}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Input;
