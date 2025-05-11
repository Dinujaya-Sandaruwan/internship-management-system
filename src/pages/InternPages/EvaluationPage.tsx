import { useState } from "react";
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
  FaDownload,
  FaFileAlt,
  FaFilePdf,
  FaInfoCircle,
  FaUniversity,
  FaBuilding,
  FaLaptopCode,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";
import SideMenu from "../../components/SideMenu";

const EvaluationPage: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("evaluation");

  // User data
  const [currentUser] = useState({
    name: "Erandi Katugampala",
    avatar: "E",
    title: "Software Engineering Intern",
    company: "Tech Solutions Ltd.",
    position: "Software Engineering Intern",
  });

  // Evaluation form status
  const [evaluationForm, setEvaluationForm] = useState({
    isUploaded: true,
    uploadDate: new Date("2025-04-15"),
    evaluationPeriod: "Mid-term Evaluation",
    supervisor: "Dr. Kumara Jayasuriya",
    fileSize: "1.8 MB",
    fileType: "pdf",
  });

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

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Download the evaluation form
  const downloadEvaluationForm = () => {
    // This would be an actual download function in a real implementation
    console.log("Downloading evaluation form");
    alert("Evaluation form downloaded successfully!");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <SideMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />

      {/* Main Content */}
      <div className="dashboard__main evaluation-page">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="evaluation-title">Evaluation Form</h1>
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

        {/* Evaluation content */}
        <div className="evaluation-container">
          {evaluationForm.isUploaded ? (
            <div className="evaluation-form-card">
              <div className="card-content">
                <div className="form-icon">
                  <FaFilePdf />
                </div>
                <div className="form-details">
                  <h2>Your supervisor has uploaded an evaluation form</h2>
                  <div className="form-meta">
                    <div className="meta-item">
                      <span className="meta-label">Evaluation Period:</span>
                      <span className="meta-value">
                        {evaluationForm.evaluationPeriod}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Uploaded By:</span>
                      <span className="meta-value">
                        {evaluationForm.supervisor}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Upload Date:</span>
                      <span className="meta-value">
                        {formatDate(evaluationForm.uploadDate)}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">File Size:</span>
                      <span className="meta-value">
                        {evaluationForm.fileSize}
                      </span>
                    </div>
                  </div>
                  <button
                    className="download-btn"
                    onClick={downloadEvaluationForm}
                  >
                    <FaDownload />
                    <span>Download Evaluation Form</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-evaluation">
              <div className="empty-icon">
                <FaFileAlt />
              </div>
              <h2>No Evaluation Form Available</h2>
              <p>Your supervisor has not uploaded any evaluation form yet.</p>
            </div>
          )}

          {/* Evaluation info section */}
          <div className="evaluation-info">
            <div className="info-header">
              <h3>
                <FaInfoCircle className="info-icon" />
                About Evaluation Process
              </h3>
            </div>
            <div className="info-content">
              <p>
                The internship evaluation process is designed to assess your
                performance, skills development, and overall progress during
                your internship. Your supervisor will upload evaluation forms at
                specific milestones throughout your internship period.
              </p>
              <div className="info-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Download the Form</h4>
                    <p>
                      Download the evaluation form uploaded by your supervisor.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Review the Evaluation</h4>
                    <p>
                      Carefully review the feedback and assessment provided by
                      your supervisor.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Schedule a Meeting</h4>
                    <p>
                      If needed, schedule a meeting with your supervisor to
                      discuss the evaluation in detail.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Set Improvement Goals</h4>
                    <p>
                      Based on the evaluation, set goals for improvement in
                      areas that need attention.
                    </p>
                  </div>
                </div>
              </div>
              <div className="info-note">
                <FaExclamationTriangle className="note-icon" />
                <p>
                  If you have any questions about your evaluation or the
                  evaluation process, please contact your academic coordinator
                  or supervisor directly.
                </p>
              </div>
              <div className="info-action">
                <button className="contact-btn">
                  <span>Contact Academic Coordinator</span>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
