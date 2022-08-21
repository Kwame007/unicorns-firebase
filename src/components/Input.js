import React from "react";

const Input = ({ className, placeholder, type, onChange ,value}) => {
  return (
    <>
      <div>
        <input
          type={type || "text"}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
};

export default Input;
