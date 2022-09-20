import React, { useEffect } from "react";
import { useStorage } from "../hooks";

const ProgressBar = ({ file, setFile, setImageUrl }) => {
  const { url, error: uploadError, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      setImageUrl(url);
    }
  }, [setFile, setImageUrl, url]);

  return (
    <div className="h-16 w-1/4 text-center">
      <div class="progress"></div>
      <p
        className={`font-semibold text-lg ${
          progress === 100 ? "text-indigo-500" : "text-slate-500"
        }`}
      >
        {progress}%
      </p>
    </div>
  );
};

export default ProgressBar;
