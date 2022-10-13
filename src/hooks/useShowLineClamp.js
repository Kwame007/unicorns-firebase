import { useState, useEffect } from "react";

const useShowLineClamp = (config) => {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // check if text is more than max text ? then show line clamp
    const isTextTooLong = (text, max) =>
      text?.length > max ? setShowMore(true) : setShowMore(false);

    // return if text is too long when the text is greater then max text length
    isTextTooLong(config.paragraph, config.maxNum);
  }, [config.maxNum, config.paragraph]);
  return { showMore, setShowMore };
};

export default useShowLineClamp;
