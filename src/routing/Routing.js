import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { context } from "../store/store";
import { Layout } from "../components";
import {
  Home,
  Contact,
  Reviews,
  WriteReview,
  UserReviews,
  Account,
  Dashboard,
  Review,
} from "../pages";

const Routing = () => {
  const { isLoggedIn } = useContext(context);

  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reviews/:ID" element={<Review />} />

          {isLoggedIn && (
            <>
              <Route
                path="reviews/:ID/write-review"
                element={<WriteReview />}
              />{" "}
            </>
          )}

          {isLoggedIn && (
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="my-reviews" element={<UserReviews />} />
              <Route path="account" element={<Account />} />
            </Route>
          )}

          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default Routing;
