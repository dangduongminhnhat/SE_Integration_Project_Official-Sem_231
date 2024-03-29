import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex">
        <Outlet/>
      </div>
    </div>
  );
}
