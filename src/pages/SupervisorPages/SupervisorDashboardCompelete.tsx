import React, { useState } from "react";
import {
  FaUniversity,
  FaBuilding,
  FaUserTie,
  FaCalendarAlt,
  FaUsers,
  FaClipboardCheck,
  FaFileAlt,
  FaClock,
  FaChartLine,
  FaBell,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTasks,
  FaArrowRight,
  FaStar,
  FaTrophy,
  FaChartBar,
  FaEnvelope,
  FaUserGraduate,
  FaCalendarCheck,
  FaComments,
  FaEye,
  FaEdit,
  FaHourglassHalf,
  FaThumbsUp,
  FaRegCalendarPlus,
  FaClipboardList,
  FaBullseye,
  FaCalendarPlus,
} from "react-icons/fa";

interface Intern {
  id: number;
  name: string;
  department: string;
  progress: number;
  status: "active" | "on-break" | "completed";
  avatar: string;
  company: string;
  lastActivity: string;
  nextMeeting?: string;
  pendingTasks: number;
}

interface Notification {
  id: number;
  type: "report" | "evaluation" | "message" | "task" | "meeting";
  message: string;
  time: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
}

interface ScheduledEvent {
  id: number;
  title: string;
  type: "meeting" | "evaluation" | "deadline";
  time: string;
  date: string;
  intern?: string;
}

interface RecentActivity {
  id: number;
  type: "evaluation" | "report" | "meeting" | "goal";
  action: string;
  intern: string;
  time: string;
  icon: JSX.Element;
}

