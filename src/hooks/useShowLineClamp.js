import React, { useState, useEffect } from "react";

const useShowLineClamp = (config) => {
  const [showMore, setShowMore] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  useEffect(() => {
    // check if text is more than max text ? then show line clamp
    const isTextTooLong = (text, max) =>
      text?.length > max ? setShowMoreBtn(true) : "";

    isTextTooLong(config.par, config.maxNum);
  }, [config.maxNum, config.par]);
  return { showMore, showMoreBtn, setShowMore };
};

export default useShowLineClamp;
