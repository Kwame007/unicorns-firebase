import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
 
  return (
    <div>
      <Navigation />
      <Outlet />
      {/* {createPortal(
        <SignIn isShowing={isShowing} toggleModal={toggleModal} />,
        document.getElementById("root-modal")
      )} */}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
