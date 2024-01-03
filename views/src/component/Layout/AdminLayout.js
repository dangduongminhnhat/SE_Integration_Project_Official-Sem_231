import React from 'react';
import { Outlet } from "react-router-dom";
import AdminHeader from '../AdminHeader';

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader/>
      <div className="flex-grow flex ">
        <Outlet/>
      </div>
    </div>
  );
}