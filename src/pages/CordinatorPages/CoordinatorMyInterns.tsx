import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaCalendarAlt,
  FaEye,
  FaFilter,
  FaSearch,
  FaSort,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUsers,
  FaBuilding,
  FaTimes,
  FaIdCard,
  FaUniversity,
  FaIndustry,
  FaChartLine,
  FaFileAlt,
} from "react-icons/fa";
import mockInternsData from "../../data/mockInternsData.json";

interface InternData {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  faculty: string;
  degree: string;
  year: string;
  department: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "on-break";
  profileImage: string;
  progress: number;
  location: string;
  company: string;
  companyAddress: string;
  industrySector: string;
  internshipTitle: string;
  supervisor: {
    academic: string;
    industry: string;
  };
  lastActivity: string;
  studentId: string;
  gpa: number;
  workMode: string;
  compensationType: string;
  compensationDetails: string;
  hoursPerWeek: number;
  evaluationStatus: string;
  reportsSubmitted: number;
  totalReports: number;
  skills: string[];
  languages: string[];
  linkedinUrl: string;
  portfolioUrl: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  academicTranscripts: boolean;
  medicalClearance: boolean;
  policeClearance: boolean;
  tags: string[];
}

const CoordinatorMyInterns: React.FC = () => {
  const navigate = useNavigate();
  const [interns, setInterns] = useState<InternData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [startDateFrom, setStartDateFrom] = useState("");
  const [endDateTo, setEndDateTo] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<InternData | null>(null);

  // Load mock data on component mount
  useEffect(() => {
    setInterns(mockInternsData as InternData[]);
  }, []);

  // Filter and sort interns
  const filteredInterns = interns
    .filter((intern) => {
      const matchesSearch =
        intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || intern.status === filterStatus;

      const matchesStartDate =
        !startDateFrom || new Date(intern.startDate) >= new Date(startDateFrom);

      const matchesEndDate =
        !endDateTo || new Date(intern.endDate) <= new Date(endDateTo);

      return (
        matchesSearch && matchesStatus && matchesStartDate && matchesEndDate
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "progress":
          return b.progress - a.progress;
        case "startDate":
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        case "company":
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "success", icon: FaCheckCircle, text: "Active" },
      completed: { color: "primary", icon: FaCheckCircle, text: "Completed" },
      "on-break": {
        color: "warning",
        icon: FaExclamationTriangle,
        text: "On Break",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;

    return (
      <span className={`status-badge status-badge--${config.color}`}>
        <IconComponent className="status-badge__icon" />
        {config.text}
      </span>
    );
  };

  const handleInternClick = (internId: string) => {
    navigate(`/coordinator/intern-profile/${internId}?menu=my-interns`);
  };

  const handleViewProfile = (intern: InternData, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIntern(intern);
    setShowProfileModal(true);
  };

  const closeModal = () => {
    setShowProfileModal(false);
    setSelectedIntern(null);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "success";
    if (progress >= 50) return "primary";
    if (progress >= 25) return "warning";
    return "danger";
  };

  return (
    <div className="dashboard">
      <div className="dashboard__main">
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1>My Interns</h1>
            <p>Monitor and manage interns in your department</p>
          </div>
          <div className="dashboard__header-right"></div>
        </div>

        <div className="my-interns">
          <div className="my-interns__controls">
            <div className="search-bar">
              <FaSearch className="search-bar__icon" />
              <input
                type="text"
                placeholder="Search interns by name, email, degree, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar__input"
              />
            </div>

            <div className="filter-controls">
              <div className="filter-group">
                <FaFilter className="filter-icon" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-break">On Break</option>
                </select>
              </div>

              <div className="filter-group">
                <FaSort className="filter-icon" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="name">Sort by Name</option>
                  <option value="progress">Sort by Progress</option>
                  <option value="startDate">Sort by Start Date</option>
                  <option value="company">Sort by Company</option>
                </select>
              </div>

              <div className="date-filters">
                <div className="date-filter-group">
                  <div>
                    <FaCalendarAlt className="filter-icon" />
                    <label>Start Date From:</label>
                    <input
                      type="date"
                      value={startDateFrom}
                      onChange={(e) => setStartDateFrom(e.target.value)}
                      className="date-input"
                    />
                  </div>
                </div>
                <div className="date-filter-group">
                  <FaCalendarAlt className="filter-icon" />
                  <div>
                    <label>End Date To:</label>
                    <input
                      type="date"
                      value={endDateTo}
                      onChange={(e) => setEndDateTo(e.target.value)}
                      className="date-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="interns-grid">
            {filteredInterns.map((intern) => (
              <div
                key={intern.id}
                className="intern-card"
                onClick={() => handleInternClick(intern.id)}
              >
                <div className="intern-card__header">
                  <div className="intern-card__avatar">
                    <img src={intern.profileImage} alt={intern.name} />
                    <div
                      className={`intern-card__status-dot intern-card__status-dot--${intern.status}`}
                    ></div>
                  </div>
                  <div className="intern-card__basic">
                    <h3 className="intern-card__name">{intern.name}</h3>
                    <p className="intern-card__degree">{intern.degree}</p>
                    {getStatusBadge(intern.status)}
                  </div>
                </div>

                <div className="intern-card__details">
                  <div className="detail-row">
                    <FaEnvelope className="detail-icon" />
                    <span className="detail-text">{intern.email}</span>
                  </div>
                  <div className="detail-row">
                    <FaPhone className="detail-icon" />
                    <span className="detail-text">{intern.phone}</span>
                  </div>
                  <div className="detail-row">
                    <FaGraduationCap className="detail-icon" />
                    <span className="detail-text">
                      {intern.year} • {intern.department}
                    </span>
                  </div>
                  <div className="detail-row">
                    <FaBuilding className="detail-icon" />
                    <span className="detail-text">{intern.company}</span>
                  </div>
                  <div className="detail-row">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span className="detail-text">{intern.location}</span>
                  </div>
                  <div className="detail-row">
                    <FaCalendarAlt className="detail-icon" />
                    <span className="detail-text">
                      {new Date(intern.startDate).toLocaleDateString()} -{" "}
                      {new Date(intern.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <FaClock className="detail-icon" />
                    <span className="detail-text">
                      Last active: {intern.lastActivity}
                    </span>
                  </div>
                </div>

                <div className="intern-card__progress">
                  <div className="progress-header">
                    <span className="progress-label">Progress</span>
                    <span className="progress-percentage">
                      {intern.progress}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill progress-fill--${getProgressColor(
                        intern.progress
                      )}`}
                      style={{ width: `${intern.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="intern-card__actions">
                  <button
                    className="action-btn action-btn--primary"
                    onClick={(e) => handleViewProfile(intern, e)}
                  >
                    <FaEye className="action-btn__icon" />
                    View Profile
                  </button>
                  <button
                    className="action-btn action-btn--secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/coordinator/messages?contact=${intern.id}`);
                    }}
                  >
                    <FaEnvelope className="action-btn__icon" />
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredInterns.length === 0 && (
            <div className="empty-state">
              <FaUsers className="empty-state__icon" />
              <h3 className="empty-state__title">No interns found</h3>
              <p className="empty-state__message">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedIntern && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Intern Profile Details</h3>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img
                    src={selectedIntern.profileImage}
                    alt={selectedIntern.name}
                  />
                  <div
                    className={`status-dot status-dot--${selectedIntern.status}`}
                  ></div>
                </div>
                <div className="profile-basic">
                  <h2>{selectedIntern.name}</h2>
                  <p className="profile-title">
                    {selectedIntern.internshipTitle}
                  </p>
                  {getStatusBadge(selectedIntern.status)}
                </div>
              </div>

              <div className="profile-sections">
                <div className="profile-section">
                  <h4>
                    <FaIdCard /> Personal Information
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <FaEnvelope className="info-icon" />
                      <span>{selectedIntern.email}</span>
                    </div>
                    <div className="info-item">
                      <FaPhone className="info-icon" />
                      <span>{selectedIntern.phone}</span>
                    </div>
                    <div className="info-item">
                      <FaMapMarkerAlt className="info-icon" />
                      <span>{selectedIntern.location}</span>
                    </div>
                  </div>
                </div>

                <div className="profile-section">
                  <h4>
                    <FaUniversity /> Academic Information
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <FaGraduationCap className="info-icon" />
                      <span>{selectedIntern.degree}</span>
                    </div>
                    <div className="info-item">
                      <FaBuilding className="info-icon" />
                      <span>{selectedIntern.department}</span>
                    </div>
                    <div className="info-item">
                      <FaChartLine className="info-icon" />
                      <span>GPA: {selectedIntern.gpa}</span>
                    </div>
                  </div>
                </div>

                <div className="profile-section">
                  <h4>
                    <FaIndustry /> Internship Details
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <FaBuilding className="info-icon" />
                      <span>{selectedIntern.company}</span>
                    </div>
                    <div className="info-item">
                      <FaCalendarAlt className="info-icon" />
                      <span>
                        {new Date(
                          selectedIntern.startDate
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(selectedIntern.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="info-item">
                      <FaClock className="info-icon" />
                      <span>{selectedIntern.hoursPerWeek} hours/week</span>
                    </div>
                  </div>
                </div>

                <div className="profile-section">
                  <h4>
                    <FaFileAlt /> Progress & Reports
                  </h4>
                  <div className="progress-info">
                    <div className="progress-header">
                      <span className="progress-label">Overall Progress</span>
                      <span className="progress-percentage">
                        {selectedIntern.progress}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill progress-fill--${getProgressColor(
                          selectedIntern.progress
                        )}`}
                        style={{ width: `${selectedIntern.progress}%` }}
                      ></div>
                    </div>
                    <div className="reports-info">
                      <span>
                        Reports: {selectedIntern.reportsSubmitted}/
                        {selectedIntern.totalReports}
                      </span>
                      <span>Evaluation: {selectedIntern.evaluationStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn--primary"
                onClick={() => {
                  closeModal();
                  handleInternClick(selectedIntern.id);
                }}
              >
                View Full Profile
              </button>
              <button className="btn btn--secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinatorMyInterns;
