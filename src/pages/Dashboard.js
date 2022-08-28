import React from "react";
import { SideBar } from "../components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="flex ">
      <section className="w-4/12">
        <SideBar />
      </section>
      <section className="py-10 px-40 w-full">
        <Outlet />
      </section>
    </main>
  );
};

export default Dashboard;
