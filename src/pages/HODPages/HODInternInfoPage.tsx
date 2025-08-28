import React, { useState, useEffect, useMemo } from "react";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaFileAlt,
  FaClipboardCheck,
  FaDownload,
  FaEdit,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUsers,
  FaGraduationCap,
  FaBuilding,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import HODSideMenu from "../../components/HODSideMenu";
import mockInternsData from "../../data/mockInternsData.json";

interface Intern {
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
  status: string;
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
  linkedinUrl?: string;
  portfolioUrl?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  academicTranscripts: boolean;
  medicalClearance: boolean;
  policeClearance: boolean;
  tags: string[];
  midEvaluation: boolean;
  endEvaluation: boolean;
}

interface FilterState {
  search: string;
  department: string;
  status: string;
  evaluationStatus: string;
  workMode: string;
  compensationType: string;
  university: string;
  year: string;
  skills: string;
}

type SortField =
  | "name"
  | "department"
  | "status"
  | "progress"
  | "gpa"
  | "startDate"
  | "evaluationStatus";
type SortDirection = "asc" | "desc";

const HODInternInfoPage: React.FC = () => {
  const [interns] = useState<Intern[]>(mockInternsData as Intern[]);
  const [filteredInterns, setFilteredInterns] = useState<Intern[]>(interns);
  const [selectedInterns, setSelectedInterns] = useState<Set<string>>(
    new Set()
  );
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    department: "",
    status: "",
    evaluationStatus: "",
    workMode: "",
    compensationType: "",
    university: "",
    year: "",
    skills: "",
  });

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const departments = [
      ...new Set(interns.map((intern) => intern.department)),
    ];
    const statuses = [...new Set(interns.map((intern) => intern.status))];
    const evaluationStatuses = [
      ...new Set(interns.map((intern) => intern.evaluationStatus)),
    ];
    const workModes = [...new Set(interns.map((intern) => intern.workMode))];
    const compensationTypes = [
      ...new Set(interns.map((intern) => intern.compensationType)),
    ];
    const universities = [
      ...new Set(interns.map((intern) => intern.university)),
    ];
    const years = [...new Set(interns.map((intern) => intern.year))];
    const allSkills = [...new Set(interns.flatMap((intern) => intern.skills))];

    return {
      departments,
      statuses,
      evaluationStatuses,
      workModes,
      compensationTypes,
      universities,
      years,
      skills: allSkills,
    };
  }, [interns]);

  // Filter and sort interns
  useEffect(() => {
    const filtered = interns.filter((intern) => {
      const matchesSearch =
        filters.search === "" ||
        intern.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        intern.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        intern.studentId.toLowerCase().includes(filters.search.toLowerCase()) ||
        intern.company.toLowerCase().includes(filters.search.toLowerCase());

      const matchesDepartment =
        filters.department === "" || intern.department === filters.department;
      const matchesStatus =
        filters.status === "" || intern.status === filters.status;
      const matchesEvaluationStatus =
        filters.evaluationStatus === "" ||
        intern.evaluationStatus === filters.evaluationStatus;
      const matchesWorkMode =
        filters.workMode === "" || intern.workMode === filters.workMode;
      const matchesCompensationType =
        filters.compensationType === "" ||
        intern.compensationType === filters.compensationType;
      const matchesUniversity =
        filters.university === "" || intern.university === filters.university;
      const matchesYear = filters.year === "" || intern.year === filters.year;
      const matchesSkills =
        filters.skills === "" ||
        intern.skills.some((skill) =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        );

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesEvaluationStatus &&
        matchesWorkMode &&
        matchesCompensationType &&
        matchesUniversity &&
        matchesYear &&
        matchesSkills
      );
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      let aValue: string | number | Date = a[sortField];
      let bValue: string | number | Date = b[sortField];

      if (sortField === "startDate") {
        aValue = new Date(a.startDate);
        bValue = new Date(b.startDate);
      }

      // Handle string comparison with case-insensitive sorting
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
          : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
      }

      // Handle numeric and date comparisons
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredInterns(filtered);
    setCurrentPage(1);
  }, [interns, filters, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredInterns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInterns = filteredInterns.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectIntern = (internId: string) => {
    const newSelected = new Set(selectedInterns);
    if (newSelected.has(internId)) {
      newSelected.delete(internId);
    } else {
      newSelected.add(internId);
    }
    setSelectedInterns(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedInterns.size === paginatedInterns.length) {
      setSelectedInterns(new Set());
    } else {
      setSelectedInterns(new Set(paginatedInterns.map((intern) => intern.id)));
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      department: "",
      status: "",
      evaluationStatus: "",
      workMode: "",
      compensationType: "",
      university: "",
      year: "",
      skills: "",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <FaCheckCircle className="status-icon active" />;
      case "completed":
        return <FaGraduationCap className="status-icon completed" />;
      case "pending":
        return <FaClock className="status-icon pending" />;
      default:
        return <FaExclamationTriangle className="status-icon warning" />;
    }
  };

  const getEvaluationStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="eval-icon completed" />;
      case "pending":
        return <FaClock className="eval-icon pending" />;
      default:
        return <FaExclamationTriangle className="eval-icon warning" />;
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  const renderInternCard = (intern: Intern) => (
    <div key={intern.id} className="intern-card">
      <div className="intern-card-header">
        <input
          type="checkbox"
          checked={selectedInterns.has(intern.id)}
          onChange={() => handleSelectIntern(intern.id)}
          className="intern-checkbox"
        />
        <img
          src={intern.profileImage}
          alt={intern.name}
          className="intern-avatar"
        />
        <div className="intern-basic-info">
          <h3 className="intern-name">{intern.name}</h3>
          <p className="intern-id">{intern.studentId}</p>
          <p className="intern-department">{intern.department}</p>
        </div>
        <div className="intern-status">
          {getStatusIcon(intern.status)}
          <span className={`status-text ${intern.status}`}>
            {intern.status}
          </span>
        </div>
      </div>

      <div className="intern-card-body">
        <div className="intern-details">
          <div className="detail-item">
            <FaBuilding className="detail-icon" />
            <span>{intern.company}</span>
          </div>
          <div className="detail-item">
            <FaGraduationCap className="detail-icon" />
            <span>{intern.university}</span>
          </div>
          <div className="detail-item">
            <FaClock className="detail-icon" />
            <span>{intern.workMode}</span>
          </div>
        </div>

        <div className="intern-progress">
          <div className="progress-header">
            <span>Progress</span>
            <span>{intern.progress}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${intern.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="intern-evaluation">
          <div className="eval-item">
            {getEvaluationStatusIcon(intern.evaluationStatus)}
            <span>Evaluation: {intern.evaluationStatus}</span>
          </div>
          <div className="reports-info">
            <FaFileAlt className="report-icon" />
            <span>
              {intern.reportsSubmitted}/{intern.totalReports} Reports
            </span>
          </div>
        </div>
      </div>

      <div className="intern-card-actions">
        <button
          className="action-btn view-btn"
          onClick={() => {
            setSelectedIntern(intern);
            setShowDetailModal(true);
          }}
        >
          <FaEye /> View
        </button>
        <button className="action-btn reports-btn">
          <FaFileAlt /> Reports
        </button>
        <button className="action-btn evaluation-btn">
          <FaClipboardCheck /> Evaluation
        </button>
        <button className="action-btn download-btn">
          <FaDownload /> Export
        </button>
      </div>
    </div>
  );

  const renderInternTable = () => (
    <div className="intern-table-container">
      <table className="intern-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedInterns.size === paginatedInterns.length &&
                  paginatedInterns.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th onClick={() => handleSort("name")} className="sortable">
              Name {getSortIcon("name")}
            </th>
            <th>Student ID</th>
            <th onClick={() => handleSort("department")} className="sortable">
              Department {getSortIcon("department")}
            </th>
            <th onClick={() => handleSort("status")} className="sortable">
              Status {getSortIcon("status")}
            </th>
            <th>Company</th>
            <th onClick={() => handleSort("progress")} className="sortable">
              Progress {getSortIcon("progress")}
            </th>
            <th
              onClick={() => handleSort("evaluationStatus")}
              className="sortable"
            >
              Evaluation {getSortIcon("evaluationStatus")}
            </th>
            <th onClick={() => handleSort("gpa")} className="sortable">
              GPA {getSortIcon("gpa")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInterns.map((intern) => (
            <tr key={intern.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedInterns.has(intern.id)}
                  onChange={() => handleSelectIntern(intern.id)}
                />
              </td>
              <td>
                <div className="table-name-cell">
                  <img
                    src={intern.profileImage}
                    alt={intern.name}
                    className="table-avatar"
                  />
                  <span>{intern.name}</span>
                </div>
              </td>
              <td>{intern.studentId}</td>
              <td>{intern.department}</td>
              <td>
                <div className="table-status">
                  {getStatusIcon(intern.status)}
                  <span className={`status-text ${intern.status}`}>
                    {intern.status}
                  </span>
                </div>
              </td>
              <td>{intern.company}</td>
              <td>
                <div className="table-progress">
                  <div className="progress-bar small">
                    <div
                      className="progress-fill"
                      style={{ width: `${intern.progress}%` }}
                    ></div>
                  </div>
                  <span>{intern.progress}%</span>
                </div>
              </td>
              <td>
                <div className="table-evaluation">
                  {getEvaluationStatusIcon(intern.evaluationStatus)}
                  <span>{intern.evaluationStatus}</span>
                </div>
              </td>
              <td>{intern.gpa}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="action-btn-small view-btn"
                    onClick={() => {
                      setSelectedIntern(intern);
                      setShowDetailModal(true);
                    }}
                  >
                    <FaEye />
                  </button>
                  <button className="action-btn-small reports-btn">
                    <FaFileAlt />
                  </button>
                  <button className="action-btn-small evaluation-btn">
                    <FaClipboardCheck />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Get today's date
  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Mock current user data
  const currentUser = {
    name: "Dr. Sarah Johnson",
    avatar: "SJ",
    role: "HOD",
  };

  return (
    <div className="hod-intern-info-page">
      {/* <HODSideMenu /> */}

      <div className="intern-info-content">
        {/* Header with consistent styling */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1>Intern Information</h1>
            <p>Manage and monitor all interns across departments</p>
          </div>
          <div className="dashboard__header-right">
            <div className="dashboard__date">
              <FaClock className="date-icon" />
              {getTodayDate()}
            </div>
            <div className="dashboard__profile">
              <div className="dashboard__profile-image">
                <span>{currentUser.avatar}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="page-stats">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{filteredInterns.length}</span>
              <span className="stat-label">Total Interns</span>
            </div>
          </div>
          <div className="stat-card">
            <FaCheckCircle className="stat-icon active" />
            <div className="stat-info">
              <span className="stat-number">
                {filteredInterns.filter((i) => i.status === "active").length}
              </span>
              <span className="stat-label">Active</span>
            </div>
          </div>
          <div className="stat-card">
            <FaGraduationCap className="stat-icon completed" />
            <div className="stat-info">
              <span className="stat-number">
                {filteredInterns.filter((i) => i.status === "completed").length}
              </span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, student ID, or company..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="search-input"
              />
            </div>
            <button
              className={`filter-toggle-btn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </button>
          </div>

          <div className="view-controls">
            <div className="view-mode-toggle">
              <button
                className={`view-btn ${viewMode === "cards" ? "active" : ""}`}
                onClick={() => setViewMode("cards")}
              >
                Cards
              </button>
              <button
                className={`view-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
              >
                Table
              </button>
            </div>

            {selectedInterns.size > 0 && (
              <div className="bulk-actions">
                <span className="selected-count">
                  {selectedInterns.size} selected
                </span>
                <button className="bulk-btn export-btn">
                  <FaDownload /> Export Selected
                </button>
                <button className="bulk-btn evaluation-btn">
                  <FaClipboardCheck /> Bulk Evaluation
                </button>
              </div>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filters-grid">
              <select
                value={filters.department}
                onChange={(e) =>
                  handleFilterChange("department", e.target.value)
                }
                className="filter-select"
              >
                <option value="">All Departments</option>
                {filterOptions.departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="filter-select"
              >
                <option value="">All Statuses</option>
                {filterOptions.statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={filters.evaluationStatus}
                onChange={(e) =>
                  handleFilterChange("evaluationStatus", e.target.value)
                }
                className="filter-select"
              >
                <option value="">All Evaluation Status</option>
                {filterOptions.evaluationStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={filters.workMode}
                onChange={(e) => handleFilterChange("workMode", e.target.value)}
                className="filter-select"
              >
                <option value="">All Work Modes</option>
                {filterOptions.workModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>

              <select
                value={filters.university}
                onChange={(e) =>
                  handleFilterChange("university", e.target.value)
                }
                className="filter-select"
              >
                <option value="">All Universities</option>
                {filterOptions.universities.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Filter by skills..."
                value={filters.skills}
                onChange={(e) => handleFilterChange("skills", e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-actions">
              <button className="clear-filters-btn" onClick={clearFilters}>
                <FaTimes /> Clear Filters
              </button>
            </div>
          </div>
        )}

        <div className="interns-section">
          {viewMode === "cards" ? (
            <div className="interns-grid">
              {paginatedInterns.map(renderInternCard)}
            </div>
          ) : (
            renderInternTable()
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            <div className="pagination-info">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <span>({filteredInterns.length} total interns)</span>
            </div>

            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Detailed Intern Modal */}
      {showDetailModal && selectedIntern && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailModal(false)}
        >
          <div
            className="intern-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Intern Details</h2>
              <button
                className="close-modal-btn"
                onClick={() => setShowDetailModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-content">
              <div className="intern-profile-section">
                <img
                  src={selectedIntern.profileImage}
                  alt={selectedIntern.name}
                  className="profile-image"
                />
                <div className="profile-info">
                  <h3>{selectedIntern.name}</h3>
                  <p className="student-id">{selectedIntern.studentId}</p>
                  <p className="email">{selectedIntern.email}</p>
                  <p className="phone">{selectedIntern.phone}</p>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-section">
                  <h4>Academic Information</h4>
                  <div className="detail-row">
                    <span className="label">University:</span>
                    <span className="value">{selectedIntern.university}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Faculty:</span>
                    <span className="value">{selectedIntern.faculty}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Degree:</span>
                    <span className="value">{selectedIntern.degree}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Year:</span>
                    <span className="value">{selectedIntern.year}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">GPA:</span>
                    <span className="value">{selectedIntern.gpa}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Internship Information</h4>
                  <div className="detail-row">
                    <span className="label">Company:</span>
                    <span className="value">{selectedIntern.company}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Title:</span>
                    <span className="value">
                      {selectedIntern.internshipTitle}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Duration:</span>
                    <span className="value">
                      {selectedIntern.startDate} to {selectedIntern.endDate}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Work Mode:</span>
                    <span className="value">{selectedIntern.workMode}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Hours/Week:</span>
                    <span className="value">{selectedIntern.hoursPerWeek}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Progress & Evaluation</h4>
                  <div className="detail-row">
                    <span className="label">Progress:</span>
                    <span className="value">{selectedIntern.progress}%</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Reports:</span>
                    <span className="value">
                      {selectedIntern.reportsSubmitted}/
                      {selectedIntern.totalReports}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Evaluation Status:</span>
                    <span className="value">
                      {selectedIntern.evaluationStatus}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Mid Evaluation:</span>
                    <span className="value">
                      {selectedIntern.midEvaluation ? "Completed" : "Pending"}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Final Evaluation:</span>
                    <span className="value">
                      {selectedIntern.endEvaluation ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Skills & Languages</h4>
                  <div className="skills-list">
                    {selectedIntern.skills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="languages-list">
                    {selectedIntern.languages.map((language) => (
                      <span key={language} className="language-tag">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="modal-action-btn reports-btn">
                  <FaFileAlt /> View Reports
                </button>
                <button className="modal-action-btn evaluation-btn">
                  <FaClipboardCheck /> View Evaluations
                </button>
                <button className="modal-action-btn download-btn">
                  <FaDownload /> Export Profile
                </button>
                <button className="modal-action-btn edit-btn">
                  <FaEdit /> Edit Information
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HODInternInfoPage;
