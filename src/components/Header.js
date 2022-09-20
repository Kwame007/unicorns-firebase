import React from "react";

const Header = ({ title, image }) => {
  console.log(image);
  return (
    <main
      className="max-w-full  h-96 flex justify-between items-end "
      style={{
        backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.70)), url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-2 text-white text-center ml-5 mb-10">
        <h1 className="text-3xl leading-7 pb-3 font-bold md:text-5xl md:leading-10">
          {title}
        </h1>
      </div>
      <div></div>
    </main>
  );
};

export default Header;
