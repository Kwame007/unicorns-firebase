import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components";
import {
  Home,
  Contact,
  Reviews,
  WriteReview,
  WriteUniReview,
  WriteCourseReview,
} from "../pages";

const Routing = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/reviews">
            <Route index element={<Reviews />} />
            <Route path="write-review" element={<WriteReview />} />
            <Route path="write-course-review" element={<WriteCourseReview />} />
            <Route path="write-uni-review" element={<WriteUniReview />} />
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
};

export default Routing;
