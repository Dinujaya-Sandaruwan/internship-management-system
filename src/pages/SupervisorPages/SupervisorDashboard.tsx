import React, { useState } from "react";
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
  FaUserGraduate,
  FaInfoCircle,
  FaExclamationTriangle,
  FaUserPlus,
  FaSearch,
  FaPaperPlane,
  FaUniversity,
  FaBuilding,
  FaUserTie,
  FaIdBadge,
  FaLock,
} from "react-icons/fa";

const SupervisorDashboard: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  // Sample supervisor data
  const [supervisor, setSupervisor] = useState({
    name: "Dr. Kumara Jayasuriya",
    avatar: "KJ",
    title: "Senior Lecturer",
    department: "Department of Computer Science",
    university: "University of Colombo",
    profileCompletion: 25, // Initially low
  });

  // Student ID input state
  const [studentId, setStudentId] = useState("");
  const [studentIdError, setStudentIdError] = useState("");
  const [searchedStudent, setSearchedStudent] = useState<null | {
    id: string;
    name: string;
    course: string;
    email: string;
    avatar: string;
  }>(null);

  // Request state
  const [requestSent, setRequestSent] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  // Search for student
  const searchStudent = () => {
    if (!studentId.trim()) {
      setStudentIdError("Please enter a student ID");
      return;
    }

    // In a real app, this would be an API call to fetch student data
    // For this prototype, we'll simulate a successful search
    if (studentId.match(/^TP\/\d{4}\/\d{3}$/)) {
      setSearchedStudent({
        id: studentId,
        name: "Erandi Katugampala",
        course: "BSc in Software Engineering",
        email: "erandi.k@cmb.ac.lk",
        avatar: "EK",
      });
      setStudentIdError("");
    } else {
      setStudentIdError(
        "Student not found. Please check the ID format (e.g., TP/2020/123)"
      );
      setSearchedStudent(null);
    }
  };

  // Send supervision request
  const sendSupervisionRequest = () => {
    if (supervisor.profileCompletion < 80) {
      alert(
        "Please complete at least 80% of your profile before sending a supervision request"
      );
      return;
    }

    if (!requestMessage.trim()) {
      alert("Please enter a message for the student");
      return;
    }

    // In a real app, this would send the request to the server
    setRequestSent(true);

    // Reset the form after successful submission
    setTimeout(() => {
      setRequestSent(false);
      setRequestMessage("");
      setSearchedStudent(null);
      setStudentId("");
    }, 3000);
  };

  // Get time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Get today's date
  const getTodayDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
  };

  return (
    <div className="dashboard supervisor-dashboard">
      {/* Sidebar */}
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar-header">
          <div className="dashboard__logo">
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
              activeMenuItem === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("dashboard")}
          >
            <FaHome className="dashboard__menu-icon" />
            <span>Dashboard</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "messages" ? "active" : ""
            } ${supervisor.profileCompletion < 80 ? "disabled" : ""}`}
            onClick={() =>
              supervisor.profileCompletion >= 80 &&
              setActiveMenuItem("messages")
            }
          >
            <FaEnvelope className="dashboard__menu-icon" />
            <span>Messages</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "notifications" ? "active" : ""
            } ${supervisor.profileCompletion < 80 ? "disabled" : ""}`}
            onClick={() =>
              supervisor.profileCompletion >= 80 &&
              setActiveMenuItem("notifications")
            }
          >
            <FaBell className="dashboard__menu-icon" />
            <span>Notifications</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "interns" ? "active" : ""
            } ${supervisor.profileCompletion < 80 ? "disabled" : ""}`}
            onClick={() =>
              supervisor.profileCompletion >= 80 && setActiveMenuItem("interns")
            }
          >
            <FaUsers className="dashboard__menu-icon" />
            <span>My Interns</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "evaluations" ? "active" : ""
            } ${supervisor.profileCompletion < 80 ? "disabled" : ""}`}
            onClick={() =>
              supervisor.profileCompletion >= 80 &&
              setActiveMenuItem("evaluations")
            }
          >
            <FaClipboardCheck className="dashboard__menu-icon" />
            <span>Evaluations</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "reports" ? "active" : ""
            } ${supervisor.profileCompletion < 80 ? "disabled" : ""}`}
            onClick={() =>
              supervisor.profileCompletion >= 80 && setActiveMenuItem("reports")
            }
          >
            <FaFileAlt className="dashboard__menu-icon" />
            <span>Reports</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "progress" ? "active" : ""
            } ${supervisor.profileCompletion < 80 ? "disabled" : ""}`}
            onClick={() =>
              supervisor.profileCompletion >= 80 &&
              setActiveMenuItem("progress")
            }
          >
            <FaChartLine className="dashboard__menu-icon" />
            <span>Progress Tracking</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "schedule" ? "active" : ""
            } ${supervisor.profileCompletion < 80 ? "disabled" : ""}`}
            onClick={() =>
              supervisor.profileCompletion >= 80 &&
              setActiveMenuItem("schedule")
            }
          >
            <FaCalendarAlt className="dashboard__menu-icon" />
            <span>Schedule</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "updateProfile" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("updateProfile")}
          >
            <FaUserEdit className="dashboard__menu-icon" />
            <span>Update Profile</span>
          </div>
        </div>

        <div className="dashboard__menu-footer">
          <div className="dashboard__menu-item">
            <FaSignOutAlt className="dashboard__menu-icon" />
            <span>Sign Out</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard__main supervisor-main">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1>
              {getGreeting()}, {supervisor.name.split(" ")[0]}
            </h1>
            <p>
              <FaUniversity className="info-icon" /> {supervisor.university} |
              <FaBuilding className="info-icon" /> {supervisor.department} |
              <FaUserTie className="info-icon" /> {supervisor.title}
            </p>
          </div>
          <div className="dashboard__header-right">
            <div className="dashboard__date">
              <FaCalendarAlt className="date-icon" />
              {getTodayDate()}
            </div>
            <div className="dashboard__profile">
              <div className="dashboard__profile-image">
                <span>{supervisor.avatar}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile completion alert */}
        {supervisor.profileCompletion < 80 && (
          <div className="dashboard__alert supervisor-alert">
            <div className="dashboard__alert-icon">
              <FaExclamationTriangle />
            </div>
            <div className="dashboard__alert-content">
              <h3>Complete Your Profile</h3>
              <p>
                Your profile is only {supervisor.profileCompletion}% complete.
                You need to complete at least 80% of your profile to access all
                system features and send supervision requests to interns.
              </p>
              <button
                className="dashboard__alert-button"
                onClick={() => setActiveMenuItem("updateProfile")}
              >
                Update Profile Now <FaUserEdit style={{ marginLeft: "8px" }} />
              </button>
            </div>
            <div className="dashboard__alert-progress">
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${supervisor.profileCompletion}%` }}
                ></div>
              </div>
              <span>{supervisor.profileCompletion}%</span>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="supervisor-dashboard-content">
          <div className="supervisor-widget request-supervision-widget">
            <div className="widget-header">
              <h3>
                <FaUserGraduate className="widget-icon" /> Request Intern
                Supervision
              </h3>
            </div>
            <div className="widget-content">
              <div className="info-box">
                <FaInfoCircle className="info-box-icon" />
                <div className="info-box-content">
                  <p>
                    Enter the student ID to find and send a supervision request.
                    The student will need to accept your request before you can
                    access their internship data.
                  </p>
                </div>
              </div>

              <div className="search-student-section">
                <div className="search-input-container">
                  <input
                    type="text"
                    placeholder="Enter Student ID (e.g., TP/2020/123)"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className={studentIdError ? "has-error" : ""}
                  />
                  <button onClick={searchStudent} className="search-button">
                    <FaSearch /> Search
                  </button>
                </div>
                {studentIdError && (
                  <div className="error-message">{studentIdError}</div>
                )}

                {/* Student search result */}
                {searchedStudent && (
                  <div className="student-result">
                    <div className="student-info">
                      <div className="student-avatar">
                        <span>{searchedStudent.avatar}</span>
                      </div>
                      <div className="student-details">
                        <h4>{searchedStudent.name}</h4>
                        <p className="student-id">
                          <FaIdBadge /> {searchedStudent.id}
                        </p>
                        <p className="student-course">
                          <FaUserGraduate /> {searchedStudent.course}
                        </p>
                        <p className="student-email">
                          <FaEnvelope /> {searchedStudent.email}
                        </p>
                      </div>
                    </div>

                    <div className="request-form">
                      <h4>Send Supervision Request</h4>
                      <textarea
                        placeholder="Write a message to the student explaining why you would be a good supervisor for their internship..."
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        disabled={supervisor.profileCompletion < 80}
                      ></textarea>
                      {supervisor.profileCompletion < 80 ? (
                        <div className="form-note">
                          <FaExclamationTriangle className="note-icon" />
                          Please complete your profile (80% minimum) before
                          sending a request
                        </div>
                      ) : (
                        <button
                          className="send-request-btn"
                          onClick={sendSupervisionRequest}
                          disabled={!requestMessage.trim()}
                        >
                          <FaPaperPlane /> Send Supervision Request
                        </button>
                      )}

                      {requestSent && (
                        <div className="request-success">
                          <FaCheckCircle className="success-icon" />
                          Request sent successfully! The student will be
                          notified.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="supervisor-widget supervisor-stats-widget">
            <div className="widget-header">
              <h3>
                <FaChartLine className="widget-icon" /> Supervision Statistics
              </h3>
            </div>
            <div className="widget-content">
              <div className="info-box disabled-feature">
                <FaInfoCircle className="info-box-icon" />
                <div className="info-box-content">
                  <p>
                    You need to have at least one active intern to view
                    supervision statistics. Complete your profile and send
                    supervision requests to access more features.
                  </p>
                </div>
              </div>

              <div className="stats-container">
                <div className="quick-stats">
                  <div className="stat-card disabled">
                    <div className="stat-icon">
                      <FaUsers />
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">0</div>
                      <div className="stat-label">Active Interns</div>
                    </div>
                    <div className="stat-empty-indicator">
                      <FaLock />
                    </div>
                  </div>

                  <div className="stat-card disabled">
                    <div className="stat-icon">
                      <FaClipboardCheck />
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">0</div>
                      <div className="stat-label">Evaluations Submitted</div>
                    </div>
                    <div className="stat-empty-indicator">
                      <FaLock />
                    </div>
                  </div>

                  <div className="stat-card disabled">
                    <div className="stat-icon">
                      <FaFileAlt />
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">0</div>
                      <div className="stat-label">Reports Reviewed</div>
                    </div>
                    <div className="stat-empty-indicator">
                      <FaLock />
                    </div>
                  </div>

                  <div className="stat-card disabled">
                    <div className="stat-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">0</div>
                      <div className="stat-label">Meetings Scheduled</div>
                    </div>
                    <div className="stat-empty-indicator">
                      <FaLock />
                    </div>
                  </div>
                </div>

                <div className="access-note">
                  Complete your profile to unlock supervision features
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
