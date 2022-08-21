import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "../components";
import {
  Home,
  Contact,
  Reviews,
  WriteReview,
  WriteUniReview,
  WriteCourseReview,
  Authentication,
} from "../pages";

const Routing = () => {
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/reviews">
            <Route index element={<Reviews />} />
            {isLoggedIn && (
              <Route path="write-review" element={<WriteReview />} />
            )}
            <Route path="write-course-review" element={<WriteCourseReview />} />
            <Route path="write-uni-review" element={<WriteUniReview />} />
          </Route>
          <Route path="auth" element={<Authentication />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default Routing;
