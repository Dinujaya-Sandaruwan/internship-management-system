import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "react-icons/fa";
import SupervisorSideMenu from "../../components/SupervisorSideMenu";
interface Intern {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  year: string;
  department: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "on-break";
  profileImage: string;
  progress: number;
  location: string;
  supervisor: string;
  lastActivity: string;
}

const MyInterns: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Sample intern data
  const [interns] = useState<Intern[]>([
    {
      id: "001",
      name: "Ayesh Perera",
      email: "ayesh.perera@student.cmb.ac.lk",
      phone: "+94 77 123 4567",
      university: "University of Colombo",
      degree: "BSc Computer Science",
      year: "3rd Year",
      department: "Computer Science",
      startDate: "2025-01-15",
      endDate: "2025-06-15",
      status: "active",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      progress: 75,
      location: "Colombo",
      supervisor: "Dr. Silva",
      lastActivity: "2 hours ago",
    },
    {
      id: "002",
      name: "Nimaya Fernando",
      email: "nimaya.fernando@student.cmb.ac.lk",
      phone: "+94 77 234 5678",
      university: "University of Colombo",
      degree: "BSc Information Technology",
      year: "2nd Year",
      department: "Computer Science",
      startDate: "2025-02-01",
      endDate: "2025-07-01",
      status: "active",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      progress: 60,
      location: "Kandy",
      supervisor: "Dr. Silva",
      lastActivity: "1 day ago",
    },
    {
      id: "003",
      name: "Kamal Jayasinghe",
      email: "kamal.jayasinghe@student.cmb.ac.lk",
      phone: "+94 77 345 6789",
      university: "University of Colombo",
      degree: "BSc Software Engineering",
      year: "3rd Year",
      department: "Computer Science",
      startDate: "2024-08-01",
      endDate: "2025-01-01",
      status: "completed",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      progress: 100,
      location: "Galle",
      supervisor: "Dr. Silva",
      lastActivity: "1 week ago",
    },
    {
      id: "004",
      name: "Sachini Wijesekara",
      email: "sachini.wijesekara@student.cmb.ac.lk",
      phone: "+94 77 456 7890",
      university: "University of Colombo",
      degree: "BSc Data Science",
      year: "4th Year",
      department: "Statistics",
      startDate: "2025-01-01",
      endDate: "2025-06-01",
      status: "on-break",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
      progress: 45,
      location: "Negombo",
      supervisor: "Dr. Silva",
      lastActivity: "3 days ago",
    },
    {
      id: "005",
      name: "Tharindu Rathnayake",
      email: "tharindu.rathnayake@student.cmb.ac.lk",
      phone: "+94 77 567 8901",
      university: "University of Colombo",
      degree: "BSc Computer Science",
      year: "2nd Year",
      department: "Computer Science",
      startDate: "2025-02-15",
      endDate: "2025-07-15",
      status: "active",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
      progress: 35,
      location: "Colombo",
      supervisor: "Dr. Silva",
      lastActivity: "5 hours ago",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  // Filter and sort interns
  const filteredInterns = interns
    .filter((intern) => {
      const matchesSearch =
        intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.degree.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || intern.status === filterStatus;
      return matchesSearch && matchesFilter;
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
    navigate(`/supervisor/intern-profile/${internId}?menu=interns`);
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
            <p>Monitor and manage your assigned interns</p>
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
            <div className="stat-card stat-card--warning">
              <FaExclamationTriangle className="stat-card__icon" />
              <div className="stat-card__content">
                <span className="stat-card__label">On Break</span>
                <span className="stat-card__value">
                  {interns.filter((i) => i.status === "on-break").length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="my-interns">
          <div className="my-interns__controls">
            <div className="search-bar">
              <FaSearch className="search-bar__icon" />
              <input
                type="text"
                placeholder="Search interns by name, email, or degree..."
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
                </select>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInternClick(intern.id);
                    }}
                  >
                    <FaEye className="action-btn__icon" />
                    View Profile
                  </button>
                  <button
                    className="action-btn action-btn--secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/supervisor/messages?contact=${intern.id}`);
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
    </div>
  );
};

export default MyInterns;
