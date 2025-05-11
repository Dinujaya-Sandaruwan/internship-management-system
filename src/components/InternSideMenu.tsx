import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

const SideMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the active menu item from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const activeMenu =
    queryParams.get("menu") || getDefaultActiveMenu(location.pathname);

  // Function to determine default active menu based on the path
  function getDefaultActiveMenu(path: string) {
    if (path.includes("/dashboard")) return "home";
    if (path.includes("/messages")) return "messages";
    if (path.includes("/notifications")) return "notifications";
    if (path.includes("/goals")) return "goals";
    if (path.includes("/evaluation")) return "evaluation";
    if (path.includes("/progress")) return "progress";
    if (path.includes("/update-data")) return "updateData";
    if (path.includes("/supervisor-requests")) return "supervisors";
    return "home";
  }

  // Function to handle menu item clicks
  const handleMenuClick = (menu: string, path: string) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(location.search);
    // Set the menu parameter
    params.set("menu", menu);
    // Navigate to the same path but with updated query parameters
    navigate(`${path}?${params.toString()}`);
  };

  return (
    <div className="dashboard__sidebar">
      <div className="dashboard__sidebar-header">
        <div className="dashboard__logo">
          {/* <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick("home", "/intern/dashboard");
            }}
          >
           
          </a> */}
          <img
            src="https://cmb.ac.lk/wp-content/uploads/logo-color.png"
            alt="UoC Logo"
          />
          <span>UoC IMS</span>
        </div>
      </div>

      <div className="dashboard__menu">
        <div
          className={`dashboard__menu-item ${
            activeMenu === "home" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("home", "/intern/dashboard")}
        >
          <FaHome className="dashboard__menu-icon" />
          <span>Home</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "messages" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("messages", "/intern/messages")}
        >
          <FaEnvelope className="dashboard__menu-icon" />
          <span>Messages</span>
          <div className="dashboard__badge">3</div>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "notifications" ? "active" : ""
          }`}
          onClick={() =>
            handleMenuClick("notifications", "/intern/notifications")
          }
        >
          <FaBell className="dashboard__menu-icon" />
          <span>Notifications</span>
          <div className="dashboard__badge">5</div>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "goals" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("goals", "/intern/goals")}
        >
          <FaTasks className="dashboard__menu-icon" />
          <span>Goals</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "evaluation" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("evaluation", "/intern/evaluation")}
        >
          <FaClipboardCheck className="dashboard__menu-icon" />
          <span>Evaluation</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "progress" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("progress", "/intern/progress")}
        >
          <FaChartLine className="dashboard__menu-icon" />
          <span>Progress</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "updateData" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("updateData", "/intern/update-data")}
        >
          <FaUserEdit className="dashboard__menu-icon" />
          <span>Update Data</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "supervisors" ? "active" : ""
          }`}
          onClick={() =>
            handleMenuClick("supervisors", "/intern/supervisor-requests")
          }
        >
          <FaUserTie className="dashboard__menu-icon" />
          <span>Supervisor Requests</span>
        </div>
      </div>

      <div className="dashboard__menu-footer">
        <div className="dashboard__menu-item" onClick={() => navigate("/")}>
          <FaSignOutAlt className="dashboard__menu-icon" />
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
