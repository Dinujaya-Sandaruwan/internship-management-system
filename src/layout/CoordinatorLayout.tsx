import React from "react";
import { Outlet } from "react-router-dom";
import CoordinatorSideMenu from "../components/CoordinatorSideMenu";

const CoordinatorLayout: React.FC = () => {
  return (
    <div className="dashboard coordinator-dashboard">
      {/* SideMenu with access to location */}
      <CoordinatorSideMenu />

      {/* Main content will be rendered through Outlet */}
      <Outlet />
    </div>
  );
};

export default CoordinatorLayout;
