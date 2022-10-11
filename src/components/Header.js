import React from "react";

const Header = ({ title, image }) => {
  return (
    <main
      className="max-w-full  h-60 flex justify-between items-end md:h-96"
      style={{
        backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.70)), url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" text-white text-left ml-2 mb-5 md:px-2 md:mb-10 md:text-center">
        <h1 className="text-3xl leading-7 pb-3 font-bold md:text-5xl md:leading-10">
          {title}
        </h1>
      </div>
      <div></div>
    </main>
  );
};

export default Header;
