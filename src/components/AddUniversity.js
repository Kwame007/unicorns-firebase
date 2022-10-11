import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { CheckCircleIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";
import ProgressBar from "./ProgressBar";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const AddUniversity = ({ isShowing, toggleModal }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [selectedUni, setSelectedUni] = useState("");
  const [university, setUniversity] = useState("");
  const [uniID, setUniID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  // all universities (external api)
  const { universities: allUniversities } = JSON.parse(
    localStorage.getItem("universities")
  );

  // handle select
  const handleSelect = (event) => {
    setSelectedUni(event.target.value);
  };

  // accepted image types
  const types = ["image/png", "image/gif", "image/jpeg"];

  // handle file change
  const handleChange = (event) => {
    // selected image
    let selected = event.target.files[0];

    // check if selected file type included in [accepted types arrays]
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(false);
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  useEffect(() => {
    const university = allUniversities.find(
      (data) => data.name === selectedUni
    );

    setUniversity(university);
    setUniID(university?.nickname);
  }, [selectedUni, allUniversities.length]);

  // handle submit
  const addUniversity = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();

      const db = getFirestore(app);

      // document reference
      const docRef = doc(db, "universities", uniID);
      const docSnap = await getDoc(docRef);

      // check university exists or not
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        console.log("document already exists");
      } else {
        // Add a new document in collection "universities"
        await setDoc(doc(db, "universities", uniID), {
          ...university,
          imageUrl,
          rating: 0,
          totalReviews: 0,
          createdAt: serverTimestamp(),
        });

        setImageUrl(null);
        setLoading(false);
        setCompleted(true);

        // redirect to review page
        navigate(`${uniID}`, { replace: true });
      }
    } catch (error) {
      setLoading(false);
      setImageUrl(null);

      console.log(error);
    }
  };

  return (
    <Modal isShowing={isShowing}>
      <div className="p-3 bg-white fixed inset-0 h-fit mx-auto mt-10 w-4/5  shadow-md z-50 rounded-lg md:w-4/12 md:max-h-fit md:m-auto  md:p-10">
        <XIcon
          className="w-6 absolute top-2 right-2 cursor-pointer"
          onClick={toggleModal}
        />

        {!loading && !completed && (
          <form onSubmit={addUniversity} className="mt-5">
            <div className="w-full mx-auto">
              <div className="mb-5">
                <h1 className="text-xl font-semibold mb-3 leading-5 md:text-3xl">
                  Add university or college
                </h1>
                <p className="text-xs text-slate-500 md:text-sm">
                  Be the first to add a particular university or college and
                  write a review.
                </p>
              </div>
            </div>

            <div>
              <div className="mb-5">
                <div className="">
                  <select
                    className="w-full text-base font-semibold text-slate-700  border  h-12 rounded-lg focus:outline-none focus:border-indigo-500 "
                    onChange={handleSelect}
                  >
                    <option value="" className="text-sm">
                      Select University
                    </option>
                    {allUniversities?.map((data) => (
                      <option key={data.name} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <h2 className="text-base font-medium md:text-lg">
                  Upload photo
                </h2>
                <p className="text-xs text-slate-500 md:text-sm">
                  Add a picture of your university
                </p>
                <div className="flex justify-between">
                  <div>
                    {imageUrl && (
                      <div className="relative mt-3">
                        <XCircleIcon
                          className="w-6 absolute -top-2 -right-1 cursor-pointer hover:text-red-400 hover:transition-all hover:duration-500"
                          onClick={() => {
                            setImageUrl(null);
                            setFile(null);
                          }}
                        />
                        <img
                          src={imageUrl}
                          alt="university"
                          className="w-40 h-28 rounded-lg "
                        />
                      </div>
                    )}
                  </div>
                  {file && (
                    <ProgressBar
                      file={file}
                      setFile={setFile}
                      setImageUrl={setImageUrl}
                    />
                  )}
                  {error && (
                    <p className="text-sm font-medium text-red-300">{error}</p>
                  )}
                </div>

                <div class="relative pb-0.5">
                  <div class="flex items-center justify-center w-full">
                    <label
                      class="w-full rounded-lg mt-5 border border-slate-300 hover:text-primary cursor-pointer text-center md:py-12"
                      for="upload"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8 mx-auto mt-4 md:mt-0"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>

                      <p class="mt-4 font-medium text-sm">
                        Click to browse files
                      </p>
                      <input
                        id="upload"
                        type="file"
                        multiple=""
                        accept="image/x-png,image/gif,image/jpeg"
                        class="opacity-0"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div class="absolute bottom-2- right-0 text-red-500 font-medium text-xs md:text-sm"></div>
                </div>
              </div>

              <button className="flex items-center justify-center gap-3 w-full mt-3 rounded-md text-white bg-indigo-400 h-12 transition-all duration-500 hover:bg-indigo-500 md:px-10">
                Submit
              </button>
            </div>
          </form>
        )}

        {loading && (
          <div className="h-36 mt-20 text-center">
            <div class="progress"></div>

            <p className={`font-semibold text-lg ${"text-indigo-500"}`}>
              Adding University
            </p>
          </div>
        )}
        {!loading && completed && (
          <div className="h-36 mt-20 text-center">
            <CheckCircleIcon className="w-10 text-indigo-500 mx-auto" />
            <p className={`font-semibold text-lg ${"text-indigo-500"}`}>Done</p>
            <button className="w-36 mx-auto px-10 mt-3 rounded-lg text-white bg-indigo-400 h-12 transition-all duration-500 hover:bg-indigo-500">
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddUniversity;