const SupervisorDashboardComplete: React.FC = () => {
  // Mock supervisor data with complete profile
  const [supervisor] = useState({
    name: "Dr. Kumara Jayasuriya",
    title: "Senior Software Developer",
    university: "University of Colombo",
    department: "Wso2 PLC",
    avatar: "KJ",
    profileCompletion: 100,
  });

  // Active interns
  const [activeInterns] = useState<Intern[]>([
    {
      id: 1,
      name: "Erandi Perera",
      department: "Software Engineering",
      progress: 65,
      status: "active",
      avatar: "EP",
      company: "TechCorp Solutions",
      lastActivity: "2 hours ago",
      nextMeeting: "Tomorrow, 10:00 AM",
      pendingTasks: 3,
    },
    {
      id: 2,
      name: "Kamal Silva",
      department: "Data Science",
      progress: 45,
      status: "active",
      avatar: "KS",
      company: "DataTech Labs",
      lastActivity: "5 hours ago",
      nextMeeting: "May 18, 2:00 PM",
      pendingTasks: 5,
    },
    {
      id: 3,
      name: "Nimali Fernando",
      department: "UI/UX Design",
      progress: 80,
      status: "active",
      avatar: "NF",
      company: "Creative Studios",
      lastActivity: "1 day ago",
      nextMeeting: "May 20, 3:30 PM",
      pendingTasks: 2,
    },
  ]);

  // Quick statistics
  const [quickStats] = useState({
    totalInterns: 5,
    activeInterns: 3,
    evaluationsSubmitted: 12,
    reportsReviewed: 28,
    meetingsThisWeek: 7,
    pendingEvaluations: 2,
    upcomingDeadlines: 4,
    goalsCompleted: 15,
  });

  // Recent notifications
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: "report",
      message: "Erandi Perera submitted monthly report for May",
      time: "2 hours ago",
      isRead: false,
      priority: "high",
    },
    {
      id: 2,
      type: "evaluation",
      message: "Evaluation deadline for Kamal Silva is tomorrow",
      time: "5 hours ago",
      isRead: false,
      priority: "high",
    },
    {
      id: 3,
      type: "meeting",
      message: "Meeting with Nimali Fernando rescheduled to 3:30 PM",
      time: "1 day ago",
      isRead: true,
      priority: "medium",
    },
  ]);

  // Upcoming schedule
  const [upcomingEvents] = useState<ScheduledEvent[]>([
    {
      id: 1,
      title: "Weekly Check-in with Erandi",
      type: "meeting",
      time: "10:00 AM",
      date: "Tomorrow",
      intern: "Erandi Perera",
    },
    {
      id: 2,
      title: "Mid-term Evaluation",
      type: "evaluation",
      time: "2:00 PM",
      date: "May 18",
      intern: "Kamal Silva",
    },
    {
      id: 3,
      title: "Report Submission Deadline",
      type: "deadline",
      time: "11:59 PM",
      date: "May 20",
    },
  ]);

  // Recent activities
  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      type: "evaluation",
      action: "Submitted evaluation",
      intern: "Ruwan Bandara",
      time: "3 hours ago",
      icon: <FaClipboardCheck />,
    },
    {
      id: 2,
      type: "report",
      action: "Reviewed report",
      intern: "Nimali Fernando",
      time: "5 hours ago",
      icon: <FaFileAlt />,
    },
    {
      id: 3,
      type: "meeting",
      action: "Completed meeting",
      intern: "Erandi Perera",
      time: "Yesterday",
      icon: <FaCalendarCheck />,
    },
    {
      id: 4,
      type: "goal",
      action: "Set new milestone",
      intern: "Kamal Silva",
      time: "2 days ago",
      icon: <FaBullseye />,
    },
  ]);

  // Helper functions
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

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

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "#4CAF50";
    if (progress >= 40) return "#FFC107";
    return "#FF5252";
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "report":
        return <FaFileAlt />;
      case "evaluation":
        return <FaClipboardCheck />;
      case "message":
        return <FaEnvelope />;
      case "task":
        return <FaTasks />;
      case "meeting":
        return <FaCalendarAlt />;
      default:
        return <FaBell />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <FaCalendarAlt />;
      case "evaluation":
        return <FaClipboardCheck />;
      case "deadline":
        return <FaClock />;
      default:
        return <FaCalendarAlt />;
    }
  };

  return (
    <div className="dashboard__main supervisor-main">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1>
            {getGreeting()}, {supervisor.name.split(" ")[1]}{" "}
            {supervisor.name.split(" ")[2]}
          </h1>
          <p>
            {/* <FaUniversity className="info-icon" /> {supervisor.university} | */}
            <FaBuilding className="info-icon" /> {supervisor.department} |
            <FaUserTie className="info-icon" /> {supervisor.title}
          </p>
        </div>
        <div className="dashboard__header-right">
          <div className="dashboard__date">
            <FaCalendarAlt className="date-icon" />
            {getTodayDate()}
          </div>
          <div className="dashboard__profile">
            <div className="dashboard__profile-image">
              <span>{supervisor.avatar}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="supervisor-quick-stats">
        <div className="stat-card active">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <div className="stat-value">{quickStats.activeInterns}</div>
            <div className="stat-label">Active Interns</div>
          </div>
          <div className="stat-indicator positive">
            <FaArrowRight />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaClipboardCheck />
          </div>
          <div className="stat-content">
            <div className="stat-value">{quickStats.evaluationsSubmitted}</div>
            <div className="stat-label">Evaluations Submitted</div>
          </div>
          <div className="stat-indicator">
            <span className="badge">
              {quickStats.pendingEvaluations} pending
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaFileAlt />
          </div>
          <div className="stat-content">
            <div className="stat-value">{quickStats.reportsReviewed}</div>
            <div className="stat-label">Reports Reviewed</div>
          </div>
          <div className="stat-indicator positive">+12%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-content">
            <div className="stat-value">{quickStats.meetingsThisWeek}</div>
            <div className="stat-label">Meetings This Week</div>
          </div>
          <div className="stat-indicator">
            <FaCalendarCheck />
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="supervisor-dashboard-content">
        {/* Left Column */}
        <div className="dashboard-left-column">
          {/* Active Interns Widget */}
          <div className="supervisor-widget active-interns-widget">
            <div className="widget-header">
              <h3>
                <FaUserGraduate className="widget-icon" /> Active Interns
              </h3>
              <button className="widget-action-btn">
                View All <FaArrowRight />
              </button>
            </div>
            <div className="widget-content">
              <div className="interns-list">
                {activeInterns.map((intern) => (
                  <div key={intern.id} className="intern-card">
                    <div className="intern-avatar">
                      <span>{intern.avatar}</span>
                      <div
                        className={`status-indicator ${intern.status}`}
                      ></div>
                    </div>
                    <div className="intern-info">
                      <div className="intern-name">{intern.name}</div>
                      <div className="intern-meta">
                        {intern.department} • {intern.company}
                      </div>
                      <div className="intern-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${intern.progress}%`,
                              backgroundColor: getProgressColor(
                                intern.progress
                              ),
                            }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {intern.progress}%
                        </span>
                      </div>
                      <div className="intern-actions">
                        <span className="action-item">
                          <FaClock /> {intern.lastActivity}
                        </span>
                        {intern.pendingTasks > 0 && (
                          <span className="action-item warning">
                            <FaTasks /> {intern.pendingTasks} tasks
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="intern-quick-actions">
                      <button className="quick-action-btn" title="View Profile">
                        <FaEye />
                      </button>
                      <button className="quick-action-btn" title="Send Message">
                        <FaEnvelope />
                      </button>
                      <button
                        className="quick-action-btn"
                        title="Schedule Meeting"
                      >
                        <FaCalendarPlus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities Widget */}
          <div className="supervisor-widget activities-widget">
            <div className="widget-header">
              <h3>
                <FaChartLine className="widget-icon" /> Recent Activities
              </h3>
              <button className="widget-action-btn">
                View All <FaArrowRight />
              </button>
            </div>
            <div className="widget-content">
              <div className="activities-timeline">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <div className="activity-action">{activity.action}</div>
                      <div className="activity-meta">
                        {activity.intern} • {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Overview Widget */}
          <div className="supervisor-widget performance-widget">
            <div className="widget-header">
              <h3>
                <FaChartBar className="widget-icon" /> Performance Overview
              </h3>
              <select className="period-selector">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Quarter</option>
              </select>
            </div>
            <div className="widget-content">
              <div className="performance-metrics">
                <div className="metric-item">
                  <div className="metric-label">Average Intern Progress</div>
                  <div className="metric-value">63%</div>
                  <div className="metric-chart">
                    <div className="mini-bar-chart">
                      <div className="bar" style={{ height: "60%" }}></div>
                      <div className="bar" style={{ height: "45%" }}></div>
                      <div className="bar" style={{ height: "80%" }}></div>
                      <div className="bar" style={{ height: "65%" }}></div>
                      <div className="bar" style={{ height: "70%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Goals Completed</div>
                  <div className="metric-value">15/20</div>
                  <div className="metric-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Evaluation Score Avg</div>
                  <div className="metric-value">4.2/5.0</div>
                  <div className="metric-stars">
                    <FaStar className="star filled" />
                    <FaStar className="star filled" />
                    <FaStar className="star filled" />
                    <FaStar className="star filled" />
                    <FaStar className="star" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-right-column">
          {/* Notifications Widget */}
          <div className="supervisor-widget notifications-widget">
            <div className="widget-header">
              <h3>
                <FaBell className="widget-icon" /> Recent Notifications
              </h3>
              <span className="notification-badge">
                {notifications.filter((n) => !n.isRead).length}
              </span>
            </div>
            <div className="widget-content">
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      !notification.isRead ? "unread" : ""
                    } ${notification.priority}`}
                  >
                    <div className="notification-icon">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-content">
                      <div className="notification-message">
                        {notification.message}
                      </div>
                      <div className="notification-time">
                        {notification.time}
                      </div>
                    </div>
                    {!notification.isRead && (
                      <div className="unread-indicator"></div>
                    )}
                  </div>
                ))}
              </div>
              <button className="widget-footer-btn">
                View All Notifications <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Upcoming Schedule Widget */}
          <div className="supervisor-widget schedule-widget">
            <div className="widget-header">
              <h3>
                <FaCalendarAlt className="widget-icon" /> Upcoming Schedule
              </h3>
              <button className="widget-action-btn">
                <FaRegCalendarPlus />
              </button>
            </div>
            <div className="widget-content">
              <div className="schedule-list">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="schedule-item">
                    <div className="schedule-date">
                      <div className="date-label">{event.date}</div>
                      <div className="time-label">{event.time}</div>
                    </div>
                    <div className="schedule-content">
                      <div className="schedule-icon">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="schedule-details">
                        <div className="schedule-title">{event.title}</div>
                        {event.intern && (
                          <div className="schedule-intern">{event.intern}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="widget-footer-btn">
                View Full Schedule <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Quick Actions Widget */}
          <div className="supervisor-widget quick-actions-widget">
            <div className="widget-header">
              <h3>
                <FaClipboardList className="widget-icon" /> Quick Actions
              </h3>
            </div>
            <div className="widget-content">
              <div className="quick-actions-grid">
                <button className="quick-action">
                  <FaClipboardCheck className="action-icon" />
                  <span>New Evaluation</span>
                </button>
                <button className="quick-action">
                  <FaFileAlt className="action-icon" />
                  <span>Review Reports</span>
                </button>
                <button className="quick-action">
                  <FaCalendarPlus className="action-icon" />
                  <span>Schedule Meeting</span>
                </button>
                <button className="quick-action">
                  <FaTasks className="action-icon" />
                  <span>Assign Task</span>
                </button>
                <button className="quick-action">
                  <FaComments className="action-icon" />
                  <span>Send Message</span>
                </button>
                <button className="quick-action">
                  <FaBullseye className="action-icon" />
                  <span>Set Goals</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pending Tasks Widget */}
          <div className="supervisor-widget pending-tasks-widget">
            <div className="widget-header">
              <h3>
                <FaHourglassHalf className="widget-icon" /> Pending Tasks
              </h3>
              <span className="task-count">
                {quickStats.pendingEvaluations + quickStats.upcomingDeadlines}
              </span>
            </div>
            <div className="widget-content">
              <div className="tasks-summary">
                <div className="task-summary-item urgent">
                  <FaExclamationTriangle className="task-icon" />
                  <div className="task-info">
                    <div className="task-count">
                      {quickStats.pendingEvaluations}
                    </div>
                    <div className="task-label">Pending Evaluations</div>
                  </div>
                </div>
                <div className="task-summary-item">
                  <FaClock className="task-icon" />
                  <div className="task-info">
                    <div className="task-count">
                      {quickStats.upcomingDeadlines}
                    </div>
                    <div className="task-label">Upcoming Deadlines</div>
                  </div>
                </div>
              </div>
              <button className="widget-footer-btn primary">
                View All Tasks <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboardComplete;
