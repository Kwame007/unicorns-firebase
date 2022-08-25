import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { context } from "../store/store";
import { Layout, SignIn } from "../components";
import {
  Home,
  Contact,
  Reviews,
  WriteReview,
  WriteUniReview,
  WriteCourseReview,
  UserReviews,
} from "../pages";

const Routing = () => {
  const { isLoggedIn } = useContext(context);
  console.log(isLoggedIn);

  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />

          <Route path="/reviews">
            <Route index element={<Reviews />} />
            {isLoggedIn && (
              <>
                <Route path="write-review" element={<WriteReview />} />
                <Route
                  path="write-course-review"
                  element={<WriteCourseReview />}
                />
                <Route path="write-uni-review" element={<WriteUniReview />} />
              </>
            )}
          </Route>
          <Route path="/dashboard">
            {isLoggedIn && (
              <Route path="my-reviews" element={<UserReviews />} />
            )}
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default Routing;
