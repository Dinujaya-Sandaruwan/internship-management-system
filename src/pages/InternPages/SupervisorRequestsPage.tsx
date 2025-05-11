import React, { useState } from "react";
import {
  FaHome,
  FaEnvelope,
  FaBell,
  FaTasks,
  FaClipboardCheck,
  FaChartLine,
  FaUserEdit,
  FaUserTie,
  FaSignOutAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaBuilding,
  FaUniversity,
  FaLaptopCode,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaUserGraduate,
  FaPaperPlane,
  FaEnvelopeOpen,
  FaPhone,
  FaClock,
} from "react-icons/fa";
import SideMenu from "../../components/SideMenu";

const SupervisorRequestsPage: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("supervisors");

  // Current user data
  const [currentUser] = useState({
    name: "Erandi Katugampala",
    avatar: "E",
    title: "Software Engineering Intern",
    company: "Tech Solutions Ltd.",
    position: "Software Engineering Intern",
  });

  // Supervisor request state (single request)
  const [request, setRequest] = useState({
    supervisorName: "Dr. Kumara Jayasuriya",
    supervisorTitle: "Senior Lecturer",
    supervisorDepartment: "Department of Computer Science",
    university: "University of Colombo",
    profileImage: null,
    status: "pending", // pending, accepted, declined
    requestDate: "2025-05-01",
    message:
      "I would like to be your academic supervisor for your internship at Tech Solutions Ltd. I have experience supervising students in software engineering roles and would be able to provide guidance on your projects and help with your academic requirements during the internship period. Please accept this request if you would like me to be your supervisor.",
    expertise: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Software Engineering",
    ],
    contactEmail: "kumara.jayasuriya@sci.cmb.ac.lk",
    contactPhone: "+94 71 234 5678",
    officeHours: "Monday, Wednesday, Friday: 2:00 PM - 4:00 PM",
  });

  // Show detailed view state
  const [showDetails, setShowDetails] = useState(false);

  // Response message for request
  const [responseMessage, setResponseMessage] = useState("");

  // Accept the request
  const acceptRequest = () => {
    setRequest({
      ...request,
      status: "accepted",
    });
    setShowDetails(false);
  };

  // Decline the request
  const declineRequest = () => {
    setRequest({
      ...request,
      status: "declined",
    });
    setShowDetails(false);
  };

  // Send a response message
  const sendResponse = () => {
    if (responseMessage.trim() !== "") {
      // In a real app, this would send the message to the supervisor
      console.log(
        `Sending response to ${request.supervisorName}: ${responseMessage}`
      );
      setResponseMessage("");
      // Show a success message (would be implemented in a real app)
    }
  };

  // Get today's date for display
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

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <SideMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />

      {/* Main Content */}
      <div className="dashboard__main supervisor-requests-page">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="supervisor-requests-title">Supervisor Request</h1>
          </div>
          <div className="dashboard__header-right">
            <div className="dashboard__date">
              <FaCalendarAlt className="date-icon" />
              {getTodayDate()}
            </div>
            <div className="dashboard__profile">
              <div className="dashboard__profile-image">
                <span>{currentUser.avatar}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="supervisor-requests-container">
          {/* Info box */}
          <div className="info-box">
            <FaInfoCircle className="info-box-icon" />
            <div className="info-box-content">
              <h3>Supervision Information</h3>
              <p>
                Your academic supervisor will guide you through your internship,
                evaluate your progress, and ensure your internship meets
                academic requirements. You need to accept or decline the
                supervisor request below.
              </p>
            </div>
          </div>

          {/* Single Request Card */}
          {request.status === "pending" && (
            <div className="request-card pending">
              <div className="request-status-bar">
                <div className="status-indicator">
                  <FaEnvelopeOpen />
                  <span>New Request</span>
                </div>
                <div className="request-date">
                  Received on {formatDate(request.requestDate)}
                </div>
              </div>

              <div className="request-content">
                <div className="supervisor-section">
                  <div className="supervisor-avatar">
                    {request.profileImage ? (
                      <img
                        src={request.profileImage}
                        alt={request.supervisorName}
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {request.supervisorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div className="supervisor-badge">
                      <FaUserGraduate />
                    </div>
                  </div>

                  <div className="supervisor-info">
                    <h2>{request.supervisorName}</h2>
                    <p className="supervisor-title">
                      {request.supervisorTitle}
                    </p>
                    <p className="supervisor-department">
                      {request.supervisorDepartment}
                    </p>
                    <p className="supervisor-university">
                      {request.university}
                    </p>
                  </div>
                </div>

                <div className="request-message-section">
                  <h3>Request Message</h3>
                  <div className="request-message">
                    <p>
                      {!showDetails
                        ? `${request.message.substring(0, 200)}...`
                        : request.message}
                    </p>
                    {!showDetails && (
                      <button
                        className="view-details-btn"
                        onClick={() => setShowDetails(true)}
                      >
                        <FaExternalLinkAlt /> View Request Details
                      </button>
                    )}
                  </div>
                </div>

                <div className="request-actions">
                  <button className="accept-btn" onClick={acceptRequest}>
                    <FaCheck /> Accept Supervisor
                  </button>
                  <button className="decline-btn" onClick={declineRequest}>
                    <FaTimes /> Decline Request
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Accepted request view */}
          {request.status === "accepted" && (
            <div className="request-card accepted">
              <div className="request-status-bar">
                <div className="status-indicator">
                  <FaCheck />
                  <span>Supervisor Accepted</span>
                </div>
                <div className="request-date">
                  Accepted on{" "}
                  {formatDate(new Date().toISOString().split("T")[0])}
                </div>
              </div>

              <div className="request-content">
                <div className="supervisor-section">
                  <div className="supervisor-avatar">
                    {request.profileImage ? (
                      <img
                        src={request.profileImage}
                        alt={request.supervisorName}
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {request.supervisorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div className="supervisor-badge">
                      <FaUserGraduate />
                    </div>
                  </div>

                  <div className="supervisor-info">
                    <h2>{request.supervisorName}</h2>
                    <p className="supervisor-title">
                      {request.supervisorTitle}
                    </p>
                    <p className="supervisor-department">
                      {request.supervisorDepartment}
                    </p>
                    <p className="supervisor-university">
                      {request.university}
                    </p>
                  </div>
                </div>

                <div className="supervisor-details">
                  <div className="detail-section">
                    <h3>
                      <FaEnvelope className="detail-icon" /> Contact Information
                    </h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">
                          {request.contactEmail}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">
                          {request.contactPhone}
                        </span>
                      </div>
                      <div className="detail-item full-width">
                        <span className="detail-label">Office Hours:</span>
                        <span className="detail-value">
                          {request.officeHours}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>
                      <FaUserTie className="detail-icon" /> Areas of Expertise
                    </h3>
                    <div className="expertise-tags">
                      {request.expertise.map((area, index) => (
                        <span key={index} className="expertise-tag">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>
                      <FaPaperPlane className="detail-icon" /> Send Message to
                      Supervisor
                    </h3>
                    <div className="message-input">
                      <textarea
                        placeholder="Write a message to your supervisor..."
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                      />
                      <button
                        className="send-message-btn"
                        disabled={responseMessage.trim() === ""}
                        onClick={sendResponse}
                      >
                        <FaPaperPlane /> Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Declined request view */}
          {request.status === "declined" && (
            <div className="request-card declined">
              <div className="request-status-bar">
                <div className="status-indicator">
                  <FaTimes />
                  <span>Request Declined</span>
                </div>
                <div className="request-date">
                  Declined on{" "}
                  {formatDate(new Date().toISOString().split("T")[0])}
                </div>
              </div>

              <div className="request-content">
                <div className="supervisor-section">
                  <div className="supervisor-avatar">
                    {request.profileImage ? (
                      <img
                        src={request.profileImage}
                        alt={request.supervisorName}
                      />
                    ) : (
                      <div className="avatar-placeholder faded">
                        {request.supervisorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>

                  <div className="supervisor-info">
                    <h2>{request.supervisorName}</h2>
                    <p className="supervisor-title">
                      {request.supervisorTitle}
                    </p>
                    <p className="supervisor-department">
                      {request.supervisorDepartment}
                    </p>
                    <p className="supervisor-university">
                      {request.university}
                    </p>
                  </div>
                </div>

                <div className="declined-message-section">
                  <p>
                    You have declined this supervision request. Please contact
                    the Internship Coordinator if you need to be assigned a
                    different supervisor.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* No request state (would be shown if there are no pending requests) */}
          {false && (
            <div className="no-request-card">
              <div className="no-request-content">
                <FaUserTie className="no-request-icon" />
                <h2>No Supervisor Request</h2>
                <p>
                  You haven't received any supervisor requests yet. Supervisors
                  will be assigned within the first two weeks of your
                  internship.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detailed view modal */}
        {showDetails && (
          <div className="detail-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Supervisor Request Details</h2>
                <button
                  className="close-modal-btn"
                  onClick={() => setShowDetails(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="supervisor-profile">
                  <div className="supervisor-section modal-section">
                    <div className="supervisor-avatar large">
                      {request.profileImage ? (
                        <img
                          src={request.profileImage}
                          alt={request.supervisorName}
                        />
                      ) : (
                        <div className="avatar-placeholder large">
                          {request.supervisorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                      <div className="supervisor-badge large">
                        <FaUserGraduate />
                      </div>
                    </div>
                    <div className="supervisor-info">
                      <h2>{request.supervisorName}</h2>
                      <p className="supervisor-title">
                        {request.supervisorTitle}
                      </p>
                      <p className="supervisor-department">
                        {request.supervisorDepartment}
                      </p>
                      <p className="supervisor-university">
                        {request.university}
                      </p>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>
                      <FaEnvelope className="detail-icon" /> Contact Information
                    </h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">
                          {request.contactEmail}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">
                          {request.contactPhone}
                        </span>
                      </div>
                      <div className="detail-item full-width">
                        <span className="detail-label">Office Hours:</span>
                        <span className="detail-value">
                          {request.officeHours}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>
                      <FaUserTie className="detail-icon" /> Areas of Expertise
                    </h3>
                    <div className="expertise-tags">
                      {request.expertise.map((area, index) => (
                        <span key={index} className="expertise-tag">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>
                      <FaEnvelopeOpen className="detail-icon" /> Request Message
                    </h3>
                    <div className="full-message">
                      <p>{request.message}</p>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>
                      <FaPaperPlane className="detail-icon" /> Your Response
                    </h3>
                    <div className="message-input">
                      <textarea
                        placeholder="Write a message to the supervisor..."
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                      ></textarea>
                      <button
                        className="send-message-btn"
                        disabled={responseMessage.trim() === ""}
                        onClick={sendResponse}
                      >
                        <FaPaperPlane /> Send Message
                      </button>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button className="accept-btn" onClick={acceptRequest}>
                      <FaCheck /> Accept Supervisor
                    </button>
                    <button className="decline-btn" onClick={declineRequest}>
                      <FaTimes /> Decline Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorRequestsPage;
