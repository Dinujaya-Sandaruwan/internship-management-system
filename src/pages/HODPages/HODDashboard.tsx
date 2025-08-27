import React, { useState } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiFileText,
  FiAlertCircle,
  FiTrendingUp,
  FiCalendar,
  FiSettings,
  FiPlus,
  FiMail,
  FiBell,
  FiBarChart,
  FiPieChart,
  FiActivity,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiEdit,
  FiMoreVertical,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface DepartmentData {
  name: string;
  code: string;
  coordinator: string;
  activeInterns: number;
  totalSupervisors: number;
  pendingEvaluations: number;
  completionRate: number;
  status: "excellent" | "good" | "needs-attention";
}

interface SystemAlert {
  id: string;
  type: "warning" | "error" | "info";
  message: string;
  department?: string;
  timestamp: string;
}

interface ActivityItem {
  id: string;
  type:
    | "coordinator-added"
    | "evaluation-submitted"
    | "intern-registered"
    | "report-approved";
  message: string;
  department: string;
  timestamp: string;
  user: string;
}

interface MonthlyData {
  month: string;
  interns: number;
  evaluations: number;
  placements: number;
}

interface DepartmentDistribution {
  name: string;
  value: number;
  fill: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  fill: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "deadline" | "presentation" | "evaluation";
  department?: string;
  priority: "high" | "medium" | "low";
  attendees?: number;
}

const HODDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [departmentData] = useState<DepartmentData[]>([
    {
      name: "Environmental Technology",
      code: "ET",
      coordinator: "Dr. Samantha Silva",
      activeInterns: 45,
      totalSupervisors: 12,
      pendingEvaluations: 8,
      completionRate: 92,
      status: "excellent",
    },
    {
      name: "Agricultural Technology",
      code: "AT",
      coordinator: "Prof. Rajesh Kumar",
      activeInterns: 38,
      totalSupervisors: 10,
      pendingEvaluations: 15,
      completionRate: 78,
      status: "good",
    },
    {
      name: "Information and Communication Technology",
      code: "ICT",
      coordinator: "Dr. Nimal Perera",
      activeInterns: 52,
      totalSupervisors: 15,
      pendingEvaluations: 3,
      completionRate: 95,
      status: "excellent",
    },
    {
      name: "Instrumentation and Automation Technology",
      code: "IAT",
      coordinator: "Ms. Priya Jayawardena",
      activeInterns: 29,
      totalSupervisors: 8,
      pendingEvaluations: 22,
      completionRate: 65,
      status: "needs-attention",
    },
  ]);

  const [systemAlerts] = useState<SystemAlert[]>([
    {
      id: "1",
      type: "warning",
      message: "IAT department has 22 pending evaluations",
      department: "IAT",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "info",
      message: "New coordinator request from ET department",
      department: "ET",
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      type: "error",
      message: "System maintenance scheduled for tonight",
      timestamp: "6 hours ago",
    },
  ]);

  const [recentActivities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "coordinator-added",
      message: "New coordinator added to ET department",
      department: "ET",
      timestamp: "1 hour ago",
      user: "Dr. Samantha Silva",
    },
    {
      id: "2",
      type: "evaluation-submitted",
      message: "Evaluation submitted for intern John Doe",
      department: "ICT",
      timestamp: "3 hours ago",
      user: "Prof. Michael Chen",
    },
    {
      id: "3",
      type: "intern-registered",
      message: "New intern registered in AT department",
      department: "AT",
      timestamp: "5 hours ago",
      user: "Sarah Johnson",
    },
    {
      id: "4",
      type: "report-approved",
      message: "Monthly report approved for IAT",
      department: "IAT",
      timestamp: "1 day ago",
      user: "Ms. Priya Jayawardena",
    },
  ]);

  const totalInterns = departmentData.reduce(
    (sum, dept) => sum + dept.activeInterns,
    0
  );
  const totalSupervisors = departmentData.reduce(
    (sum, dept) => sum + dept.totalSupervisors,
    0
  );
  const totalPendingEvaluations = departmentData.reduce(
    (sum, dept) => sum + dept.pendingEvaluations,
    0
  );
  const averageCompletionRate = Math.round(
    departmentData.reduce((sum, dept) => sum + dept.completionRate, 0) /
      departmentData.length
  );

  const monthlyData: MonthlyData[] = [
    { month: "Jan", interns: 180, evaluations: 45, placements: 38 },
    { month: "Feb", interns: 195, evaluations: 52, placements: 42 },
    { month: "Mar", interns: 210, evaluations: 58, placements: 48 },
    { month: "Apr", interns: 225, evaluations: 65, placements: 55 },
    { month: "May", interns: 240, evaluations: 72, placements: 62 },
    { month: "Jun", interns: 245, evaluations: 78, placements: 68 },
  ];

  const departmentDistribution: DepartmentDistribution[] = [
    { name: "ICT", value: 52, fill: "#3254c5" },
    { name: "ET", value: 45, fill: "#10b981" },
    { name: "AT", value: 38, fill: "#f59e0b" },
    { name: "IAT", value: 29, fill: "#7030b8" },
  ];

  const performanceMetrics: PerformanceMetric[] = [
    { name: "Excellent", value: 45, fill: "#10b981" },
    { name: "Good", value: 35, fill: "#3b82f6" },
    { name: "Average", value: 15, fill: "#f59e0b" },
    { name: "Needs Improvement", value: 5, fill: "#ef4444" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "coordinator-added":
        return <FiUserCheck />;
      case "evaluation-submitted":
        return <FiFileText />;
      case "intern-registered":
        return <FiUsers />;
      case "report-approved":
        return <FiCheckCircle />;
      default:
        return <FiActivity />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <FiAlertCircle />;
      case "error":
        return <FiXCircle />;
      case "info":
        return <FiBell />;
      default:
        return <FiAlertCircle />;
    }
  };

  const getDepartmentStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "#10b981";
      case "good":
        return "#f59e0b";
      case "needs-attention":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="hod-dashboard">
      <div className="dashboard__main">
        {/* Header Section */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1>Head of Department Dashboard</h1>
            <p>
              Welcome back, Prof. Ananda Wickramasinghe
              <FiUsers className="info-icon" />
              Managing 4 departments across the university
            </p>
            <div className="dashboard__date">
              <FiCalendar className="date-icon" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="dashboard__actions">
            <button className="action-btn filter-btn">
              <FiBarChart />
              <span>Analytics</span>
            </button>
            <button className="action-btn export-btn">
              <FiFileText />
              <span>Export Report</span>
            </button>
            <div className="dashboard__profile">
              <div className="dashboard__profile-image">AW</div>
            </div>
          </div>
        </div>

        {/* Quick Statistics Cards */}
        <div className="dashboard__stats">
          <div className="stat-card stat-card--primary">
            <div className="stat-card__icon">
              <FiUsers />
            </div>
            <div className="stat-card__content">
              <div className="stat-card__label">Total Interns</div>
              <div className="stat-card__value">{totalInterns}</div>
              <div className="stat-card__subtext">Across all departments</div>
            </div>
          </div>
          <div className="stat-card stat-card--success">
            <div className="stat-card__icon">
              <FiUserCheck />
            </div>
            <div className="stat-card__content">
              <div className="stat-card__label">Active Coordinators</div>
              <div className="stat-card__value">4</div>
              <div className="stat-card__subtext">All departments covered</div>
            </div>
          </div>
          <div className="stat-card stat-card--info">
            <div className="stat-card__icon">
              <FiUsers />
            </div>
            <div className="stat-card__content">
              <div className="stat-card__label">Total Supervisors</div>
              <div className="stat-card__value">{totalSupervisors}</div>
              <div className="stat-card__subtext">Industry professionals</div>
            </div>
          </div>
          <div className="stat-card stat-card--warning">
            <div className="stat-card__icon">
              <FiAlertCircle />
            </div>
            <div className="stat-card__content">
              <div className="stat-card__label">Pending Evaluations</div>
              <div className="stat-card__value">{totalPendingEvaluations}</div>
              <div className="stat-card__subtext">Require attention</div>
            </div>
          </div>
          <div className="stat-card stat-card--success">
            <div className="stat-card__icon">
              <FiTrendingUp />
            </div>
            <div className="stat-card__content">
              <div className="stat-card__label">Avg Completion Rate</div>
              <div className="stat-card__value">{averageCompletionRate}%</div>
              <div className="stat-card__subtext">System-wide performance</div>
            </div>
          </div>
          <div className="stat-card stat-card--info">
            <div className="stat-card__icon">
              <FiFileText />
            </div>
            <div className="stat-card__content">
              <div className="stat-card__label">Reports Submitted</div>
              <div className="stat-card__value">127</div>
              <div className="stat-card__subtext">This month</div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="dashboard__content">
          {/* Left Column */}
          <div className="dashboard__left-column">
            {/* Department Overview Widget */}
            <div className="dashboard__widget department-overview-widget">
              <div className="widget__header">
                <h3>
                  <FiBarChart className="widget-icon" />
                  Department Overview
                </h3>
                <select
                  className="period-selector"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="this-quarter">This Quarter</option>
                  <option value="this-year">This Year</option>
                </select>
              </div>
              <div className="widget__content">
                <div className="department-grid">
                  {departmentData.map((dept) => (
                    <div key={dept.code} className="department-card">
                      <div className="department-header">
                        <div className="department-info">
                          <h4>{dept.name}</h4>
                          <p className="department-code">({dept.code})</p>
                          <p className="coordinator-name">{dept.coordinator}</p>
                        </div>
                        <div
                          className="department-status"
                          style={{
                            backgroundColor: getDepartmentStatusColor(
                              dept.status
                            ),
                          }}
                        >
                          <FiCheckCircle />
                        </div>
                      </div>
                      <div className="department-metrics">
                        <div className="metric">
                          <span className="metric-label">Interns</span>
                          <span className="metric-value">
                            {dept.activeInterns}
                          </span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Supervisors</span>
                          <span className="metric-value">
                            {dept.totalSupervisors}
                          </span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Pending</span>
                          <span className="metric-value pending">
                            {dept.pendingEvaluations}
                          </span>
                        </div>
                      </div>
                      <div className="completion-progress">
                        <div className="progress-header">
                          <span>Completion Rate</span>
                          <span className="progress-percentage">
                            {dept.completionRate}%
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${dept.completionRate}%`,
                              backgroundColor: getDepartmentStatusColor(
                                dept.status
                              ),
                            }}
                          />
                        </div>
                      </div>
                      <div className="department-actions">
                        <button className="action-btn-small">
                          <FiEye /> View Details
                        </button>
                        <button className="action-btn-small">
                          <FiEdit /> Manage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Analytics Widget */}
            <div className="dashboard__widget analytics-widget">
              <div className="widget__header">
                <h3>
                  <FiPieChart className="widget-icon" />
                  System Analytics
                </h3>
                <button className="view-all-btn">
                  View Full Report <FiTrendingUp />
                </button>
              </div>
              <div className="widget__content">
                <div className="analytics-grid">
                  <div className="chart-container">
                    <h4>Department Distribution</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={departmentDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {departmentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="chart-legend">
                      {departmentDistribution.map((entry) => (
                        <div key={entry.name} className="legend-item">
                          <div
                            className="legend-color"
                            style={{ backgroundColor: entry.fill }}
                          />
                          <span className="legend-label">{entry.name}</span>
                          <span className="legend-value">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="chart-container">
                    <h4>Monthly Trends</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="interns"
                          stackId="1"
                          stroke="#3254c5"
                          fill="#3254c5"
                        />
                        <Area
                          type="monotone"
                          dataKey="evaluations"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                        />
                        <Area
                          type="monotone"
                          dataKey="placements"
                          stackId="1"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="chart-legend">
                      <div className="legend-item">
                        <div
                          className="legend-color"
                          style={{ backgroundColor: "#3254c5" }}
                        />
                        <span className="legend-label">Total Interns</span>
                        <span className="legend-value">
                          {monthlyData[monthlyData.length - 1].interns}
                        </span>
                      </div>
                      <div className="legend-item">
                        <div
                          className="legend-color"
                          style={{ backgroundColor: "#10b981" }}
                        />
                        <span className="legend-label">Evaluations</span>
                        <span className="legend-value">
                          {monthlyData[monthlyData.length - 1].evaluations}
                        </span>
                      </div>
                      <div className="legend-item">
                        <div
                          className="legend-color"
                          style={{ backgroundColor: "#f59e0b" }}
                        />
                        <span className="legend-label">Placements</span>
                        <span className="legend-value">
                          {monthlyData[monthlyData.length - 1].placements}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard__right-column">
            {/* System Alerts Widget */}
            <div className="dashboard__widget alerts-widget">
              <div className="widget__header">
                <h3>
                  <FiAlertCircle className="widget-icon" />
                  System Alerts
                </h3>
                <span className="alert-count">{systemAlerts.length}</span>
              </div>
              <div className="widget__content">
                <div className="alerts-list">
                  {systemAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`alert-item alert-${alert.type}`}
                    >
                      <div className="alert-icon">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="alert-content">
                        <p className="alert-message">{alert.message}</p>
                        <span className="alert-time">{alert.timestamp}</span>
                      </div>
                      <button className="alert-action">
                        <FiMoreVertical />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button className="widget-footer-btn">
                <FiBell /> View All Alerts
              </button>
            </div>

            {/* Upcoming Events Widget */}
            {/* <div className="dashboard__widget events-widget">
              <div className="widget__header">
                <h3>
                  <FiCalendar className="widget-icon" />
                  Upcoming Events
                </h3>
                <button className="view-all-btn">
                  View Calendar <FiCalendar />
                </button>
              </div>
              <div className="widget__content">
                <div className="events-list">
                  {upcomingEvents.slice(0, 4).map((event) => (
                    <div key={event.id} className="event-item">
                      <div className="event-date">
                        <span className="event-day">{formatEventDate(event.date)}</span>
                        <span className="event-time">{event.time}</span>
                      </div>
                      <div className="event-content">
                        <div className="event-header">
                          <div className="event-icon">
                            {getEventIcon(event.type)}
                          </div>
                          <div
                            className="event-priority"
                            style={{ backgroundColor: getEventPriorityColor(event.priority) }}
                          />
                        </div>
                        <h4 className="event-title">{event.title}</h4>
                        <div className="event-meta">
                          {event.department && (
                            <span className="event-department">{event.department}</span>
                          )}
                          {event.attendees && (
                            <span className="event-attendees">
                              <FiUsers className="attendees-icon" />
                              {event.attendees} attendees
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="event-action">
                        <FiMoreVertical />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button className="widget-footer-btn">
                <FiCalendar /> View Full Calendar
              </button>
            </div> */}

            {/* Quick Actions Widget */}
            <div className="dashboard__widget quick-actions-widget">
              <div className="widget__header">
                <h3>
                  <FiSettings className="widget-icon" />
                  Quick Actions
                </h3>
              </div>
              <div className="widget__content">
                <div className="quick-actions-grid">
                  <div className="quick-action">
                    <FiPlus className="action-icon" />
                    <span>Add Coordinator</span>
                  </div>
                  <div className="quick-action">
                    <FiMail className="action-icon" />
                    <span>Send Message</span>
                  </div>
                  <div className="quick-action">
                    <FiFileText className="action-icon" />
                    <span>Generate Report</span>
                  </div>
                  <div className="quick-action">
                    <FiUsers className="action-icon" />
                    <span>View All Interns</span>
                  </div>
                  <div className="quick-action">
                    <FiSettings className="action-icon" />
                    <span>System Settings</span>
                  </div>
                  <div className="quick-action">
                    <FiBarChart className="action-icon" />
                    <span>Analytics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics Widget */}
            <div className="dashboard__widget performance-widget">
              <div className="widget__header">
                <h3>
                  <FiTrendingUp className="widget-icon" />
                  Performance Metrics
                </h3>
              </div>
              <div className="widget__content">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3254c5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activities Widget */}
            <div className="dashboard__widget activities-widget">
              <div className="widget__header">
                <h3>
                  <FiActivity className="widget-icon" />
                  Recent Activities
                </h3>
                <button className="view-all-btn">
                  View All <FiClock />
                </button>
              </div>
              <div className="widget__content">
                <div className="activities-list">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="activity-content">
                        <p className="activity-message">{activity.message}</p>
                        <div className="activity-meta">
                          <span className="activity-department">
                            {activity.department}
                          </span>
                          <span className="activity-separator">•</span>
                          <span className="activity-user">{activity.user}</span>
                          <span className="activity-separator">•</span>
                          <span className="activity-time">
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="widget-footer-btn">
                <FiActivity /> View Activity Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HODDashboard;
