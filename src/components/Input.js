import React from "react";
import { Link } from "react-router-dom";

const Input = ({
  className,
  placeholder,
  type,
  onChange,
  value,
  onFocus,
  data,
  searchQuery,
}) => {
  // keys
  const keys = ["name", "nickname"];

  return (
    <>
      <div>
        <input
          type={type || "text"}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
        />
      </div>
      {searchQuery && (
        <div className="h-40 bg-white mt-1 rounded-bl-2xl rounded-br-2xl pb-3 overflow-scroll">
          {/* filter data(universities) based on name or nickname & map through it  */}
          {data
            .filter((item) =>
              keys.some((key) => item[key].toLowerCase().includes(searchQuery))
            )
            .map((university) => (
              <Link
                to={`reviews/${university.nickname}`}
                className="text-left h-14 pl-3 font-semibold text-sm border-b flex items-center transition-all duration-500 hover:text-indigo-500 hover:bg-gray-200"
              >
                {university.name}
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default Input;
