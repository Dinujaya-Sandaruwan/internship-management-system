import React from "react";
import {
  FaBell,
  FaChartLine,
  FaClipboardCheck,
  FaEnvelope,
  FaHome,
  FaSignOutAlt,
  FaTasks,
  FaUserEdit,
  FaUserTie,
} from "react-icons/fa";

interface Props {
  setActiveMenuItem: (item: string) => void;
  activeMenuItem: string;
}

const SideMenu = ({ activeMenuItem, setActiveMenuItem }: Props) => {
  return (
    <>
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar-header">
          <div className="dashboard__logo">
            <img
              src="https://cmb.ac.lk/wp-content/uploads/logo-color.png"
              alt=""
            />
            <span>UoC IMS</span>
          </div>
        </div>

        <div className="dashboard__menu">
          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "home" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("home")}
          >
            <FaHome className="dashboard__menu-icon" />
            <span>Home</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "messages" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("messages")}
          >
            <FaEnvelope className="dashboard__menu-icon" />
            <span>Messages</span>
            <div className="dashboard__badge">3</div>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("notifications")}
          >
            <FaBell className="dashboard__menu-icon" />
            <span>Notifications</span>
            <div className="dashboard__badge">5</div>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "goals" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("goals")}
          >
            <FaTasks className="dashboard__menu-icon" />
            <span>Goals</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "evaluation" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("evaluation")}
          >
            <FaClipboardCheck className="dashboard__menu-icon" />
            <span>Evaluation</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "progress" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("progress")}
          >
            <FaChartLine className="dashboard__menu-icon" />
            <span>Progress</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "updateData" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("updateData")}
          >
            <FaUserEdit className="dashboard__menu-icon" />
            <span>Update Data</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "supervisors" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("supervisors")}
          >
            <FaUserTie className="dashboard__menu-icon" />
            <span>Supervisor Requests</span>
          </div>
        </div>

        <div className="dashboard__menu-footer">
          <div className="dashboard__menu-item">
            <FaSignOutAlt className="dashboard__menu-icon" />
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
