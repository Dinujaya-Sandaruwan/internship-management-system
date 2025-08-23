import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaChevronDown,
  FaStar,
  FaFileAlt,
  FaDownload,
  FaEye,
  FaUserGraduate,
  FaCalendarCheck,
  FaChartLine,
  FaAward,
  FaExclamationTriangle,
  FaComments,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import mockReportsData from "../../data/mockReportsData.json";

interface Intern {
  id: number;
  name: string;
  email: string;
  company: string;
  department: string;
}

interface SkillRating {
  name: string;
  rating: number;
  description?: string;
}

interface MonthlyReport {
  id: number;
  internId: number;
  internName: string;
  internEmail: string;
  internCompany: string;
  internDepartment: string;
  supervisorName: string;
  month: string;
  year: number;
  submissionDate: string;
  overallRating: number;
  skills: SkillRating[];
  achievements: string;
  areasForImprovement: string;
  feedback: string;
  additionalComments: string;
  workQuality: number;
  attendance: number;
  initiative: number;
  teamwork: number;
}

const CoordinatorReportsPage: React.FC = () => {
  // State management
  const [currentUser] = useState({
    name: "Dr. Sarah Johnson",
    avatar: "S",
    role: "Coordinator",
  });

  const [reports] = useState<MonthlyReport[]>(mockReportsData);
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [filteredReports, setFilteredReports] = useState<MonthlyReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInternDropdown, setShowInternDropdown] = useState(false);
  const [selectedReport, setSelectedReport] = useState<MonthlyReport | null>(
    null
  );
  const [showReportModal, setShowReportModal] = useState(false);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  // Get unique interns from reports
  const getUniqueInterns = (): Intern[] => {
    const internsMap = new Map<number, Intern>();
    reports.forEach((report) => {
      if (!internsMap.has(report.internId)) {
        internsMap.set(report.internId, {
          id: report.internId,
          name: report.internName,
          email: report.internEmail,
          company: report.internCompany,
          department: report.internDepartment,
        });
      }
    });
    return Array.from(internsMap.values());
  };

  const interns = getUniqueInterns();

  // Filter interns based on search
  const filteredInterns = interns.filter(
    (intern) =>
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Handle intern selection
  const handleInternSelect = (intern: Intern) => {
    setSelectedIntern(intern);
    setShowInternDropdown(false);
    setSearchTerm("");
  };

  // Filter reports based on selected intern and filters
  useEffect(() => {
    let filtered = reports;

    if (selectedIntern) {
      filtered = filtered.filter(
        (report) => report.internId === selectedIntern.id
      );
    }

    if (filterMonth) {
      filtered = filtered.filter((report) => report.month === filterMonth);
    }

    if (filterYear) {
      filtered = filtered.filter(
        (report) => report.year.toString() === filterYear
      );
    }

    // Sort by submission date (newest first)
    filtered.sort(
      (a, b) =>
        new Date(b.submissionDate).getTime() -
        new Date(a.submissionDate).getTime()
    );

    setFilteredReports(filtered);
  }, [selectedIntern, filterMonth, filterYear, reports]);

  // Render star rating
  const renderStarRating = (rating: number, size: string = "small") => {
    return (
      <div className={`star-rating ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`star ${star <= rating ? "active" : ""}`}
          />
        ))}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Get rating color class
  const getRatingColorClass = (rating: number) => {
    if (rating >= 4.5) return "excellent";
    if (rating >= 4.0) return "good";
    if (rating >= 3.5) return "average";
    if (rating >= 3.0) return "below-average";
    return "poor";
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get unique months and years for filters
  const getUniqueMonths = () => {
    const months = [...new Set(reports.map((report) => report.month))];
    return months.sort();
  };

  const getUniqueYears = () => {
    const years = [...new Set(reports.map((report) => report.year.toString()))];
    return years.sort().reverse();
  };

  // View report details
  const viewReportDetails = (report: MonthlyReport) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  // Close report modal
  const closeReportModal = () => {
    setSelectedReport(null);
    setShowReportModal(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedIntern(null);
    setFilterMonth("");
    setFilterYear("");
    setSearchTerm("");
  };

  return (
    <div className="dashboard">
      {/* Main Content */}
      <div className="dashboard__main coordinator-reports-page">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="reports-title">Intern Reports Management</h1>
            <p className="reports-subtitle">
              View and manage monthly evaluation reports submitted by
              supervisors
            </p>
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

        {/* Filters Section */}
        <div className="reports-filters">
          <div className="filters-row">
            {/* Intern Selection */}
            <div className="filter-group intern-filter">
              <label className="filter-label">
                <FaUserGraduate className="filter-icon" />
                Select Intern
              </label>
              <div className="custom-dropdown">
                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={() => setShowInternDropdown(!showInternDropdown)}
                >
                  {selectedIntern ? (
                    <div className="selected-intern-display">
                      <div className="intern-avatar">
                        {selectedIntern.name.charAt(0)}
                      </div>
                      <div className="intern-info">
                        <span className="intern-name">
                          {selectedIntern.name}
                        </span>
                        <span className="intern-company">
                          {selectedIntern.company}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="placeholder">All Interns</span>
                  )}
                  <FaChevronDown className="dropdown-icon" />
                </button>

                {showInternDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-search">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search interns..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                      />
                    </div>
                    <div className="dropdown-options">
                      <button
                        type="button"
                        className="dropdown-option"
                        onClick={() => {
                          setSelectedIntern(null);
                          setShowInternDropdown(false);
                          setSearchTerm("");
                        }}
                      >
                        <div className="intern-option">
                          <div className="intern-avatar">All</div>
                          <div className="intern-details">
                            <span className="intern-name">All Interns</span>
                            <span className="intern-meta">
                              View all reports
                            </span>
                          </div>
                        </div>
                      </button>
                      {filteredInterns.map((intern) => (
                        <button
                          key={intern.id}
                          type="button"
                          className="dropdown-option"
                          onClick={() => handleInternSelect(intern)}
                        >
                          <div className="intern-option">
                            <div className="intern-avatar">
                              {intern.name.charAt(0)}
                            </div>
                            <div className="intern-details">
                              <span className="intern-name">{intern.name}</span>
                              <span className="intern-meta">
                                {intern.company} • {intern.department}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Month Filter */}
            <div className="filter-group">
              <label className="filter-label">
                <FaCalendarCheck className="filter-icon" />
                Month
              </label>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="filter-select"
              >
                <option value="">All Months</option>
                {getUniqueMonths().map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="filter-group">
              <label className="filter-label">
                <FaCalendarAlt className="filter-icon" />
                Year
              </label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="filter-select"
              >
                <option value="">All Years</option>
                {getUniqueYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              type="button"
              className="clear-filters-btn"
              onClick={clearFilters}
            >
              <FaTimes className="clear-icon" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Reports Summary */}
        <div className="reports-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <FaFileAlt />
            </div>
            <div className="summary-content">
              <h3>{filteredReports.length}</h3>
              <p>Total Reports</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">
              <FaUserGraduate />
            </div>
            <div className="summary-content">
              <h3>{selectedIntern ? 1 : interns.length}</h3>
              <p>Interns</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">
              <FaChartLine />
            </div>
            <div className="summary-content">
              <h3>
                {filteredReports.length > 0
                  ? (
                      filteredReports.reduce(
                        (sum, report) => sum + report.overallRating,
                        0
                      ) / filteredReports.length
                    ).toFixed(1)
                  : "0.0"}
              </h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="reports-list">
          {filteredReports.length === 0 ? (
            <div className="no-reports">
              <FaFileAlt className="no-reports-icon" />
              <h3>No Reports Found</h3>
              <p>
                {selectedIntern
                  ? `No reports found for ${selectedIntern.name} with the current filters.`
                  : "No reports match the current filter criteria."}
              </p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div className="report-intern-info">
                    <div className="intern-avatar">
                      {report.internName.charAt(0)}
                    </div>
                    <div className="intern-details">
                      <h3 className="intern-name">{report.internName}</h3>
                      <p className="intern-meta">
                        {report.internCompany} • {report.internDepartment}
                      </p>
                    </div>
                  </div>
                  <div className="report-meta">
                    <div className="report-period">
                      <FaCalendarAlt className="meta-icon" />
                      {report.month} {report.year}
                    </div>
                    <div className="submission-date">
                      Submitted: {formatDate(report.submissionDate)}
                    </div>
                  </div>
                </div>

                <div className="report-content">
                  <div className="rating-section">
                    <div className="overall-rating">
                      <h4>Overall Rating</h4>
                      <div
                        className={`rating-display ${getRatingColorClass(
                          report.overallRating
                        )}`}
                      >
                        {renderStarRating(report.overallRating, "medium")}
                      </div>
                    </div>
                  </div>

                  <div className="skills-preview">
                    <h4>Skills Assessment</h4>
                    <div className="skills-grid">
                      {report.skills.slice(0, 3).map((skill, index) => (
                        <div key={index} className="skill-item">
                          <span className="skill-name">{skill.name}</span>
                          {renderStarRating(skill.rating, "small")}
                        </div>
                      ))}
                      {report.skills.length > 3 && (
                        <div className="skill-item more-skills">
                          <span className="more-text">
                            +{report.skills.length - 3} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="report-preview">
                    <div className="preview-section">
                      <h5>
                        <FaAward className="section-icon" />
                        Achievements
                      </h5>
                      <p className="preview-text">
                        {report.achievements.length > 150
                          ? `${report.achievements.substring(0, 150)}...`
                          : report.achievements}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="report-actions">
                  <button
                    type="button"
                    className="action-btn view-btn"
                    onClick={() => viewReportDetails(report)}
                  >
                    <FaEye className="btn-icon" />
                    View Details
                  </button>
                  <button type="button" className="action-btn download-btn">
                    <FaDownload className="btn-icon" />
                    Download
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Report Details Modal */}
      {showReportModal && selectedReport && (
        <div className="modal-overlay" onClick={closeReportModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Monthly Report Details</h2>
              <button
                type="button"
                className="modal-close"
                onClick={closeReportModal}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="report-details">
                {/* Intern Information */}
                <div className="detail-section">
                  <h3>
                    <FaUserGraduate className="section-icon" />
                    Intern Information
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Name:</label>
                      <span>{selectedReport.internName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <span>{selectedReport.internEmail}</span>
                    </div>
                    <div className="detail-item">
                      <label>Company:</label>
                      <span>{selectedReport.internCompany}</span>
                    </div>
                    <div className="detail-item">
                      <label>Department:</label>
                      <span>{selectedReport.internDepartment}</span>
                    </div>
                    <div className="detail-item">
                      <label>Supervisor:</label>
                      <span>{selectedReport.supervisorName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Report Period:</label>
                      <span>
                        {selectedReport.month} {selectedReport.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overall Rating */}
                <div className="detail-section">
                  <h3>
                    <FaStar className="section-icon" />
                    Overall Performance
                  </h3>
                  <div
                    className={`overall-rating-display ${getRatingColorClass(
                      selectedReport.overallRating
                    )}`}
                  >
                    {renderStarRating(selectedReport.overallRating, "large")}
                  </div>
                </div>

                {/* Skills Assessment */}
                <div className="detail-section">
                  <h3>
                    <FaChartLine className="section-icon" />
                    Skills Assessment
                  </h3>
                  <div className="skills-detailed">
                    {selectedReport.skills.map((skill, index) => (
                      <div key={index} className="skill-detail">
                        <div className="skill-header">
                          <span className="skill-name">{skill.name}</span>
                          {renderStarRating(skill.rating, "small")}
                        </div>
                        {skill.description && (
                          <p className="skill-description">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="detail-section">
                  <h3>
                    <FaCheckCircle className="section-icon" />
                    Performance Metrics
                  </h3>
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <label>Work Quality:</label>
                      {renderStarRating(selectedReport.workQuality, "small")}
                    </div>
                    <div className="metric-item">
                      <label>Attendance:</label>
                      {renderStarRating(selectedReport.attendance, "small")}
                    </div>
                    <div className="metric-item">
                      <label>Initiative:</label>
                      {renderStarRating(selectedReport.initiative, "small")}
                    </div>
                    <div className="metric-item">
                      <label>Teamwork:</label>
                      {renderStarRating(selectedReport.teamwork, "small")}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="detail-section">
                  <h3>
                    <FaAward className="section-icon" />
                    Achievements
                  </h3>
                  <p className="detail-text">{selectedReport.achievements}</p>
                </div>

                {/* Areas for Improvement */}
                <div className="detail-section">
                  <h3>
                    <FaExclamationTriangle className="section-icon" />
                    Areas for Improvement
                  </h3>
                  <p className="detail-text">
                    {selectedReport.areasForImprovement}
                  </p>
                </div>

                {/* Feedback */}
                <div className="detail-section">
                  <h3>
                    <FaComments className="section-icon" />
                    Supervisor Feedback
                  </h3>
                  <p className="detail-text">{selectedReport.feedback}</p>
                </div>

                {/* Additional Comments */}
                {selectedReport.additionalComments && (
                  <div className="detail-section">
                    <h3>
                      <FaFileAlt className="section-icon" />
                      Additional Comments
                    </h3>
                    <p className="detail-text">
                      {selectedReport.additionalComments}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={closeReportModal}
              >
                Close
              </button>
              <button type="button" className="btn-primary">
                <FaDownload className="btn-icon" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinatorReportsPage;
