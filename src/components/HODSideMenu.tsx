import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaEnvelope,
  FaBell,
  FaUsers,
  FaUserTie,
  FaCogs,
  FaUserEdit,
  FaSignOutAlt,
} from "react-icons/fa";

interface HODSideMenuProps {
  profileCompletion?: number;
}

const HODSideMenu: React.FC<HODSideMenuProps> = ({
  profileCompletion = 100,
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
    if (path.includes("/intern-info")) return "internInfo";
    if (path.includes("/supervisor-info")) return "supervisorInfo";
    if (path.includes("/manage-coordinators")) return "manageCoordinators";
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
              handleMenuClick("dashboard", "/hod/dashboard");
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
          onClick={() => handleMenuClick("dashboard", "/hod/dashboard")}
        >
          <FaHome className="dashboard__menu-icon" />
          <span>Dashboard</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "messages" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() => handleMenuClick("messages", "/hod/messages")}
        >
          <FaEnvelope className="dashboard__menu-icon" />
          <span>Messages</span>
          {profileCompletion >= 80 && <div className="dashboard__badge">3</div>}
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "notifications" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() =>
            handleMenuClick("notifications", "/hod/notifications")
          }
        >
          <FaBell className="dashboard__menu-icon" />
          <span>Notifications</span>
          {profileCompletion >= 80 && (
            <div className="dashboard__badge">8</div>
          )}
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "internInfo" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() =>
            handleMenuClick("internInfo", "/hod/intern-info")
          }
        >
          <FaUsers className="dashboard__menu-icon" />
          <span>Intern Info</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "supervisorInfo" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() =>
            handleMenuClick("supervisorInfo", "/hod/supervisor-info")
          }
        >
          <FaUserTie className="dashboard__menu-icon" />
          <span>Supervisor Info</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "manageCoordinators" ? "active" : ""
          } ${profileCompletion < 80 ? "disabled" : ""}`}
          onClick={() =>
            handleMenuClick("manageCoordinators", "/hod/manage-coordinators")
          }
        >
          <FaCogs className="dashboard__menu-icon" />
          <span>Manage Coordinators</span>
        </div>

        <div
          className={`dashboard__menu-item ${
            activeMenu === "updateProfile" ? "active" : ""
          }`}
          onClick={() =>
            handleMenuClick("updateProfile", "/hod/update-profile")
          }
        >
          <FaUserEdit className="dashboard__menu-icon" />
          <span>Update Profile</span>
        </div>
      </div>

      {profileCompletion < 80 && (
        <div className="dashboard__profile-warning">
          <div className="warning-content">
            <p className="warning-title">Complete Your Profile</p>
            <p className="warning-text">
              {profileCompletion}% complete. Complete your profile to access all
              features.
            </p>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <button
              className="complete-profile-btn"
              onClick={() =>
                handleMenuClick("updateProfile", "/hod/update-profile")
              }
            >
              Complete Profile
            </button>
          </div>
        </div>
      )}

      <div className="dashboard__menu-footer">
        <div className="dashboard__menu-item" onClick={() => navigate("/")}>
          <FaSignOutAlt className="dashboard__menu-icon" />
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default HODSideMenu;