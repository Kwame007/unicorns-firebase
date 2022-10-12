import React, { useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";
import {
  AddUniversity,
  Card,
  Header,
  Input,
  LoadMore,
  Stats,
} from "../../components";
import img from "../../assets/images/campus.jpg";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase";
import { SearchIcon } from "@heroicons/react/outline";
import { context } from "../../store";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useGetCollectionSize } from "../../hooks";

const Reviews = () => {
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastElement, setLastElement] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [sortBy, setSortBy] = useState("");

  // hook
  const collectionSize = useGetCollectionSize(
    query(collection(db, "universities"))
  );

  // sorting function
  const changeSortingHandler = (event) => {
    setSortBy(event.target.value);
  };

  // global state
  const { isShowing, toggleModal, universities, setUniversities } =
    useContext(context);

  // handle change
  const handleChange = (event) => setSearchQuery(event.target.value);

  // update state func
  const updateState = useCallback(
    (query) => {
      getDocs(query).then((doc) => {
        const response = doc.docs.map((doc_1) => doc_1.data());
        // check if query is empty
        if (response.length === 0) {
          setIsEmpty(true);
        }

        setUniversities((prevState) => [...prevState, ...response]);

        // get last document
        const lastVisible = doc.docs[doc.docs.length - 1];

        // set last visible
        setLastElement(lastVisible);
        setLoading(false);
      });
    },

    [setUniversities]
  );

  // load more universities
  const loadMore = () => {
    setLoading(true);

    const nextQuery = query(
      collection(db, "universities"),
      orderBy(
        `${sortBy === "name" ? "name" : "rating"}`,
        `${sortBy === "name" ? "asc" : "desc"}`
      ),
      startAfter(lastElement),
      limit(4)
    );

    updateState(nextQuery);
  };

  // config
  const config = {
    data: universities,
    loadMore,
    isEmpty,
    type: "universities",
    collectionRef: collectionSize,
  };

  useEffect(() => {
    setLoading(true);
    // fetch all universities
    const fetchAllUni = async () => {
      try {
        const q = query(
          collection(db, "universities"),
          orderBy(
            `${sortBy === "name" ? "name" : "rating"}`,
            `${sortBy === "name" ? "asc" : "desc"}`
          ),
          limit(4)
        );

        updateState(q);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };

    // run fetch
    fetchAllUni();

    return () => {
      setUniversities([]);
    };
  }, [setUniversities, sortBy, updateState]);

  useEffect(() => {
    const searchUniversity = (uniQuery) => {
      if (uniQuery) {
        const test = universities?.filter((uni) => {
          const name = uni?.name.toLowerCase();
          const slug = uni?.nickname.toLowerCase();

          return (
            name.includes(uniQuery.toLowerCase()) ||
            slug.includes(uniQuery.toLowerCase())
          );
        });

        console.log(test);
        setSearchResults(test);
      }
      if (!uniQuery) {
        setSearchResults(universities);
      }
    };

    // run search
    searchUniversity(searchQuery);
  }, [searchQuery, universities, setUniversities]);

  return (
    <>
      <Header title="All university reviews" image={img} />
      <div className="max-w-5xl mx-auto p-5 text-gray-800 my-10">
        <div className="flex flex-col gap-5 mb-20 md:justify-between md:flex-row">
          <h2 className="text-2xl font-semibold">
            Browse universities in Ghana
          </h2>
          <div>
            <label htmlFor="sort" className="font-medium text-gray-700 text-sm">
              Sort by
            </label>
            <select
              name="sort"
              id="sort"
              className="border h-10 rounded-lg ml-3 font-medium text-gray-700 text-sm focus:outline-none focus:border-indigo-500"
              onChange={changeSortingHandler}
            >
              <option value="all">All</option>
              <option value="name">Names</option>
              {/* <option value="reviews">Number of reviews</option> */}
            </select>
          </div>
        </div>

        <div className="w-full text-center  mb-20 md:w-1/2 md:mx-auto">
          <label htmlFor="" className="w-full relative">
            <SearchIcon className="h-5 w-5 absolute text-slate-500 top-4 ml-2 md:h-6 md:w-6" />
            <Input
              type="text"
              className="border  pl-10 pr-5 w-full h-12 rounded-2xl md:h-14 placeholder:text-sm focus:border-3 focus:border-indigo-500 focus:outline-none"
              placeholder="Search for your university 🏫"
              onChange={handleChange}
            />
          </label>
          <p className="mt-3 text-base font-medium text-slate-500">
            Can't find your university or college?{" "}
            <span
              className="text-indigo-500 cursor-pointer"
              onClick={toggleModal}
            >
              Add it here
            </span>{" "}
          </p>
        </div>

        {searchResults?.map((data) => (
          <Link to={`${data.nickname}`}>
            <Card className="bg-white border shadow-md rounded-xl mb-10  h-fit hover:cursor-pointer">
              <div className="flex items-center gap-5 text-slate-600">
                <div className="w-60 h-36 ">
                  <img
                    src={data?.imageUrl}
                    alt=""
                    className="w-full h-full rounded-tl-lg rounded-bl-lg"
                  />
                </div>
                <div className="w-full grid grid-rows-2 items-center gap-11">
                  <h3 className="text-base font-medium">{data.name}</h3>
                  <Stats
                    rating={data.rating}
                    totalReviews={data.totalReviews}
                  />
                </div>
              </div>
            </Card>
          </Link>
        ))}

        {/* load more reviews  */}
        {!loading && <LoadMore {...config} />}
        {loading && searchResults.length === 0 && (
          <div className="h-60 w-60 text-center mx-auto">
            <div class="progress"></div>

            <p className="font-bold text-lg text-indigo-500">
              Loading universities
            </p>
          </div>
        )}

        {searchResults.length === 0 && !loading && (
          <di>
            <h2 className="text-2xl text-slate-600 font-medium h-96  flex items-center justify-center">
              No University reviews yet
            </h2>
          </di>
        )}
      </div>

      {/* portal */}
      {createPortal(
        <AddUniversity isShowing={isShowing} toggleModal={toggleModal} />,
        document.getElementById("uni-modal")
      )}
    </>
  );
};

export default Reviews;
