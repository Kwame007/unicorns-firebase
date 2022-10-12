import { useEffect, useState } from "react";

const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);

  // function to set browser inner width
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // listen for resize event
    window.addEventListener("resize", handleWindowSizeChange);

    // clean up function
    return () => {
      // remove event listener
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // if width equals or less the 768px its mobile screen{returns boolean}
  return width <= 768;
};

export default useCheckMobileScreen;
