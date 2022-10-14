import React from "react";
import { SideBar } from "../components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="flex flex-col md:flex-row">
      <section className="w-full md:w-4/12">
        <SideBar />
      </section>
      <section className="p-5 w-full h-fit md:mb-5 md:py-10 md:px-40 md:h-100">
        <Outlet />
      </section>
    </main>
  );
};

export default Dashboard;
