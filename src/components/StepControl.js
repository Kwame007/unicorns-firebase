import React from "react";

const StepControl = ({
  handleStepChange,
  currentStep,
  steps,
  createReview,
}) => {
  return (
    <div className=" mt-4 mb-8 flex gap-3 justify-around md:gap-10">
      <button
        onClick={() => handleStepChange()}
        disabled={currentStep === 1}
        className={`w-1/2  rounded-md bg-slate-400 font-medium text-xl text-white py-2 uppercase cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white   md:px-5 md:py-2 md:font-semibold${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Back
      </button>

      {currentStep === steps.length ? (
        <button
          className="w-1/2  rounded-md bg-indigo-400 font-medium text-xl text-white py-2 uppercase cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200  transition duration-200 ease-in-out hover:bg-indigo-500 hover:text-white md:px-5 md:py-2 md:font-semibold"
          onClick={createReview}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={() => handleStepChange("next")}
          className="w-1/2  rounded-md bg-indigo-400 font-medium text-xl text-white py-2 uppercase cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200  transition duration-200 ease-in-out hover:bg-indigo-500 hover:text-white md:px-5 md:py-2 md:font-semibold"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default StepControl;
