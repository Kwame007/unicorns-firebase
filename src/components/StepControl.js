import React from "react";

const StepControl = ({ handleStepChange, currentStep, steps, test,reviewSummary }) => {
  return (
    <div className=" mt-4 mb-8 flex gap-10 justify-around">
      <button
        onClick={() => handleStepChange()}
        disabled={currentStep === 1}
        className={`w-1/2 px-5 py-2 rounded-lg bg-slate-400 font-semibold text-xl text-white uppercase cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Back
      </button>

      {currentStep === steps.length ? (
        <button
          className="w-1/2 px-5 py-2 rounded-lg bg-indigo-400 font-semibold text-xl text-white uppercase cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200  transition duration-200 ease-in-out hover:bg-indigo-500 hover:text-white"
          onClick={test}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={() => handleStepChange("next")}
          className="w-1/2 px-5 py-2 rounded-lg bg-indigo-400 font-semibold text-xl text-white uppercase cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200  transition duration-200 ease-in-out hover:bg-indigo-500 hover:text-white"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default StepControl;
