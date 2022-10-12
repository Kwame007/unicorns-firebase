// test
const selector = () => {
  return (
    <div className="space-y-3">
      {["Freshman", "Sophomore", "Junior", "Senior", "Graduate"].map(
        (data, index) => (
          <label
            htmlFor="title"
            className="flex items-center text-base"
            key={index}
          >
            <input
              type="checkbox"
              name=""
              id=""
              className="h-6 w-6 mr-4 cursor-pointer"
            />
            {data}
          </label>
        )
      )}
    </div>
  );
};

const Step2 = ({ dispatch, year, date }) => {
  const handleInputChange = (event) => {
    dispatch({ type: "SET_YEAR", payload: event.target.value });
  };
  const handleYearChange = (event) => {
    dispatch({ type: "SET_GRAD_YEAR", payload: event.target.value });
  };
  return (
    <>
      <div className="max-w-4xl my-12 mx-auto">
        <form className="flex flex-col px-6">
          <div className="flex h-52 my-6">
            <h2 className="w-4/5 text-left text-2xl text-black font-semibold">
              What <span className="text-indigo-500">year </span>
              are you?
            </h2>
            <div className="w-2/5">
              <div className="space-y-3">
                {[
                  "Level 100",
                  "Level 200",
                  "Level 300",
                  "Level 400",
                  "Graduate",
                ].map((data, index) => (
                  <label
                    htmlFor="title"
                    className="flex items-center text-base"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="h-6 w-6 mr-4 cursor-pointer"
                      value={data}
                      checked={data === year}
                      onChange={handleInputChange}
                    />
                    {data}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex h-52 my-6">
            <h2 className="w-4/5 text-left text-2xl text-black font-semibold">
              What year do you{" "}
              <span className="text-indigo-500">graduate? </span>
            </h2>
            <div className="w-2/5">
              <div>
                <label htmlFor="">
                  <input
                    type="number"
                    placeholder="Enter year"
                    name=""
                    id=""
                    value={date}
                    onChange={handleYearChange}
                    className="border w-full h-14 px-2 rounded-lg"
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Step2;
