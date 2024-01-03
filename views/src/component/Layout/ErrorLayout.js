import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function ErrorLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex">
        <Outlet/>
      </div>
    </div>
  );
}
