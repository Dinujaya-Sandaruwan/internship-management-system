import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideMenu from "../components/InternSideMenu";

const InternLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="dashboard">
      {/* SideMenu with access to location */}
      <SideMenu />

      {/* Main content will be rendered through Outlet */}
      <Outlet />
    </div>
  );
};

export default InternLayout;
