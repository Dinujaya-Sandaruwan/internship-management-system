import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaUser,
  FaUsers,
  FaBuilding,
  FaSort,
  FaChevronDown,
  FaChevronUp,
  FaClipboardCheck,
  FaTasks,
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
  midEvaluation: boolean;
  endEvaluation: boolean;
}

const CoordinatorEvaluations: React.FC = () => {
  const [interns, setInterns] = useState<InternData[]>([]);
  const [filteredInterns, setFilteredInterns] = useState<InternData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [evaluationFilter, setEvaluationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInterns, setSelectedInterns] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    setInterns(mockInternsData as InternData[]);
    setFilteredInterns(mockInternsData as InternData[]);
  }, []);

  useEffect(() => {
    const filtered = interns.filter((intern) => {
      const matchesSearch =
        intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || intern.status === filterStatus;

      const matchesEvaluation = (() => {
        switch (evaluationFilter) {
          case "mid-completed":
            return intern.midEvaluation === true;
          case "mid-pending":
            return intern.midEvaluation === false;
          case "end-completed":
            return intern.endEvaluation === true;
          case "end-pending":
            return intern.endEvaluation === false;
          case "both-completed":
            return (
              intern.midEvaluation === true && intern.endEvaluation === true
            );
          case "none-completed":
            return (
              intern.midEvaluation === false && intern.endEvaluation === false
            );
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatus && matchesEvaluation;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue: string | Date, bValue: string | Date;
      switch (sortBy) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "company":
          aValue = a.company;
          bValue = b.company;
          break;
        case "startDate":
          aValue = new Date(a.startDate);
          bValue = new Date(b.startDate);
          break;
        case "endDate":
          aValue = new Date(a.endDate);
          bValue = new Date(b.endDate);
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredInterns(filtered);
  }, [interns, searchTerm, filterStatus, evaluationFilter, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getEvaluationStatus = (intern: InternData) => {
    if (intern.midEvaluation && intern.endEvaluation) {
      return {
        status: "both-completed",
        label: "Both Completed",
        color: "success",
      };
    } else if (intern.midEvaluation && !intern.endEvaluation) {
      return { status: "mid-only", label: "Mid Completed", color: "warning" };
    } else if (!intern.midEvaluation && intern.endEvaluation) {
      return { status: "end-only", label: "End Completed", color: "warning" };
    } else {
      return { status: "none", label: "None Completed", color: "danger" };
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { icon: FaCheckCircle, color: "success", label: "Active" },
      completed: { icon: FaCheckCircle, color: "primary", label: "Completed" },
      "on-break": {
        icon: FaExclamationTriangle,
        color: "warning",
        label: "On Break",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    const IconComponent = config.icon;
    return (
      <span className={`status-badge status-badge--${config.color}`}>
        <IconComponent className="status-icon" />
        {config.label}
      </span>
    );
  };

  const handleDownloadEvaluation = (
    internId: string,
    evaluationType: "mid" | "end"
  ) => {
    const intern = interns.find((i) => i.id === internId);
    if (intern) {
      console.log(
        `Downloading ${evaluationType} evaluation for ${intern.name}`
      );
      alert(
        `${
          evaluationType.charAt(0).toUpperCase() + evaluationType.slice(1)
        } evaluation for ${intern.name} downloaded successfully!`
      );
    }
  };

  const handleBulkDownload = () => {
    if (selectedInterns.length === 0) {
      alert("Please select at least one intern to download evaluations.");
      return;
    }
    console.log(
      `Downloading evaluations for ${selectedInterns.length} interns`
    );
    alert(
      `Bulk download initiated for ${selectedInterns.length} selected interns.`
    );
    setSelectedInterns([]);
    setShowBulkActions(false);
  };

  const handleSelectIntern = (internId: string) => {
    setSelectedInterns((prev) => {
      const newSelection = prev.includes(internId)
        ? prev.filter((id) => id !== internId)
        : [...prev, internId];
      setShowBulkActions(newSelection.length > 0);
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedInterns.length === filteredInterns.length) {
      setSelectedInterns([]);
      setShowBulkActions(false);
    } else {
      const allIds = filteredInterns.map((intern) => intern.id);
      setSelectedInterns(allIds);
      setShowBulkActions(true);
    }
  };

  return (
    <div className="coordinator-evaluations">
      <div className="dashboard__main">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1>Intern Evaluations</h1>
            <p>
              View, filter, and download mid-term and end-term evaluations for
              all interns
            </p>
          </div>
          <div className="dashboard__header-right">
            <div className="header-stats">
            <div className="stat-item stat-item--primary">
              <FaUsers className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{filteredInterns.length}</span>
                <span className="stat-label">Total Interns</span>
              </div>
            </div>
            <div className="stat-item stat-item--warning">
              <FaClipboardCheck className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">
                  {filteredInterns.filter((i) => i.midEvaluation).length}
                </span>
                <span className="stat-label">Mid Evaluations</span>
              </div>
            </div>
            <div className="stat-item stat-item--success">
              <FaTasks className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">
                  {filteredInterns.filter((i) => i.endEvaluation).length}
                </span>
                <span className="stat-label">End Evaluations</span>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Controls */}
        <div className="evaluations-controls">
          <div className="search-section">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, student ID, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          <div className="filter-section">
            <button
              className={`filter-toggle ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
              {showFilters ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-group">
              <label>Internship Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-break">On Break</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Evaluation Status</label>
              <select
                value={evaluationFilter}
                onChange={(e) => setEvaluationFilter(e.target.value)}
              >
                <option value="all">All Evaluations</option>
                <option value="mid-completed">Mid Evaluation Completed</option>
                <option value="mid-pending">Mid Evaluation Pending</option>
                <option value="end-completed">End Evaluation Completed</option>
                <option value="end-pending">End Evaluation Pending</option>
                <option value="both-completed">Both Completed</option>
                <option value="none-completed">None Completed</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="company">Company</option>
                <option value="startDate">Start Date</option>
                <option value="endDate">End Date</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {showBulkActions && (
          <div className="bulk-actions">
            <div className="bulk-info">
              <span>{selectedInterns.length} intern(s) selected</span>
            </div>
            <div className="bulk-buttons">
              <button
                className="btn btn--secondary"
                onClick={() => {
                  setSelectedInterns([]);
                  setShowBulkActions(false);
                }}
              >
                Clear Selection
              </button>
              <button className="btn btn--primary" onClick={handleBulkDownload}>
                <FaDownload /> Download Selected
              </button>
            </div>
          </div>
        )}

        {/* Evaluations Table */}
        <div className="evaluations-table-container">
          <table className="evaluations-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedInterns.length === filteredInterns.length &&
                      filteredInterns.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th onClick={() => handleSort("name")} className="sortable">
                  <div className="th-content">
                    <FaUser /> Intern
                    <FaSort
                      className={`sort-icon ${
                        sortBy === "name" ? "active" : ""
                      }`}
                    />
                  </div>
                </th>
                <th onClick={() => handleSort("company")} className="sortable">
                  <div className="th-content">
                    <FaBuilding /> Company
                    <FaSort
                      className={`sort-icon ${
                        sortBy === "company" ? "active" : ""
                      }`}
                    />
                  </div>
                </th>
                <th>Status</th>
                <th>Mid Evaluation</th>
                <th>End Evaluation</th>
                <th>Overall Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterns.map((intern) => {
                const evalStatus = getEvaluationStatus(intern);
                return (
                  <tr
                    key={intern.id}
                    className={
                      selectedInterns.includes(intern.id) ? "selected" : ""
                    }
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedInterns.includes(intern.id)}
                        onChange={() => handleSelectIntern(intern.id)}
                      />
                    </td>
                    <td>
                      <div className="intern-info">
                        <div className="intern-avatar">
                          <img src={intern.profileImage} alt={intern.name} />
                        </div>
                        <div className="intern-details">
                          <div className="intern-name">{intern.name}</div>
                          <div className="intern-id">{intern.studentId}</div>
                          <div className="intern-email">{intern.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="company-info">
                        <div className="company-name">{intern.company}</div>
                        <div className="internship-title">
                          {intern.internshipTitle}
                        </div>
                      </div>
                    </td>
                    <td>{getStatusBadge(intern.status)}</td>
                    <td>
                      <div className="evaluation-cell">
                        {intern.midEvaluation ? (
                          <div className="evaluation-completed">
                            <FaCheckCircle className="eval-icon success" />
                            <span>Completed</span>
                            <button
                              className="download-btn-small"
                              onClick={() =>
                                handleDownloadEvaluation(intern.id, "mid")
                              }
                              title="Download Mid Evaluation"
                            >
                              <FaDownload />
                            </button>
                          </div>
                        ) : (
                          <div className="evaluation-pending">
                            <FaExclamationTriangle className="eval-icon warning" />
                            <span>Pending</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="evaluation-cell">
                        {intern.endEvaluation ? (
                          <div className="evaluation-completed">
                            <FaCheckCircle className="eval-icon success" />
                            <span>Completed</span>
                            <button
                              className="download-btn-small"
                              onClick={() =>
                                handleDownloadEvaluation(intern.id, "end")
                              }
                              title="Download End Evaluation"
                            >
                              <FaDownload />
                            </button>
                          </div>
                        ) : (
                          <div className="evaluation-pending">
                            <FaExclamationTriangle className="eval-icon warning" />
                            <span>Pending</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`evaluation-status evaluation-status--${evalStatus.color}`}
                      >
                        {evalStatus.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredInterns.length === 0 && (
            <div className="empty-state">
              <FaFileAlt className="empty-icon" />
              <h3>No Evaluations Found</h3>
              <p>
                {searchTerm ||
                filterStatus !== "all" ||
                evaluationFilter !== "all"
                  ? "No interns match your current search and filter criteria."
                  : "No intern evaluations are available at the moment."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorEvaluations;
