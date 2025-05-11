import React from "react";
import { Outlet } from "react-router-dom";
import SupervisorSideMenu from "../components/SupervisorSideMenu";

const SupervisorLayout: React.FC = () => {
  return (
    <div className="dashboard supervisor-dashboard">
      {/* SideMenu with access to location */}
      <SupervisorSideMenu />

      {/* Main content will be rendered through Outlet */}
      <Outlet />
    </div>
  );
};

export default SupervisorLayout;
