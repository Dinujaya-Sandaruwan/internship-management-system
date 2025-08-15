import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaEnvelope,
  FaBell,
  FaUsers,
  FaClipboardCheck,
  FaChartLine,
  FaUserEdit,
  FaFileAlt,
  FaSignOutAlt,
  FaCalendarAlt,
  FaTasks,
} from "react-icons/fa";

interface SupervisorSideMenuProps {
  profileCompletion?: number;
}

const SupervisorSideMenu: React.FC<SupervisorSideMenuProps> = ({
  profileCompletion = 80,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the active menu item from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const activeMenu =
    queryParams.get("menu") || getDefaultActiveMenu(location.pathname);

  // Function to determine default active menu based on the path
  function getDefaultActiveMenu(path: string) {
    if (path.includes("/dashboard")) return "dashboard";
    if (path.includes("/messages")) return "messages";
    if (path.includes("/notifications")) return "notifications";
    if (path.includes("/interns")) return "interns";
    if (path.includes("/evaluations")) return "evaluations";
    if (path.includes("/reports")) return "reports";
    if (path.includes("/goals")) return "goals";
    if (path.includes("/schedule")) return "schedule";
    if (path.includes("/update-profile")) return "updateProfile";
    return "dashboard";
  }

  // Function to handle menu item clicks
  const handleMenuClick = (menu: string, path: string) => {
    // Don't navigate if feature is disabled due to incomplete profile
    if (
      profileCompletion < 80 &&
      menu !== "dashboard" &&
      menu !== "updateProfile"
    ) {
      return;
    }

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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick("dashboard", "/supervisor/dashboard");
            }}
          >
            <img
              src="https://cmb.ac.lk/wp-content/uploads/logo-color.png"
              alt="UoC Logo"
            />
            <span>UoC IMS</span>
          </a>
        </div>
      </div>

      <div className="dashboard__menu">
        <div
          className={`dashboard__menu-item ${
            activeMenu === "dashboard" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("dashboard", "/supervisor/dashboard")}
        >
          <FaHome className="dashboard__menu-icon" />
          <span>Dashboard</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "messages" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() => handleMenuClick("messages", "/supervisor/messages")}
        >
          <FaEnvelope className="dashboard__menu-icon" />
          <span>Messages</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "notifications" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() =>
            handleMenuClick("notifications", "/supervisor/notifications")
          }
        >
          <FaBell className="dashboard__menu-icon" />
          <span>Notifications</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "interns" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() => handleMenuClick("interns", "/supervisor/interns")}
        >
          <FaUsers className="dashboard__menu-icon" />
          <span>My Interns</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "evaluations" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() =>
            handleMenuClick("evaluations", "/supervisor/evaluations")
          }
        >
          <FaClipboardCheck className="dashboard__menu-icon" />
          <span>Evaluations</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "reports" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() => handleMenuClick("reports", "/supervisor/reports")}
        >
          <FaFileAlt className="dashboard__menu-icon" />
          <span>Reports</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "goals" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() => handleMenuClick("goals", "/supervisor/goals")}
        >
          <FaTasks className="dashboard__menu-icon" />
          <span>Goals & Tasks</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "schedule" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() => handleMenuClick("schedule", "/supervisor/schedule")}
        >
          <FaCalendarAlt className="dashboard__menu-icon" />
          <span>Schedule</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "updateProfile" ? "active" : ""
          }`}
          onClick={() =>
            handleMenuClick("updateProfile", "/supervisor/update-profile")
          }
        >
          <FaUserEdit className="dashboard__menu-icon" />
          <span>Update Profile</span>
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

export default SupervisorSideMenu;
