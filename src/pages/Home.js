import React from "react";
import {
  Hero,
  RecentReviews,
  ReviewGuide,
  TrendingUniversities,
} from "../components";

const Home = () => {
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
