import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaBuilding,
  FaStar,
  FaFileUpload,
  FaSave,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaChevronDown,
  FaSpinner,
  FaClipboardCheck,
  FaTimes,
  FaSearch,
  FaUserGraduate,
  FaBriefcase,
  FaUniversity,
  FaCalendarCheck,
} from "react-icons/fa";

interface Intern {
  id: number;
  name: string;
  email: string;
  company: string;
  department: string;
  position: string;
  startDate: string;
  endDate: string;
  profileImage: string;
  lastReportMonth?: string;
  reportStatus?: "submitted" | "pending" | "overdue";
}

interface SkillRating {
  name: string;
  rating: number;
  description?: string;
}

interface MonthlyReport {
  internId: number;
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
  attachments?: File[];
}

const SupervisorReportSubmissionPage: React.FC = () => {
  // State management
  const [currentUser] = useState({
    name: "Dr. Kumara Jayasuriya",
    avatar: "K",
    role: "Academic Supervisor",
    department: "Computer Science",
  });

  const [interns] = useState<Intern[]>([
    {
      id: 1,
      name: "Erandi Katugampala",
      email: "erandi.k@example.com",
      company: "Tech Solutions Ltd.",
      department: "Software Engineering",
      position: "Software Engineering Intern",
      startDate: "Jan 15, 2025",
      endDate: "Jul 15, 2025",
      profileImage: "E",
      lastReportMonth: "April 2025",
      reportStatus: "submitted",
    },
    {
      id: 2,
      name: "Dineth Gunawardena",
      email: "dineth.g@example.com",
      company: "CreativeTech Solutions",
      department: "Design",
      position: "UI/UX Design Intern",
      startDate: "Jan 15, 2025",
      endDate: "Jul 15, 2025",
      profileImage: "D",
      lastReportMonth: "March 2025",
      reportStatus: "pending",
    },
    {
      id: 3,
      name: "Thilini Perera",
      email: "thilini.p@example.com",
      company: "DataTech Corp",
      department: "Data Science",
      position: "Data Science Intern",
      startDate: "Jan 15, 2025",
      endDate: "Jul 15, 2025",
      profileImage: "T",
      lastReportMonth: "April 2025",
      reportStatus: "submitted",
    },
  ]);

  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showInternDropdown, setShowInternDropdown] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // Form fields
  const [formData, setFormData] = useState<MonthlyReport>({
    internId: 0,
    month: "",
    year: new Date().getFullYear(),
    submissionDate: new Date().toISOString().split("T")[0],
    overallRating: 0,
    skills: [
      { name: "Technical Knowledge", rating: 0, description: "" },
      { name: "Communication", rating: 0, description: "" },
      { name: "Problem Solving", rating: 0, description: "" },
      { name: "Team Collaboration", rating: 0, description: "" },
      { name: "Time Management", rating: 0, description: "" },
      { name: "Learning Ability", rating: 0, description: "" },
    ],
    achievements: "",
    areasForImprovement: "",
    feedback: "",
    additionalComments: "",
    workQuality: 0,
    attendance: 0,
    initiative: 0,
    teamwork: 0,
    attachments: [],
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

  // Generate months for dropdown
  const generateMonths = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months;
  };

  // Filter interns based on search
  const filteredInterns = interns.filter(
    (intern) =>
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle intern selection
  const handleInternSelect = (intern: Intern) => {
    setSelectedIntern(intern);
    setShowInternDropdown(false);
    setFormData({ ...formData, internId: intern.id });
  };

  // Handle skill rating change
  const handleSkillRating = (index: number, rating: number) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index].rating = rating;
    setFormData({ ...formData, skills: updatedSkills });
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachedFiles([...attachedFiles, ...files]);
    }
  };

  // Remove attached file
  const removeFile = (index: number) => {
    const updatedFiles = attachedFiles.filter((_, i) => i !== index);
    setAttachedFiles(updatedFiles);
  };

  // Calculate overall rating
  const calculateOverallRating = () => {
    const skillRatings = formData.skills.map((s) => s.rating);
    const otherRatings = [
      formData.workQuality,
      formData.attendance,
      formData.initiative,
      formData.teamwork,
    ];
    const allRatings = [...skillRatings, ...otherRatings].filter((r) => r > 0);

    if (allRatings.length === 0) return 0;

    const average =
      allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;
    return Math.round(average * 10) / 10;
  };

  // Update overall rating when ratings change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      overallRating: calculateOverallRating(),
    }));
  }, [
    formData.skills,
    formData.workQuality,
    formData.attendance,
    formData.initiative,
    formData.teamwork,
  ]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedIntern || !selectedMonth) {
      alert("Please select an intern and month");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessMessage(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        resetForm();
      }, 3000);
    }, 2000);
  };

  // Reset form
  const resetForm = () => {
    setSelectedIntern(null);
    setSelectedMonth("");
    setFormData({
      internId: 0,
      month: "",
      year: new Date().getFullYear(),
      submissionDate: new Date().toISOString().split("T")[0],
      overallRating: 0,
      skills: [
        { name: "Technical Knowledge", rating: 0, description: "" },
        { name: "Communication", rating: 0, description: "" },
        { name: "Problem Solving", rating: 0, description: "" },
        { name: "Team Collaboration", rating: 0, description: "" },
        { name: "Time Management", rating: 0, description: "" },
        { name: "Learning Ability", rating: 0, description: "" },
      ],
      achievements: "",
      areasForImprovement: "",
      feedback: "",
      additionalComments: "",
      workQuality: 0,
      attendance: 0,
      initiative: 0,
      teamwork: 0,
      attachments: [],
    });
    setAttachedFiles([]);
  };

  // Render star rating
  const renderStarRating = (
    rating: number,
    onChange: (rating: number) => void
  ) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${star <= rating ? "active" : ""}`}
            onClick={() => onChange(star)}
          >
            <FaStar />
          </button>
        ))}
        <span className="rating-value">
          {rating > 0 ? `${rating}.0` : "Not rated"}
        </span>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {/* Main Content */}
      <div className="dashboard__main supervisor-report-submission-page">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="report-submission-title">
              Monthly Report Submission
            </h1>
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

        {/* Info Box */}
        <div className="info-box">
          <FaInfoCircle className="info-box-icon" />
          <div className="info-box-content">
            <h3>Monthly Evaluation Reports</h3>
            <p>
              Submit comprehensive monthly evaluation reports for your assigned
              interns. These reports track their progress, skills development,
              and overall performance during their internship period.
            </p>
          </div>
        </div>

        {/* Report Form */}
        <form className="report-submission-form" onSubmit={handleSubmit}>
          {/* Intern Selection Section */}
          <div className="form-section intern-selection-section">
            <div className="section-header">
              <h2>
                <FaUserGraduate className="section-icon" />
                Select Intern
              </h2>
            </div>

            <div className="intern-selector">
              <div className="custom-dropdown">
                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={() => setShowInternDropdown(!showInternDropdown)}
                >
                  {selectedIntern ? (
                    <div className="selected-intern-display">
                      <div className="intern-avatar">
                        {selectedIntern.profileImage}
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
                    <span className="placeholder">Select an intern...</span>
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
                      />
                    </div>
                    <div className="dropdown-options">
                      {filteredInterns.map((intern) => (
                        <button
                          key={intern.id}
                          type="button"
                          className="intern-option"
                          onClick={() => handleInternSelect(intern)}
                        >
                          <div className="intern-avatar">
                            {intern.profileImage}
                          </div>
                          <div className="intern-details">
                            <div className="intern-name">{intern.name}</div>
                            <div className="intern-meta">
                              <span className="company">{intern.company}</span>
                              <span
                                className="status-badge"
                                data-status={intern.reportStatus}
                              >
                                {intern.reportStatus === "submitted"
                                  ? "Last report: " + intern.lastReportMonth
                                  : intern.reportStatus === "pending"
                                  ? "Report pending"
                                  : "Report overdue"}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedIntern && (
                <div className="selected-intern-details">
                  <div className="detail-item">
                    <FaBriefcase className="detail-icon" />
                    <span>{selectedIntern.position}</span>
                  </div>
                  <div className="detail-item">
                    <FaBuilding className="detail-icon" />
                    <span>{selectedIntern.department}</span>
                  </div>
                  <div className="detail-item">
                    <FaCalendarCheck className="detail-icon" />
                    <span>
                      {selectedIntern.startDate} - {selectedIntern.endDate}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Report Period Section */}
          <div className="form-section period-section">
            <div className="section-header">
              <h2>
                <FaCalendarAlt className="section-icon" />
                Report Period
              </h2>
            </div>

            <div className="period-selector">
              <div className="form-group">
                <label>Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setFormData({ ...formData, month: e.target.value });
                  }}
                  required
                >
                  <option value="">Select month...</option>
                  {generateMonths().map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(Number(e.target.value));
                    setFormData({ ...formData, year: Number(e.target.value) });
                  }}
                  required
                >
                  <option value={2025}>2025</option>
                  <option value={2024}>2024</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills Assessment Section */}
          <div className="form-section skills-section">
            <div className="section-header">
              <h2>
                <FaStar className="section-icon" />
                Skills Assessment
              </h2>
              <p className="section-subtitle">
                Rate the intern's performance in each skill area
              </p>
            </div>

            <div className="skills-grid">
              {formData.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <label className="skill-name">{skill.name}</label>
                    {renderStarRating(skill.rating, (rating) =>
                      handleSkillRating(index, rating)
                    )}
                  </div>
                  <textarea
                    className="skill-notes"
                    placeholder="Optional notes about this skill..."
                    value={skill.description}
                    onChange={(e) => {
                      const updatedSkills = [...formData.skills];
                      updatedSkills[index].description = e.target.value;
                      setFormData({ ...formData, skills: updatedSkills });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics Section */}
          <div className="form-section metrics-section">
            <div className="section-header">
              <h2>
                <FaClipboardCheck className="section-icon" />
                Performance Metrics
              </h2>
            </div>

            <div className="metrics-grid">
              <div className="metric-item">
                <label>Work Quality</label>
                {renderStarRating(formData.workQuality, (rating) =>
                  setFormData({ ...formData, workQuality: rating })
                )}
              </div>
              <div className="metric-item">
                <label>Attendance & Punctuality</label>
                {renderStarRating(formData.attendance, (rating) =>
                  setFormData({ ...formData, attendance: rating })
                )}
              </div>
              <div className="metric-item">
                <label>Initiative & Proactiveness</label>
                {renderStarRating(formData.initiative, (rating) =>
                  setFormData({ ...formData, initiative: rating })
                )}
              </div>
              <div className="metric-item">
                <label>Teamwork & Collaboration</label>
                {renderStarRating(formData.teamwork, (rating) =>
                  setFormData({ ...formData, teamwork: rating })
                )}
              </div>
            </div>

            <div className="overall-rating-display">
              <div className="rating-label">Overall Rating</div>
              <div className="rating-value-large">
                {formData.overallRating > 0 ? (
                  <>
                    <span className="rating-number">
                      {formData.overallRating}
                    </span>
                    <span className="rating-total">/5.0</span>
                  </>
                ) : (
                  <span className="no-rating">Not calculated</span>
                )}
              </div>
            </div>
          </div>

          {/* Written Feedback Section */}
          <div className="form-section feedback-section">
            <div className="section-header">
              <h2>
                <FaClipboardCheck className="section-icon" />
                Written Evaluation
              </h2>
            </div>

            <div className="feedback-fields">
              <div className="form-group">
                <label>
                  Key Achievements
                  <span className="required">*</span>
                </label>
                <textarea
                  placeholder="Describe the intern's major accomplishments this month..."
                  value={formData.achievements}
                  onChange={(e) =>
                    setFormData({ ...formData, achievements: e.target.value })
                  }
                  required
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>
                  Areas for Improvement
                  <span className="required">*</span>
                </label>
                <textarea
                  placeholder="Identify areas where the intern can improve..."
                  value={formData.areasForImprovement}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      areasForImprovement: e.target.value,
                    })
                  }
                  required
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>
                  Supervisor Feedback
                  <span className="required">*</span>
                </label>
                <textarea
                  placeholder="Provide constructive feedback for the intern's development..."
                  value={formData.feedback}
                  onChange={(e) =>
                    setFormData({ ...formData, feedback: e.target.value })
                  }
                  required
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>Additional Comments</label>
                <textarea
                  placeholder="Any other observations or recommendations..."
                  value={formData.additionalComments}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalComments: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* File Attachments Section */}
          <div className="form-section attachments-section">
            <div className="section-header">
              <h2>
                <FaFileUpload className="section-icon" />
                Supporting Documents
              </h2>
              <p className="section-subtitle">
                Attach any relevant documents (optional)
              </p>
            </div>

            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                className="file-input"
              />
              <label htmlFor="file-upload" className="upload-label">
                <FaFileUpload className="upload-icon" />
                <span>Click to upload or drag and drop</span>
                <span className="file-types">
                  PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
                </span>
              </label>
            </div>

            {attachedFiles.length > 0 && (
              <div className="attached-files">
                {attachedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <button
                      type="button"
                      className="remove-file"
                      onClick={() => removeFile(index)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Section */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || !selectedIntern || !selectedMonth}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaSave />
                  Submit Report
                </>
              )}
            </button>
          </div>
        </form>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-overlay">
            <div className="success-message">
              <FaCheckCircle className="success-icon" />
              <h3>Report Submitted Successfully!</h3>
              <p>The monthly evaluation report has been submitted.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorReportSubmissionPage;
