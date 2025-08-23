import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
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
  FaDownload,
  FaTimes,
  FaChevronDown,
  FaUniversity,
  FaBriefcase,
  FaChartLine,
  FaFileAlt,
  FaUserTie,
  FaMoneyBillWave,
  FaLaptopCode,
  FaIdBadge,
  FaLinkedin,
  FaGlobe,
  FaLanguage,
  FaExclamationCircle,
  FaCheck,
  FaHistory,
  FaStar,
} from "react-icons/fa";
import CoordinatorSideMenu from "../../components/CoordinatorSideMenu";
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
  const [filteredInterns, setFilteredInterns] = useState<InternData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<InternData | null>(null);
  const [showInternModal, setShowInternModal] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    status: "all",
    faculty: "all",
    department: "all",
    year: "all",
    workMode: "all",
    compensationType: "all",
    evaluationStatus: "all",
    company: "all",
    industrySector: "all",
    progressMin: 0,
    progressMax: 100,
    gpaMin: 0,
    gpaMax: 4.0,
    skills: [] as string[],
    tags: [] as string[],
    supervisor: "",
    startDateFrom: "",
    startDateTo: "",
    endDateFrom: "",
    endDateTo: "",
    documentsComplete: "all",
  });

  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Load mock data on component mount
  useEffect(() => {
    setInterns(mockInternsData as InternData[]);
    setFilteredInterns(mockInternsData as InternData[]);
  }, []);

  // Get unique values for filter dropdowns
  const getUniqueValues = (key: keyof InternData | string) => {
    const values = new Set<string>();
    interns.forEach((intern) => {
      if (key.includes(".")) {
        const keys = key.split(".");
        let value: any = intern;
        for (const k of keys) {
          value = value[k];
        }
        if (value) values.add(value);
      } else {
        const value = intern[key as keyof InternData];
        if (value && typeof value === "string") values.add(value);
      }
    });
    return Array.from(values).sort();
  };

  // Get all unique skills and tags
  const getAllSkills = () => {
    const skills = new Set<string>();
    interns.forEach((intern) =>
      intern.skills.forEach((skill) => skills.add(skill))
    );
    return Array.from(skills).sort();
  };

  const getAllTags = () => {
    const tags = new Set<string>();
    interns.forEach((intern) => intern.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...interns];

    // Text search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (intern) =>
          intern.name.toLowerCase().includes(searchLower) ||
          intern.email.toLowerCase().includes(searchLower) ||
          intern.studentId.toLowerCase().includes(searchLower) ||
          intern.degree.toLowerCase().includes(searchLower) ||
          intern.company.toLowerCase().includes(searchLower) ||
          intern.department.toLowerCase().includes(searchLower) ||
          intern.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower)
          ) ||
          intern.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply filters
    if (filters.status !== "all") {
      result = result.filter((intern) => intern.status === filters.status);
    }

    if (filters.faculty !== "all") {
      result = result.filter((intern) => intern.faculty === filters.faculty);
    }

    if (filters.department !== "all") {
      result = result.filter(
        (intern) => intern.department === filters.department
      );
    }

    if (filters.year !== "all") {
      result = result.filter((intern) => intern.year === filters.year);
    }

    if (filters.workMode !== "all") {
      result = result.filter((intern) => intern.workMode === filters.workMode);
    }

    if (filters.compensationType !== "all") {
      result = result.filter(
        (intern) => intern.compensationType === filters.compensationType
      );
    }

    if (filters.evaluationStatus !== "all") {
      result = result.filter(
        (intern) => intern.evaluationStatus === filters.evaluationStatus
      );
    }

    if (filters.company !== "all") {
      result = result.filter((intern) => intern.company === filters.company);
    }

    if (filters.industrySector !== "all") {
      result = result.filter(
        (intern) => intern.industrySector === filters.industrySector
      );
    }

    // Progress filter
    result = result.filter(
      (intern) =>
        intern.progress >= filters.progressMin &&
        intern.progress <= filters.progressMax
    );

    // GPA filter
    result = result.filter(
      (intern) => intern.gpa >= filters.gpaMin && intern.gpa <= filters.gpaMax
    );

    // Skills filter
    if (filters.skills.length > 0) {
      result = result.filter((intern) =>
        filters.skills.every((skill) => intern.skills.includes(skill))
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      result = result.filter((intern) =>
        filters.tags.some((tag) => intern.tags.includes(tag))
      );
    }

    // Supervisor filter
    if (filters.supervisor) {
      const supervisorLower = filters.supervisor.toLowerCase();
      result = result.filter(
        (intern) =>
          intern.supervisor.academic.toLowerCase().includes(supervisorLower) ||
          intern.supervisor.industry.toLowerCase().includes(supervisorLower)
      );
    }

    // Date filters
    if (filters.startDateFrom) {
      result = result.filter(
        (intern) =>
          new Date(intern.startDate) >= new Date(filters.startDateFrom)
      );
    }

    if (filters.startDateTo) {
      result = result.filter(
        (intern) => new Date(intern.startDate) <= new Date(filters.startDateTo)
      );
    }

    if (filters.endDateFrom) {
      result = result.filter(
        (intern) => new Date(intern.endDate) >= new Date(filters.endDateFrom)
      );
    }

    if (filters.endDateTo) {
      result = result.filter(
        (intern) => new Date(intern.endDate) <= new Date(filters.endDateTo)
      );
    }

    // Documents filter
    if (filters.documentsComplete === "complete") {
      result = result.filter(
        (intern) =>
          intern.academicTranscripts &&
          intern.medicalClearance &&
          intern.policeClearance
      );
    } else if (filters.documentsComplete === "incomplete") {
      result = result.filter(
        (intern) =>
          !intern.academicTranscripts ||
          !intern.medicalClearance ||
          !intern.policeClearance
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: any = a[sortBy as keyof InternData];
      let bValue: any = b[sortBy as keyof InternData];

      if (sortBy === "supervisor") {
        aValue = a.supervisor.academic;
        bValue = b.supervisor.academic;
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredInterns(result);
  }, [searchTerm, filters, sortBy, sortOrder, interns]);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: "all",
      faculty: "all",
      department: "all",
      year: "all",
      workMode: "all",
      compensationType: "all",
      evaluationStatus: "all",
      company: "all",
      industrySector: "all",
      progressMin: 0,
      progressMax: 100,
      gpaMin: 0,
      gpaMax: 4.0,
      skills: [],
      tags: [],
      supervisor: "",
      startDateFrom: "",
      startDateTo: "",
      endDateFrom: "",
      endDateTo: "",
      documentsComplete: "all",
    });
    setSearchTerm("");
  };

  // View intern details
  const handleViewIntern = (intern: InternData) => {
    setSelectedIntern(intern);
    setShowInternModal(true);
  };

  // Export data
  const exportData = () => {
    const csvContent = [
      // Headers
      [
        "ID",
        "Name",
        "Email",
        "Student ID",
        "University",
        "Faculty",
        "Department",
        "Year",
        "GPA",
        "Company",
        "Status",
        "Progress",
        "Academic Supervisor",
        "Industry Supervisor",
      ],
      // Data
      ...filteredInterns.map((intern) => [
        intern.id,
        intern.name,
        intern.email,
        intern.studentId,
        intern.university,
        intern.faculty,
        intern.department,
        intern.year,
        intern.gpa,
        intern.company,
        intern.status,
        intern.progress + "%",
        intern.supervisor.academic,
        intern.supervisor.industry,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `interns_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

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
            <p>Manage and monitor all interns across the university</p>
          </div>
          <div className="dashboard__stats">
            <div className="stat-card stat-card--primary">
              <FaUsers className="stat-card__icon" />
              <div className="stat-card__content">
                <span className="stat-card__label">Total Interns</span>
                <span className="stat-card__value">{interns.length}</span>
              </div>
            </div>
            <div className="stat-card stat-card--success">
              <FaCheckCircle className="stat-card__icon" />
              <div className="stat-card__content">
                <span className="stat-card__label">Active</span>
                <span className="stat-card__value">
                  {interns.filter((i) => i.status === "active").length}
                </span>
              </div>
            </div>
            <div className="stat-card stat-card--info">
              <FaChartLine className="stat-card__icon" />
              <div className="stat-card__content">
                <span className="stat-card__label">Avg Progress</span>
                <span className="stat-card__value">
                  {Math.round(
                    interns.reduce((sum, i) => sum + i.progress, 0) /
                      interns.length
                  )}
                  %
                </span>
              </div>
            </div>
            <div className="stat-card stat-card--warning">
              <FaExclamationTriangle className="stat-card__icon" />
              <div className="stat-card__content">
                <span className="stat-card__label">Needs Attention</span>
                <span className="stat-card__value">
                  {
                    interns.filter(
                      (i) => i.progress < 30 || i.evaluationStatus === "pending"
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="coordinator-interns">
          <div className="coordinator-interns__controls">
            {/* Search bar */}
            <div className="search-section">
              <div className="search-bar">
                <FaSearch className="search-bar__icon" />
                <input
                  type="text"
                  placeholder="Search by name, email, student ID, company, skills, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-bar__input"
                />
                {searchTerm && (
                  <button
                    className="search-bar__clear"
                    onClick={() => setSearchTerm("")}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              <button
                className="filter-toggle-btn"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <FaFilter />
                Advanced Filters
                <FaChevronDown
                  className={`chevron ${showAdvancedFilters ? "open" : ""}`}
                />
              </button>
            </div>

            {/* Quick actions */}
            <div className="quick-actions">
              <button
                className="action-btn action-btn--primary"
                onClick={exportData}
              >
                <FaDownload /> Export Data
              </button>
              <button
                className="action-btn action-btn--secondary"
                onClick={resetFilters}
              >
                <FaTimes /> Clear Filters
              </button>
            </div>
          </div>

          {/* Advanced filters panel */}
          {showAdvancedFilters && (
            <div className="advanced-filters">
              <div className="filters-grid">
                {/* Row 1 */}
                <div className="filter-group">
                  <label>GPA Range</label>
                  <div className="range-inputs">
                    <input
                      type="number"
                      min="0"
                      max="4"
                      step="0.1"
                      value={filters.gpaMin}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          gpaMin: Number(e.target.value),
                        })
                      }
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      step="0.1"
                      value={filters.gpaMax}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          gpaMax: Number(e.target.value),
                        })
                      }
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div className="filter-group">
                  <label>Documents</label>
                  <select
                    value={filters.documentsComplete}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        documentsComplete: e.target.value,
                      })
                    }
                  >
                    <option value="all">All</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>

                {/* Row 4 - Full width items */}
                <div className="filter-group filter-group--full">
                  <label>Supervisor Name</label>
                  <input
                    type="text"
                    placeholder="Search by academic or industry supervisor..."
                    value={filters.supervisor}
                    onChange={(e) =>
                      setFilters({ ...filters, supervisor: e.target.value })
                    }
                  />
                </div>

                {/* Skills filter */}
                <div className="filter-group filter-group--full">
                  <label>Skills</label>
                  <div className="multi-select">
                    {getAllSkills().map((skill) => (
                      <label key={skill} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.skills.includes(skill)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                skills: [...filters.skills, skill],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                skills: filters.skills.filter(
                                  (s) => s !== skill
                                ),
                              });
                            }
                          }}
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags filter */}
                <div className="filter-group filter-group--full">
                  <label>Tags</label>
                  <div className="multi-select">
                    {getAllTags().map((tag) => (
                      <label key={tag} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.tags.includes(tag)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                tags: [...filters.tags, tag],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                tags: filters.tags.filter((t) => t !== tag),
                              });
                            }
                          }}
                        />
                        <span>{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date range filters */}
                <div className="filter-group filter-group--half">
                  <label>Start Date Range</label>
                  <div className="date-inputs">
                    <input
                      type="date"
                      value={filters.startDateFrom}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          startDateFrom: e.target.value,
                        })
                      }
                    />
                    <span>to</span>
                    <input
                      type="date"
                      value={filters.startDateTo}
                      onChange={(e) =>
                        setFilters({ ...filters, startDateTo: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="filter-group filter-group--half">
                  <label>End Date Range</label>
                  <div className="date-inputs">
                    <input
                      type="date"
                      value={filters.endDateFrom}
                      onChange={(e) =>
                        setFilters({ ...filters, endDateFrom: e.target.value })
                      }
                    />
                    <span>to</span>
                    <input
                      type="date"
                      value={filters.endDateTo}
                      onChange={(e) =>
                        setFilters({ ...filters, endDateTo: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sort controls */}
          <div className="sort-controls">
            <div className="results-info">
              Showing <strong>{filteredInterns.length}</strong> of{" "}
              <strong>{interns.length}</strong> interns
            </div>
            <div className="sort-options">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="studentId">Student ID</option>
                <option value="progress">Progress</option>
                <option value="gpa">GPA</option>
                <option value="startDate">Start Date</option>
                <option value="company">Company</option>
                <option value="department">Department</option>
                <option value="supervisor">Supervisor</option>
              </select>
              <button
                className="sort-order-btn"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>

          {/* Interns grid */}
          <div className="interns-grid">
            {filteredInterns.map((intern) => (
              <div key={intern.id} className="intern-card">
                <div className="intern-card__header">
                  <div className="intern-card__avatar">
                    {intern.profileImage ? (
                      <img src={intern.profileImage} alt={intern.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {intern.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div className="intern-card__basic">
                    <h3 className="intern-card__name">{intern.name}</h3>
                    <p className="intern-card__id">{intern.studentId}</p>
                    <p className="intern-card__degree">{intern.degree}</p>
                    {getStatusBadge(intern.status)}
                  </div>
                </div>

                <div className="intern-card__details">
                  <div className="detail-row">
                    <FaUniversity className="detail-icon" />
                    <span className="detail-text">{intern.faculty}</span>
                  </div>
                  <div className="detail-row">
                    <FaBuilding className="detail-icon" />
                    <span className="detail-text">{intern.company}</span>
                  </div>
                  <div className="detail-row">
                    <FaBriefcase className="detail-icon" />
                    <span className="detail-text">
                      {intern.internshipTitle}
                    </span>
                  </div>
                  <div className="detail-row">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span className="detail-text">
                      {intern.location} • {intern.workMode}
                    </span>
                  </div>
                  <div className="detail-row">
                    <FaCalendarAlt className="detail-icon" />
                    <span className="detail-text">
                      {new Date(intern.startDate).toLocaleDateString()} -{" "}
                      {new Date(intern.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <FaUserTie className="detail-icon" />
                    <span className="detail-text">
                      Academic: {intern.supervisor.academic}
                    </span>
                  </div>
                  <div className="detail-row">
                    <FaStar className="detail-icon" />
                    <span className="detail-text">GPA: {intern.gpa}</span>
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
                  <div className="progress-info">
                    <span>
                      Reports: {intern.reportsSubmitted}/{intern.totalReports}
                    </span>
                    <span
                      className={`evaluation-status ${intern.evaluationStatus}`}
                    >
                      Evaluation: {intern.evaluationStatus}
                    </span>
                  </div>
                </div>

                <div className="intern-card__skills">
                  {intern.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                  {intern.skills.length > 3 && (
                    <span className="skill-tag more">
                      +{intern.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="intern-card__actions">
                  <button
                    className="action-btn action-btn--primary"
                    onClick={() => handleViewIntern(intern)}
                  >
                    <FaEye className="action-btn__icon" />
                    View Profile
                  </button>
                  <button
                    className="action-btn action-btn--secondary"
                    onClick={() =>
                      navigate(`/coordinator/messages?contact=${intern.id}`)
                    }
                  >
                    <FaEnvelope className="action-btn__icon" />
                    Message
                  </button>
                  <button
                    className="action-btn action-btn--tertiary"
                    onClick={() =>
                      navigate(`/coordinator/evaluation/${intern.id}`)
                    }
                  >
                    <FaFileAlt className="action-btn__icon" />
                    Evaluate
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
              <button className="empty-state__action" onClick={resetFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Intern Details Modal */}
        {showInternModal && selectedIntern && (
          <div
            className="modal-overlay"
            onClick={() => setShowInternModal(false)}
          >
            <div
              className="modal-content intern-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Intern Profile</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowInternModal(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                {/* Profile Header */}
                <div className="profile-header">
                  <div className="profile-avatar">
                    {selectedIntern.profileImage ? (
                      <img
                        src={selectedIntern.profileImage}
                        alt={selectedIntern.name}
                      />
                    ) : (
                      <div className="avatar-placeholder large">
                        {selectedIntern.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div className="profile-info">
                    <h3>{selectedIntern.name}</h3>
                    <p className="student-id">{selectedIntern.studentId}</p>
                    <p className="email">
                      <FaEnvelope /> {selectedIntern.email}
                    </p>
                    <p className="phone">
                      <FaPhone /> {selectedIntern.phone}
                    </p>
                    <div className="profile-badges">
                      {getStatusBadge(selectedIntern.status)}
                      <span
                        className={`badge ${selectedIntern.compensationType.toLowerCase()}`}
                      >
                        {selectedIntern.compensationType}
                      </span>
                      <span className="badge">{selectedIntern.workMode}</span>
                    </div>
                  </div>
                </div>

                {/* Profile Sections */}
                <div className="profile-sections">
                  {/* Academic Information */}
                  <div className="profile-section">
                    <h4>
                      <FaGraduationCap /> Academic Information
                    </h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>University</label>
                        <span>{selectedIntern.university}</span>
                      </div>
                      <div className="info-item">
                        <label>Faculty</label>
                        <span>{selectedIntern.faculty}</span>
                      </div>
                      <div className="info-item">
                        <label>Department</label>
                        <span>{selectedIntern.department}</span>
                      </div>
                      <div className="info-item">
                        <label>Degree Program</label>
                        <span>{selectedIntern.degree}</span>
                      </div>
                      <div className="info-item">
                        <label>Year</label>
                        <span>{selectedIntern.year}</span>
                      </div>
                      <div className="info-item">
                        <label>GPA</label>
                        <span>{selectedIntern.gpa}</span>
                      </div>
                    </div>
                  </div>

                  {/* Internship Information */}
                  <div className="profile-section">
                    <h4>
                      <FaBriefcase /> Internship Information
                    </h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Company</label>
                        <span>{selectedIntern.company}</span>
                      </div>
                      <div className="info-item">
                        <label>Position</label>
                        <span>{selectedIntern.internshipTitle}</span>
                      </div>
                      <div className="info-item">
                        <label>Industry Sector</label>
                        <span>{selectedIntern.industrySector}</span>
                      </div>
                      <div className="info-item">
                        <label>Location</label>
                        <span>{selectedIntern.location}</span>
                      </div>
                      <div className="info-item">
                        <label>Company Address</label>
                        <span>{selectedIntern.companyAddress}</span>
                      </div>
                      <div className="info-item">
                        <label>Work Mode</label>
                        <span>{selectedIntern.workMode}</span>
                      </div>
                      <div className="info-item">
                        <label>Duration</label>
                        <span>
                          {new Date(
                            selectedIntern.startDate
                          ).toLocaleDateString()}{" "}
                          -
                          {new Date(
                            selectedIntern.endDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Hours per Week</label>
                        <span>{selectedIntern.hoursPerWeek}</span>
                      </div>
                      <div className="info-item">
                        <label>Compensation</label>
                        <span>{selectedIntern.compensationDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Supervisors */}
                  <div className="profile-section">
                    <h4>
                      <FaUserTie /> Supervisors
                    </h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Academic Supervisor</label>
                        <span>{selectedIntern.supervisor.academic}</span>
                      </div>
                      <div className="info-item">
                        <label>Industry Supervisor</label>
                        <span>{selectedIntern.supervisor.industry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Languages */}
                  <div className="profile-section">
                    <h4>
                      <FaLaptopCode /> Skills & Languages
                    </h4>
                    <div className="info-item">
                      <label>Technical Skills</label>
                      <div className="tags-list">
                        {selectedIntern.skills.map((skill, index) => (
                          <span key={index} className="tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="info-item">
                      <label>Languages</label>
                      <div className="tags-list">
                        {selectedIntern.languages.map((lang, index) => (
                          <span key={index} className="tag">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress & Reports */}
                  <div className="profile-section">
                    <h4>
                      <FaChartLine /> Progress & Reports
                    </h4>
                    <div className="progress-details">
                      <div className="progress-bar-large">
                        <div className="progress-header">
                          <span>Overall Progress</span>
                          <span className="percentage">
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
                      </div>
                      <div className="info-grid">
                        <div className="info-item">
                          <label>Reports Submitted</label>
                          <span>
                            {selectedIntern.reportsSubmitted} /{" "}
                            {selectedIntern.totalReports}
                          </span>
                        </div>
                        <div className="info-item">
                          <label>Evaluation Status</label>
                          <span
                            className={`status ${selectedIntern.evaluationStatus}`}
                          >
                            {selectedIntern.evaluationStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="profile-section">
                    <h4>
                      <FaFileAlt /> Documents
                    </h4>
                    <div className="documents-list">
                      <div
                        className={`document-item ${
                          selectedIntern.academicTranscripts
                            ? "complete"
                            : "incomplete"
                        }`}
                      >
                        {selectedIntern.academicTranscripts ? (
                          <FaCheck />
                        ) : (
                          <FaTimes />
                        )}
                        <span>Academic Transcripts</span>
                      </div>
                      <div
                        className={`document-item ${
                          selectedIntern.medicalClearance
                            ? "complete"
                            : "incomplete"
                        }`}
                      >
                        {selectedIntern.medicalClearance ? (
                          <FaCheck />
                        ) : (
                          <FaTimes />
                        )}
                        <span>Medical Clearance</span>
                      </div>
                      <div
                        className={`document-item ${
                          selectedIntern.policeClearance
                            ? "complete"
                            : "incomplete"
                        }`}
                      >
                        {selectedIntern.policeClearance ? (
                          <FaCheck />
                        ) : (
                          <FaTimes />
                        )}
                        <span>Police Clearance</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact & Links */}
                  <div className="profile-section">
                    <h4>
                      <FaPhone /> Contact & Links
                    </h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Emergency Contact</label>
                        <span>
                          {selectedIntern.emergencyContact.name} (
                          {selectedIntern.emergencyContact.relationship})
                          <br />
                          {selectedIntern.emergencyContact.phone}
                        </span>
                      </div>
                      {selectedIntern.linkedinUrl && (
                        <div className="info-item">
                          <label>LinkedIn</label>
                          <a
                            href={selectedIntern.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin /> View Profile
                          </a>
                        </div>
                      )}
                      {selectedIntern.portfolioUrl && (
                        <div className="info-item">
                          <label>Portfolio</label>
                          <a
                            href={selectedIntern.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaGlobe /> View Portfolio
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Activity */}
                  <div className="profile-section">
                    <h4>
                      <FaHistory /> Activity
                    </h4>
                    <div className="info-item">
                      <label>Last Active</label>
                      <span>{selectedIntern.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn--primary"
                  onClick={() =>
                    navigate(`/coordinator/intern/${selectedIntern.id}`)
                  }
                >
                  View Full Profile
                </button>
                <button
                  className="btn btn--secondary"
                  onClick={() => setShowInternModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinatorMyInterns;
