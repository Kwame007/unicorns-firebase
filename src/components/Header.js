import React from "react";

const Header = ({title,image}) => {
  return (
    <main className="max-w-full bg-campus-pattern bg-cover bg-bottom bg-no-repeat h-96 flex justify-between items-end ">
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
