// import React, { useCallback, useState } from "react";

// const StepIndicator = () => {
//   const i = 1;
//   const [curr, setCurr] = useState(1);
//   const [isActive, setIsActive] = useState(false);

//   // function renderStep(step) {
//   //   switch (step) {
//   //     case 1:
//   //       return <Step1 />;
//   //     case 2:
//   //       return <Step2 />;
//   //     case 3:
//   //       return <Step3 />;
//   //     case 4:
//   //       return <Step4 />;
//   //   }
//   // }

//   function prevStep() {
//     if (curr != 1) setCurr(curr - 1);
//   }

//   function nextStep() {
//     setCurr(curr + 1);
//   }

//   function submitReview() {}

//   return (
//     <div>
//       {/*
//             step 1: Star rating of course, faculty, facilities, recommendation.
//             step 2: Comments. Pros, Cons, Suggestions, Review Summary
//             step 3: Alumni year. Your year of graduation or completion
//             step 4: Review all provided/submitted info
//             */}
//       <ul className="flex justify-center max-w-4xl mx-auto text-2xl space-x-9">
//         <li className="text-black font-medium bg-white w-9 h-9 border-2 border-black rounded-full">
//           <button> 1 </button>
//         </li>
//         <li
//           className={`text-black font-medium bg-white w-9 h-9 border-2 border-black rounded-full`}
//         >
//           <button> 2 </button>
//         </li>
//         <li
//           className={`text-black font-medium bg-white w-9 h-9 border-2 border-black rounded-full`}
//         >
//           <button> 3 </button>
//         </li>
//         <li
//           className={`text-black font-medium bg-white w-9 h-9 border-2 border-black rounded-full`}
//         >
//           <button> 4 </button>
//         </li>
//       </ul>

//       {/* <div className="w-full max-h-min mb-10">{renderStep(curr)}</div> */}
//     </div>
//   );
// };

// export default StepIndicator;

import React, { useState, useEffect, useRef } from "react";

const StepIndicator = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    console.log(newSteps);
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) => {
      console.log(step);
      return Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      );
    });

    stepsRef.current = stepsState;

    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [currentStep, steps]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-indigo-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3  ${
              step.selected
                ? "bg-indigo-500 text-white font-bold border border-indigo-500 "
                : ""
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl">
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
                    d="M3 13.5l6.75 6.75L21 4.5"
                  />
                </svg>
              </span>
            ) : (
              index + 1
            )}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? "border-indigo-500" : "border-gray-300 "
          }  `}
        ></div>
      </div>
    );
  });

  return (
    <div className="w-3/4 mx-auto p-4 flex justify-between items-center">
      {stepsDisplay}
    </div>
  );
};
export default StepIndicator;
