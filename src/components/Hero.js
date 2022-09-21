import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Input from "./Input";

const Hero = ({ results }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // handle input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
              {/* close svg icon   only show when search query is truthy*/}
              {searchQuery && (
                <div
                  className="absolute right-2 top-4 cursor-pointer hover:text-red-500 "
                  onClick={() => setSearchQuery("")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}

              {/* search icon */}
              <SearchIcon className="h-5 w-5 absolute top-4 ml-2 md:h-6 md:w-6" />
              <Input
                type="text"
                className={`pl-10 pr-5 w-full h-12 rounded-2xl md:h-14 placeholder:text-sm focus:border-3 focus:border-indigo-500 focus:outline-none ${
                  searchQuery && "rounded-bl-none"
                } ${searchQuery && "rounded-br-none"} `}
                placeholder="Search for your uni 🏫..."
                onChange={handleInputChange}
                data={results}
                searchQuery={searchQuery}
                value={searchQuery}
              />
            </label>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Hero;
