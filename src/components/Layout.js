import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { createPortal } from "react-dom";
import SignIn from "./SignIn";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <Outlet />
      {createPortal(<SignIn />, document.getElementById("root-modal"))}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
