import React from "react";
import { Outlet } from "react-router-dom";
import HODSideMenu from "../components/HODSideMenu";

const HODLayout: React.FC = () => {
  return (
    <div className="dashboard hod-dashboard">
      {/* SideMenu with access to location */}
      <HODSideMenu />

      {/* Main content will be rendered through Outlet */}
      <Outlet />
    </div>
  );
};

export default HODLayout;
