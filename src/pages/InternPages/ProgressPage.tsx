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
  FaArrowUp,
  FaEye,
  FaFileAlt,
  FaArrowRight,
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaUniversity,
  FaBuilding,
  FaLaptopCode,
  FaCalendarCheck,
  FaStar,
  FaThumbsUp,
  FaComment,
  FaFileDownload,
  FaExclamation,
  FaCircle,
  FaArrowDown,
} from "react-icons/fa";
import SideMenu from "../../components/InternSideMenu";

interface ProgressReport {
  id: number;
  month: string;
  submissionDate: string;
  supervisorName: string;
  rating: number;
  status: "approved" | "pending" | "rejected";
  feedback: string;
  skills: {
    name: string;
    rating: number;
  }[];
  comments: string;
  fileUrl: string;
}

interface FeedbackItem {
  id: number;
  date: string;
  from: string;
  message: string;
  type: "positive" | "improvement" | "general";
}

const ProgressPage: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("progress");

  // User info
  const [currentUser] = useState({
    name: "Erandi Katugampala",
    avatar: "E",
    title: "Software Engineering Intern",
    company: "Tech Solutions Ltd.",
    position: "Software Engineering Intern",
    startDate: "Jan 15, 2025",
    endDate: "Jul 15, 2025",
    overallRating: 4.2,
  });

  // Sample progress data
  const [progressReports, setProgressReports] = useState<ProgressReport[]>([
    {
      id: 1,
      month: "January 2025",
      submissionDate: "Feb 5, 2025",
      supervisorName: "Dr. Kumara Jayasuriya",
      rating: 4.0,
      status: "approved",
      feedback:
        "Good progress in the first month. Adapting well to the work environment.",
      skills: [
        { name: "Technical Knowledge", rating: 3.8 },
        { name: "Communication", rating: 4.2 },
        { name: "Problem Solving", rating: 4.0 },
        { name: "Team Collaboration", rating: 4.5 },
      ],
      comments:
        "Erandi has shown great initiative in learning our tech stack. Should focus more on documentation practices.",
      fileUrl: "/reports/january_2025.pdf",
    },
    {
      id: 2,
      month: "February 2025",
      submissionDate: "Mar 7, 2025",
      supervisorName: "Dr. Kumara Jayasuriya",
      rating: 4.2,
      status: "approved",
      feedback:
        "Showing improvement in technical skills and actively participating in team discussions.",
      skills: [
        { name: "Technical Knowledge", rating: 4.0 },
        { name: "Communication", rating: 4.2 },
        { name: "Problem Solving", rating: 4.3 },
        { name: "Team Collaboration", rating: 4.5 },
      ],
      comments:
        "Documentation has improved. Keep up the good work with the React components.",
      fileUrl: "/reports/february_2025.pdf",
    },
    {
      id: 3,
      month: "March 2025",
      submissionDate: "Apr 5, 2025",
      supervisorName: "Dr. Kumara Jayasuriya",
      rating: 4.5,
      status: "approved",
      feedback:
        "Excellent progress! Successfully completed the assigned dashboard project ahead of schedule.",
      skills: [
        { name: "Technical Knowledge", rating: 4.3 },
        { name: "Communication", rating: 4.5 },
        { name: "Problem Solving", rating: 4.6 },
        { name: "Team Collaboration", rating: 4.7 },
      ],
      comments:
        "Erandi showed exceptional problem-solving skills when tackling the data visualization components. Ready for more challenging tasks.",
      fileUrl: "/reports/march_2025.pdf",
    },
    {
      id: 4,
      month: "April 2025",
      submissionDate: "May 8, 2025",
      supervisorName: "Dr. Kumara Jayasuriya",
      rating: 4.3,
      status: "approved",
      feedback:
        "Consistent performance and good quality work on the user authentication module.",
      skills: [
        { name: "Technical Knowledge", rating: 4.5 },
        { name: "Communication", rating: 4.5 },
        { name: "Problem Solving", rating: 4.2 },
        { name: "Team Collaboration", rating: 4.5 },
      ],
      comments:
        "Good work implementing security best practices. Consider exploring more advanced React patterns for future work.",
      fileUrl: "/reports/april_2025.pdf",
    },
    {
      id: 5,
      month: "May 2025",
      submissionDate: "May 9, 2025",
      supervisorName: "Dr. Kumara Jayasuriya",
      rating: 0,
      status: "pending",
      feedback: "",
      skills: [
        { name: "Technical Knowledge", rating: 0 },
        { name: "Communication", rating: 0 },
        { name: "Problem Solving", rating: 0 },
        { name: "Team Collaboration", rating: 0 },
      ],
      comments: "",
      fileUrl: "",
    },
  ]);

  // Feedback from supervisors
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([
    {
      id: 1,
      date: "Feb 15, 2025",
      from: "Dr. Kumara Jayasuriya",
      message:
        "Your documentation of the authentication module was exceptional. The team was able to build on your work seamlessly.",
      type: "positive",
    },
    {
      id: 2,
      date: "Mar 10, 2025",
      from: "Ms. Thilini Peiris (Industry Supervisor)",
      message:
        "I'd recommend spending more time understanding the existing codebase before implementing new features.",
      type: "improvement",
    },
    {
      id: 3,
      date: "Apr 2, 2025",
      from: "Dr. Kumara Jayasuriya",
      message:
        "Great job presenting your work at the team meeting. Everyone was impressed with your clear communication.",
      type: "positive",
    },
    {
      id: 4,
      date: "Apr 20, 2025",
      from: "Ms. Thilini Peiris (Industry Supervisor)",
      message:
        "Please remember to update the project Kanban board with your latest progress regularly.",
      type: "general",
    },
    {
      id: 5,
      date: "May 2, 2025",
      from: "Dr. Kumara Jayasuriya",
      message:
        "Your implementation of the data visualization component was creative and efficient. Well done!",
      type: "positive",
    },
  ]);

  // Internship progress percentage calculation
  const calculateProgress = () => {
    // Calculate progress based on time
    const startDate = new Date("2025-01-15");
    const endDate = new Date("2025-07-15");
    const today = new Date();

    const totalDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    const daysCompleted =
      (today.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    return Math.min(
      Math.max(Math.floor((daysCompleted / totalDays) * 100), 0),
      100
    );
  };

  // Calculate remaining days
  const calculateRemainingDays = () => {
    const endDate = new Date("2025-07-15");
    const today = new Date();

    const remainingDays = Math.max(
      0,
      Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    );
    return remainingDays;
  };

  // Selected report for viewing details
  const [selectedReport, setSelectedReport] = useState<ProgressReport | null>(
    null
  );

  // Function to view report details
  const viewReportDetails = (report: ProgressReport) => {
    setSelectedReport(report);
  };

  // Close report details modal
  const closeReportDetails = () => {
    setSelectedReport(null);
  };

  // Get star ratings display
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="star-half" />);
      } else {
        stars.push(<FaStar key={i} className="star-empty" />);
      }
    }

    return <div className="star-rating">{stars}</div>;
  };

  // Get badge color based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "status-badge approved";
      case "pending":
        return "status-badge pending";
      case "rejected":
        return "status-badge rejected";
      default:
        return "status-badge";
    }
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

  // Skill categories for the skills chart
  const skillCategories = [
    "Technical Knowledge",
    "Communication",
    "Problem Solving",
    "Team Collaboration",
    "Initiative",
    "Adaptability",
  ];

  // Calculate average rating per skill category
  const calculateSkillAverages = () => {
    const approvedReports = progressReports.filter(
      (report) => report.status === "approved"
    );

    if (approvedReports.length === 0) return [];

    const skillMap = new Map<string, { total: number; count: number }>();

    // Aggregate skill ratings from reports
    approvedReports.forEach((report) => {
      report.skills.forEach((skill) => {
        const existing = skillMap.get(skill.name);
        if (existing) {
          existing.total += skill.rating;
          existing.count += 1;
        } else {
          skillMap.set(skill.name, { total: skill.rating, count: 1 });
        }
      });
    });

    // Calculate averages and format for display
    return (
      Array.from(skillMap.entries())
        .map(([name, { total, count }]) => ({
          name,
          value: count > 0 ? total / count : 0,
        }))
        // Only show skills that have ratings
        .filter((skill) => skill.value > 0)
        // Sort by highest value first
        .sort((a, b) => b.value - a.value)
        // Limit to exactly 4 skills to ensure consistent height
        .slice(0, 4)
    );
  };

  // Get month trend indicators
  const getMonthlyTrend = (index: number) => {
    if (index === 0 || progressReports[index].status !== "approved")
      return null;

    const currentRating = progressReports[index].rating;
    const previousRating = progressReports[index - 1].rating;

    if (currentRating > previousRating) {
      return <FaArrowUp className="trend-up" />;
    } else if (currentRating < previousRating) {
      return <FaArrowDown className="trend-down" />;
    } else {
      return <FaCircle className="trend-neutral" />;
    }
  };

  const skillAverages = calculateSkillAverages();

  return (
    <div className="dashboard">
      {/* Sidebar */}
      {/* <SideMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      /> */}

      {/* Main Content */}
      <div className="dashboard__main progress-page">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="progress-title">Internship Progress</h1>
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

        {/* Progress Overview */}
        <div className="progress-overview">
          <div className="progress-card overall-progress">
            <div className="progress-card-header">
              <h3>Overall Progress</h3>
              <div className="progress-period">
                {currentUser.startDate} - {currentUser.endDate}
              </div>
            </div>
            <div className="progress-card-content">
              <div className="progress-horizontal-layout">
                <div className="progress-chart">
                  <svg viewBox="0 0 120 120" className="progress-circle">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="339.292"
                      strokeDashoffset={
                        339.292 * (1 - calculateProgress() / 100)
                      }
                      transform="rotate(-90 60 60)"
                    />
                    <defs>
                      <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3254c5" />
                        <stop offset="100%" stopColor="#7030b8" />
                      </linearGradient>
                    </defs>
                    <text
                      x="60"
                      y="60"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="22"
                      fontWeight="600"
                      fill="#111827"
                    >
                      {calculateProgress()}%
                    </text>
                  </svg>
                </div>
                <div className="progress-stats horizontal">
                  <div className="stat-item">
                    <div className="stat-value">{calculateRemainingDays()}</div>
                    <div className="stat-label">Days Remaining</div>
                  </div>
                  <div className="stat-divider vertical"></div>
                  <div className="stat-item">
                    <div className="stat-value">
                      {
                        progressReports.filter((r) => r.status === "approved")
                          .length
                      }
                    </div>
                    <div className="stat-label">Reports Completed</div>
                  </div>
                  <div className="stat-divider vertical"></div>
                  <div className="stat-item">
                    <div className="stat-value rating">
                      {currentUser.overallRating.toFixed(1)}
                    </div>
                    <div className="stat-label">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="progress-card skill-progress">
            <div className="progress-card-header">
              <h3>Skill Progress</h3>
              <div className="progress-subtitle">
                Based on supervisor evaluations
              </div>
            </div>
            <div className="progress-card-content">
              <div className="skills-chart">
                {/* Only show skills with values to avoid empty space */}
                {skillAverages
                  .filter((skill) => skill.value > 0)
                  .map((skill, index) => (
                    <div className="skill-bar-container" key={index}>
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-bar-wrapper">
                        <div className="skill-bar-bg"></div>
                        <div
                          className="skill-bar-fill"
                          style={{ width: `${(skill.value / 5) * 100}%` }}
                        ></div>
                        <div className="skill-value">
                          {skill.value.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Reports */}
        <div className="progress-card monthly-reports">
          <div className="progress-card-header">
            <h3>Monthly Evaluation Reports</h3>
            <div className="progress-subtitle">
              Reports are submitted by your supervisors at the end of each month
            </div>
          </div>

          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Submission Date</th>
                  <th>Supervisor</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {progressReports.map((report, index) => (
                  <tr
                    key={report.id}
                    className={report.status === "pending" ? "pending-row" : ""}
                  >
                    <td>
                      <div className="month-cell">
                        <span>{report.month}</span>
                        {getMonthlyTrend(index)}
                      </div>
                    </td>
                    <td>
                      {report.status === "pending"
                        ? "Pending"
                        : report.submissionDate}
                    </td>
                    <td>{report.supervisorName}</td>
                    <td>
                      {report.status === "approved" ? (
                        <div className="rating-cell">
                          <span className="rating-value">
                            {report.rating.toFixed(1)}
                          </span>
                          {renderStarRating(report.rating)}
                        </div>
                      ) : (
                        <span className="pending-text">Pending</span>
                      )}
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(report.status)}>
                        {report.status.charAt(0).toUpperCase() +
                          report.status.slice(1)}
                      </span>
                    </td>
                    <td className="actions-cell">
                      {report.status === "approved" && (
                        <>
                          <button
                            className="action-btn view-btn"
                            onClick={() => viewReportDetails(report)}
                          >
                            <FaEye />
                            <span>View</span>
                          </button>
                          <button className="action-btn download-btn">
                            <FaDownload />
                            <span>Download</span>
                          </button>
                        </>
                      )}
                      {report.status === "pending" && (
                        <span className="pending-label">
                          <FaExclamationTriangle className="pending-icon" />
                          Awaiting Submission
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="progress-card feedback-section">
          <div className="progress-card-header">
            <h3>Recent Feedback</h3>
            <div className="progress-subtitle">
              Feedback from your academic and industry supervisors
            </div>
          </div>
          <div className="feedback-list">
            {feedbackItems.map((item) => (
              <div key={item.id} className={`feedback-item ${item.type}`}>
                <div className="feedback-icon">
                  {item.type === "positive" && <FaThumbsUp />}
                  {item.type === "improvement" && <FaExclamation />}
                  {item.type === "general" && <FaInfoCircle />}
                </div>
                <div className="feedback-content">
                  <div className="feedback-header">
                    <div className="feedback-from">{item.from}</div>
                    <div className="feedback-date">{item.date}</div>
                  </div>
                  <div className="feedback-message">{item.message}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="view-all-btn">
            View All Feedback
            <FaArrowRight className="btn-icon" />
          </button>
        </div>

        {/* Report Details Modal */}
        {selectedReport && (
          <div className="report-modal-overlay">
            <div className="report-modal">
              <div className="report-modal-header">
                <h3>Monthly Evaluation Report: {selectedReport.month}</h3>
                <button
                  className="close-modal-btn"
                  onClick={closeReportDetails}
                >
                  &times;
                </button>
              </div>
              <div className="report-modal-content">
                <div className="report-info-section">
                  <div className="report-info-row">
                    <div className="report-info-item">
                      <span className="info-label">Submitted On</span>
                      <span className="info-value">
                        {selectedReport.submissionDate}
                      </span>
                    </div>
                    <div className="report-info-item">
                      <span className="info-label">Supervisor</span>
                      <span className="info-value">
                        {selectedReport.supervisorName}
                      </span>
                    </div>
                    <div className="report-info-item">
                      <span className="info-label">Status</span>
                      <span
                        className={getStatusBadgeClass(selectedReport.status)}
                      >
                        {selectedReport.status.charAt(0).toUpperCase() +
                          selectedReport.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="report-info-row">
                    <div className="report-info-item full-width">
                      <span className="info-label">Overall Rating</span>
                      <div className="overall-rating-display">
                        <span className="rating-value">
                          {selectedReport.rating.toFixed(1)}
                        </span>
                        {renderStarRating(selectedReport.rating)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="report-skills-section">
                  <h4>Skills Assessment</h4>
                  <div className="modal-skills-grid">
                    {selectedReport.skills.map((skill, index) => (
                      <div className="modal-skill-item" key={index}>
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-rating-stars">
                          {renderStarRating(skill.rating)}
                          <span className="skill-rating-value">
                            {skill.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="report-feedback-section">
                  <h4>Supervisor Feedback</h4>
                  <div className="feedback-content">
                    {selectedReport.feedback}
                  </div>
                </div>

                <div className="report-comments-section">
                  <h4>Additional Comments</h4>
                  <div className="comments-content">
                    {selectedReport.comments}
                  </div>
                </div>
              </div>
              <div className="report-modal-footer">
                <button
                  className="modal-btn secondary-btn"
                  onClick={closeReportDetails}
                >
                  Close
                </button>
                <button className="modal-btn primary-btn">
                  <FaDownload className="btn-icon" />
                  Download Full Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
