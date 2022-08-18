import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <Outlet />
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
