import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Input from "./Input";

const Hero = () => {
  return (
    <main className="max-w-full bg-hero-pattern bg-cover bg-center bg-no-repeat h-96 flex justify-center items-center ">
      <div className="px-2 text-white text-center">
        <h1 className="text-4xl leading-7 pb-3 font-bold md:text-5xl md:leading-10">
          Rate universities & courses in ghana
        </h1>
        <h2 className="font-medium leading-5 mb-5 text-gray-100 md:mb-8">
          Your no.1 website for all ghanaian universities and courses reviews...{" "}
        </h2>
        <section className="text-gray-700">
          <div className="w-4/5 mx-auto">
            <label htmlFor="" className="w-full relative">
              <SearchIcon className="h-5 w-5 absolute top-4 ml-2 md:h-6 md:w-6" />
              <Input
                type="text"
                className="pl-10 pr-5 w-full h-12 rounded-2xl md:h-14 placeholder:text-sm focus:border-3 focus:border-indigo-500 focus:outline-none"
                placeholder="Seach for your uni 🏫 or course 📚..."
              />
            </label>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Hero;
