import React, { useState } from "react";
import {
  FaUsers,
  FaUserGraduate,
  FaUserTie,
  FaBriefcase,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaTasks,
  FaBuilding,
  FaClipboardCheck,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
  FaDownload,
  FaEye,
  FaBell,
  FaChevronRight,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

interface DashboardStats {
  totalStudents: number;
  registeredStudents: number;
  studentsWithInternships: number;
  studentsWithoutInternships: number;
  activeSupervisors: number;
  pendingEvaluations: number;
  completedEvaluations: number;
  upcomingEvents: number;
}

interface MonthlyProgress {
  month: string;
  placements: number;
  registrations: number;
  evaluations: number;
}

interface CompanyDistribution {
  name: string;
  value: number;
  percentage: number;
}

interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "deadline" | "workshop" | "fair";
  location?: string;
  attendees?: number;
}

const CoordinatorDashboard: React.FC = () => {
  const [currentUser] = useState({
    name: "Dr. Sarani Mahagama",
    role: "Internship Coordinator",
    department: "Computer Science",
    avatar: "SJ",
  });

  const [stats] = useState<DashboardStats>({
    totalStudents: 150,
    registeredStudents: 120,
    studentsWithInternships: 95,
    studentsWithoutInternships: 25,
    activeSupervisors: 18,
    pendingEvaluations: 12,
    completedEvaluations: 83,
    upcomingEvents: 5,
  });

  const [monthlyProgress] = useState<MonthlyProgress[]>([
    { month: "Jan", placements: 15, registrations: 20, evaluations: 12 },
    { month: "Feb", placements: 22, registrations: 28, evaluations: 18 },
    { month: "Mar", placements: 35, registrations: 42, evaluations: 30 },
    { month: "Apr", placements: 48, registrations: 65, evaluations: 45 },
    { month: "May", placements: 62, registrations: 85, evaluations: 58 },
    { month: "Jun", placements: 75, registrations: 95, evaluations: 70 },
    { month: "Jul", placements: 88, registrations: 108, evaluations: 80 },
    { month: "Aug", placements: 95, registrations: 120, evaluations: 83 },
  ]);

  const [companyDistribution] = useState<CompanyDistribution[]>([
    { name: "Tech Companies", value: 45, percentage: 47.4 },
    { name: "Finance", value: 20, percentage: 21.1 },
    { name: "Healthcare", value: 15, percentage: 15.8 },
    { name: "Education", value: 10, percentage: 10.5 },
    { name: "Others", value: 5, percentage: 5.2 },
  ]);

  const [internshipStatusData] = useState([
    { name: "Completed", value: 83, fill: "#10b981" },
    { name: "In Progress", value: 12, fill: "#3b82f6" },
    { name: "Not Started", value: 25, fill: "#f59e0b" },
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: "registration",
      student: "John Doe",
      action: "registered for internship",
      time: "2 hours ago",
      icon: FaUserGraduate,
      color: "#3b82f6",
    },
    {
      id: 2,
      type: "evaluation",
      student: "Jane Smith",
      action: "evaluation completed",
      time: "5 hours ago",
      icon: FaCheckCircle,
      color: "#10b981",
    },
    {
      id: 3,
      type: "placement",
      student: "Mike Johnson",
      action: "placed at TechCorp",
      time: "1 day ago",
      icon: FaBriefcase,
      color: "#7030b8",
    },
    {
      id: 4,
      type: "warning",
      student: "Sarah Williams",
      action: "missing documents",
      time: "2 days ago",
      icon: FaExclamationTriangle,
      color: "#f59e0b",
    },
  ]);

  const [upcomingEvents] = useState<UpcomingEvent[]>([
    {
      id: 1,
      title: "Mid-term Evaluation Meeting",
      date: "2025-08-25",
      time: "10:00 AM",
      type: "meeting",
      location: "Conference Room A",
      attendees: 12,
    },
    {
      id: 2,
      title: "Monthly Report Submission",
      date: "2025-08-31",
      time: "5:00 PM",
      type: "deadline",
    },
    {
      id: 3,
      title: "Internship Fair",
      date: "2025-09-05",
      time: "9:00 AM",
      type: "fair",
      location: "Main Hall",
      attendees: 150,
    },
    {
      id: 4,
      title: "CV Writing Workshop",
      date: "2025-09-10",
      time: "2:00 PM",
      type: "workshop",
      location: "Room 203",
      attendees: 45,
    },
  ]);

  const registrationRate =
    (stats.registeredStudents / stats.totalStudents) * 100;
  const placementRate =
    (stats.studentsWithInternships / stats.registeredStudents) * 100;

  const COLORS = ["#3254c5", "#7030b8", "#10b981", "#f59e0b", "#ef4444"];

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "📅";
      case "deadline":
        return "⏰";
      case "workshop":
        return "🎓";
      case "fair":
        return "🏢";
      default:
        return "📌";
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "#3b82f6";
      case "deadline":
        return "#ef4444";
      case "workshop":
        return "#7030b8";
      case "fair":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="coordinator-dashboard">
      <div className="dashboard__main">
        {/* Header Section */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1>Welcome back, {currentUser.name}!</h1>
            <p>
              {currentUser.role} - {currentUser.department} Department
            </p>
            <div className="dashboard__date">
              <FaCalendarAlt className="date-icon" />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="dashboard__actions">
            <button className="action-btn filter-btn">
              <FaFilter /> Filter
            </button>
            <button className="action-btn export-btn">
              <FaDownload /> Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="dashboard__stats">
          <div className="stat-card stat-card--primary">
            <FaUsers className="stat-card__icon" />
            <div className="stat-card__content">
              <span className="stat-card__label">Total Students</span>
              <span className="stat-card__value">{stats.totalStudents}</span>
              <span className="stat-card__subtext">
                {stats.registeredStudents} registered (
                {registrationRate.toFixed(1)}%)
              </span>
            </div>
          </div>

          <div className="stat-card stat-card--success">
            <FaBriefcase className="stat-card__icon" />
            <div className="stat-card__content">
              <span className="stat-card__label">With Internships</span>
              <span className="stat-card__value">
                {stats.studentsWithInternships}
              </span>
              <span className="stat-card__subtext">
                {placementRate.toFixed(1)}% placement rate
              </span>
            </div>
          </div>

          <div className="stat-card stat-card--warning">
            <FaClock className="stat-card__icon" />
            <div className="stat-card__content">
              <span className="stat-card__label">Without Internships</span>
              <span className="stat-card__value">
                {stats.studentsWithoutInternships}
              </span>
              <span className="stat-card__subtext">Need placement</span>
            </div>
          </div>

          <div className="stat-card stat-card--info">
            <FaUserTie className="stat-card__icon" />
            <div className="stat-card__content">
              <span className="stat-card__label">Active Supervisors</span>
              <span className="stat-card__value">
                {stats.activeSupervisors}
              </span>
              <span className="stat-card__subtext">From companies</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard__content">
          {/* Left Column */}
          <div className="dashboard__left">
            {/* Progress Chart */}
            <div className="dashboard__widget">
              <div className="widget__header">
                <h3>
                  <FaChartLine className="widget-icon" /> Monthly Progress
                </h3>
                <div className="widget__legend">
                  <span className="legend-item placements">Placements</span>
                  <span className="legend-item registrations">
                    Registrations
                  </span>
                  <span className="legend-item evaluations">Evaluations</span>
                </div>
              </div>
              <div className="widget__content">
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={monthlyProgress}>
                    <defs>
                      <linearGradient
                        id="colorPlacements"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3254c5"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3254c5"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorRegistrations"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#7030b8"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#7030b8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorEvaluations"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      opacity={0.5}
                    />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="placements"
                      stroke="#3254c5"
                      fillOpacity={1}
                      fill="url(#colorPlacements)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="registrations"
                      stroke="#7030b8"
                      fillOpacity={1}
                      fill="url(#colorRegistrations)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="evaluations"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorEvaluations)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="dashboard__widget">
              <div className="widget__header">
                <h3>
                  <FaClipboardCheck className="widget-icon" /> Internship Status
                </h3>
                <button className="view-all-btn">
                  View Details <FaChevronRight />
                </button>
              </div>
              <div className="widget__content">
                <div className="status-grid">
                  {internshipStatusData.map((status) => (
                    <div key={status.name} className="status-card">
                      <div className="status-header">
                        <span className="status-name">{status.name}</span>
                        <span className="status-value">{status.value}</span>
                      </div>
                      <div className="status-bar">
                        <div
                          className="status-progress"
                          style={{
                            width: `${
                              (status.value / stats.registeredStudents) * 100
                            }%`,
                            backgroundColor: status.fill,
                          }}
                        />
                      </div>
                      <span className="status-percentage">
                        {(
                          (status.value / stats.registeredStudents) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard__right">
            {/* Company Distribution */}
            <div className="dashboard__widget">
              <div className="widget__header">
                <h3>
                  <FaBuilding className="widget-icon" /> Company Distribution
                </h3>
              </div>
              <div className="widget__content">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={companyDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {companyDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-legend">
                  {companyDistribution.map((entry, index) => (
                    <div key={entry.name} className="legend-item">
                      <span
                        className="legend-color"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="legend-label">{entry.name}</span>
                      <span className="legend-value">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="dashboard__widget">
              <div className="widget__header">
                <h3>
                  <FaBell className="widget-icon" /> Recent Activities
                </h3>
                <button className="view-all-btn">
                  View All <FaChevronRight />
                </button>
              </div>
              <div className="widget__content">
                <div className="activity-list">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div
                        className="activity-icon"
                        style={{ backgroundColor: `${activity.color}15` }}
                      >
                        <activity.icon style={{ color: activity.color }} />
                      </div>
                      <div className="activity-content">
                        <p>
                          <strong>{activity.student}</strong> {activity.action}
                        </p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="dashboard__widget">
              <div className="widget__header">
                <h3>
                  <FaCalendarAlt className="widget-icon" /> Upcoming Events
                </h3>
                <span className="event-count">{upcomingEvents.length}</span>
              </div>
              <div className="widget__content">
                <div className="events-list">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="event-item">
                      <div className="event-date">
                        <span className="event-day">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="event-month">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </span>
                      </div>
                      <div className="event-details">
                        <div className="event-header">
                          <span className="event-icon">
                            {getEventIcon(event.type)}
                          </span>
                          <h4>{event.title}</h4>
                        </div>
                        <div className="event-meta">
                          <span className="event-time">
                            <FaClock /> {event.time}
                          </span>
                          {event.location && (
                            <span className="event-location">
                              📍 {event.location}
                            </span>
                          )}
                        </div>
                        {event.attendees && (
                          <div className="event-attendees">
                            <FaUsers /> {event.attendees} attendees
                          </div>
                        )}
                      </div>
                      <div
                        className="event-type-indicator"
                        style={{ backgroundColor: getEventColor(event.type) }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
