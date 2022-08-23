import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Hero,
  RecentReviews,
  ReviewGuide,
  TrendingUniversities,
} from "../components";
import { signInUser } from "../features";

// calculate remaining time
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

// retrieve token & expiration time  from local storage
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  // calculate remaining time again when token is retrieved from local storage
  const remainingTime = calculateRemainingTime(storedExpirationTime);

  // clear token & expiration time if remaining time is less than 1minute
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    console.log("removing token");

    return null;
  }

  return {
    token: storedToken,
    remainingTime,
  };
};

const Home = () => {
  const tokenData = retrieveStoredToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInUser(!!token));
  }, []);

  console.log(token);
  // console.log(initialToken);

  return (
    <>
      <Hero />
      <TrendingUniversities />
      <ReviewGuide />
      <RecentReviews />
    </>
  );
};

export default Home;
