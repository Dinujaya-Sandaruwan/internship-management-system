import { useState, useEffect } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaFilter,
  FaEllipsisH,
  FaRegBell,
  FaCheckCircle,
  FaAngleRight,
  FaTrashAlt,
  FaChevronDown,
  FaChevronUp,
  FaUserPlus,
  FaUserCheck,
  FaFileAlt,
  FaExclamationTriangle,
  FaCog,
  FaGraduationCap,
  FaClipboardCheck,
  FaChartLine,
  FaUsers,
  FaInfoCircle,
  FaUserTie,
  FaBuilding,
} from "react-icons/fa";

const CoordinatorNotificationsPage: React.FC = () => {
  // Sample coordinator data
  const [currentUser] = useState({
    name: "Dr. Chandima Jayasundara",
    avatar: "CJ",
    title: "Internship Coordinator",
    department: "Department of Computer Science",
    university: "University of Colombo",
    profileCompletion: 100,
  });

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterRead, setFilterRead] = useState<boolean | null>(null);

  // Sample notifications data with coordinator-specific types
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new_registration",
      title: "New Intern Registration",
      message:
        "Sahan Perera has registered for the Software Engineering internship program. Profile review required.",
      time: "15 minutes ago",
      isRead: false,
      date: new Date("2025-05-09"),
      actionLabel: "Review Profile",
      actionPath: "/coordinator/review-intern/45",
      subject: {
        name: "Sahan Perera",
        role: "Software Engineering Student",
        year: "3rd Year",
        avatar: "SP",
      },
    },
    {
      id: 2,
      type: "supervisor_match",
      title: "Supervisor Matching Request",
      message:
        "Dr. Kumara Jayasuriya has requested to supervise 3 new interns for the May 2025 batch.",
      time: "1 hour ago",
      isRead: false,
      date: new Date("2025-05-09"),
      actionLabel: "Review Request",
      actionPath: "/coordinator/supervisor-requests/12",
      subject: {
        name: "Dr. Kumara Jayasuriya",
        role: "Senior Lecturer",
        department: "Computer Science",
        avatar: "KJ",
      },
    },
    {
      id: 3,
      type: "evaluation_pending",
      title: "Evaluation Deadline Approaching",
      message:
        "Mid-term evaluations for 15 interns are due in 3 days. Reminder sent to supervisors.",
      time: "3 hours ago",
      isRead: false,
      date: new Date("2025-05-09"),
      actionLabel: "View Pending",
      actionPath: "/coordinator/evaluations/pending",
      priority: "high",
    },
    {
      id: 4,
      type: "report_approval",
      title: "Monthly Report Requires Approval",
      message:
        "April 2025 internship program report has been compiled and requires your approval before submission to the department.",
      time: "5 hours ago",
      isRead: true,
      date: new Date("2025-05-09"),
      actionLabel: "Review Report",
      actionPath: "/coordinator/reports/monthly/april-2025",
    },
    {
      id: 5,
      type: "calendar",
      title: "Internship Committee Meeting",
      message:
        "Monthly internship committee meeting scheduled for tomorrow at 2:00 PM in Conference Room A.",
      time: "Yesterday",
      isRead: true,
      date: new Date("2025-05-08"),
      actionLabel: "View Agenda",
      actionPath: "/coordinator/meetings/agenda/23",
    },
    {
      id: 6,
      type: "system_update",
      title: "System Maintenance Scheduled",
      message:
        "The internship management system will undergo maintenance on Sunday, May 11, from 2:00 AM to 5:00 AM.",
      time: "Yesterday",
      isRead: true,
      date: new Date("2025-05-08"),
      actionLabel: "Learn More",
      actionPath: "/announcements/maintenance",
      subject: {
        name: "System Administrator",
        role: "IT Department",
        avatar: "SA",
      },
    },
    {
      id: 7,
      type: "policy_update",
      title: "Internship Policy Update",
      message:
        "New guidelines for remote internship supervision have been approved by the faculty board.",
      time: "2 days ago",
      isRead: true,
      date: new Date("2025-05-07"),
      actionLabel: "View Guidelines",
      actionPath: "/coordinator/policies/remote-supervision",
      subject: {
        name: "Prof. Dilini Rajapaksha",
        role: "Dean, Faculty of Science",
        avatar: "DR",
      },
    },
    {
      id: 8,
      type: "compliance_issue",
      title: "Documentation Incomplete",
      message:
        "5 interns have incomplete documentation for their internship agreements. Follow-up required.",
      time: "3 days ago",
      isRead: false,
      date: new Date("2025-05-06"),
      actionLabel: "View Details",
      actionPath: "/coordinator/compliance/incomplete",
      priority: "medium",
    },
    {
      id: 9,
      type: "supervisor_match",
      title: "Supervisor Allocation Complete",
      message:
        "All 45 interns from the May 2025 batch have been successfully matched with supervisors.",
      time: "4 days ago",
      isRead: true,
      date: new Date("2025-05-05"),
      actionLabel: "View Allocations",
      actionPath: "/coordinator/allocations/may-2025",
    },
    {
      id: 10,
      type: "new_registration",
      title: "Batch Registration Complete",
      message:
        "Registration for the June 2025 internship batch is now complete with 52 registered students.",
      time: "1 week ago",
      isRead: true,
      date: new Date("2025-05-02"),
      actionLabel: "View Statistics",
      actionPath: "/coordinator/statistics/june-2025",
    },
    {
      id: 11,
      type: "evaluation_pending",
      title: "Final Evaluations Submitted",
      message:
        "All final evaluations for the April 2025 batch have been submitted. Ready for certification.",
      time: "1 week ago",
      isRead: true,
      date: new Date("2025-05-01"),
      actionLabel: "Generate Certificates",
      actionPath: "/coordinator/certificates/april-2025",
    },
  ]);

  // Get the count of unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // Mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  // Clear read notifications
  const clearReadNotifications = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => !notification.isRead)
    );
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_registration":
        return <FaUserPlus />;
      case "supervisor_match":
        return <FaUserCheck />;
      case "evaluation_pending":
        return <FaClipboardCheck />;
      case "report_approval":
        return <FaFileAlt />;
      case "calendar":
        return <FaCalendarAlt />;
      case "system_update":
        return <FaCog />;
      case "policy_update":
        return <FaGraduationCap />;
      case "compliance_issue":
        return <FaExclamationTriangle />;
      default:
        return <FaBell />;
    }
  };

  // Get notification color based on type
  const getNotificationClass = (type: string) => {
    switch (type) {
      case "new_registration":
        return "registration-notification";
      case "supervisor_match":
        return "match-notification";
      case "evaluation_pending":
        return "evaluation-notification";
      case "report_approval":
        return "report-notification";
      case "calendar":
        return "calendar-notification";
      case "system_update":
        return "system-notification";
      case "policy_update":
        return "policy-notification";
      case "compliance_issue":
        return "compliance-notification";
      default:
        return "";
    }
  };

  // Format date for grouping
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  // Group notifications by date
  const groupNotificationsByDate = () => {
    const groups: { [key: string]: any[] } = {};

    notifications
      .filter((notification) => {
        // Apply filters
        if (filterType && notification.type !== filterType) return false;
        if (filterRead !== null && notification.isRead !== filterRead)
          return false;
        if (
          filterDate &&
          formatDate(notification.date) !== filterDate &&
          filterDate !== "All"
        )
          return false;
        return true;
      })
      .forEach((notification) => {
        const dateKey = formatDate(notification.date);
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(notification);
      });

    return groups;
  };

  // Get unique dates for filter
  const getUniqueDates = () => {
    const dates = notifications.map((n) => formatDate(n.date));
    return ["All", ...new Set(dates)];
  };

  // Toggle filters panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterType(null);
    setFilterDate(null);
    setFilterRead(null);
  };

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

  // Check if there are active filters
  const hasActiveFilters =
    filterType !== null || filterDate !== null || filterRead !== null;

  // Grouped notifications by date
  const groupedNotifications = groupNotificationsByDate();

  return (
    <div className="dashboard coordinator-dashboard">
      {/* Main Content */}
      <div className="dashboard__main coordinator-notifications-page">
        {/* Header with highlighted title */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="coordinator-notifications-title">
              Notifications Center
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

        {/* Notifications content */}
        <div className="notifications-container">
          {/* Notifications toolbar */}
          <div className="notifications-toolbar">
            <div className="notifications-counts">
              <div className="count-item">
                <span className="count">{notifications.length}</span>
                <span className="label">Total</span>
              </div>
              <div className="count-item unread">
                <span className="count">{unreadCount}</span>
                <span className="label">Unread</span>
              </div>
            </div>

            <div className="notifications-actions">
              <button
                className="action-btn filter-btn"
                onClick={toggleFilters}
                aria-label="Filter notifications"
              >
                <FaFilter />
                <span>Filter</span>
                {showFilters ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button
                className="action-btn"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                aria-label="Mark all as read"
              >
                <FaCheckCircle />
                <span>Mark all read</span>
              </button>
              <button
                className="action-btn"
                onClick={clearReadNotifications}
                aria-label="Clear read notifications"
              >
                <FaTrashAlt />
                <span>Clear read</span>
              </button>
            </div>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="notifications-filters">
              <div className="filter-group">
                <label>Type</label>
                <div className="filter-options">
                  <button
                    className={`filter-option ${
                      filterType === null ? "active" : ""
                    }`}
                    onClick={() => setFilterType(null)}
                  >
                    All
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "new_registration" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("new_registration")}
                  >
                    Registrations
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "supervisor_match" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("supervisor_match")}
                  >
                    Supervisor
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "evaluation_pending" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("evaluation_pending")}
                  >
                    Evaluations
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "report_approval" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("report_approval")}
                  >
                    Reports
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "calendar" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("calendar")}
                  >
                    Calendar
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "compliance_issue" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("compliance_issue")}
                  >
                    Compliance
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "system_update" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("system_update")}
                  >
                    System
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "policy_update" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("policy_update")}
                  >
                    Policy
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <label>Date</label>
                <div className="filter-options">
                  {getUniqueDates().map((date) => (
                    <button
                      key={date}
                      className={`filter-option ${
                        filterDate === date ||
                        (date === "All" && filterDate === null)
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setFilterDate(date === "All" ? null : date)
                      }
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Status</label>
                <div className="filter-options">
                  <button
                    className={`filter-option ${
                      filterRead === null ? "active" : ""
                    }`}
                    onClick={() => setFilterRead(null)}
                  >
                    All
                  </button>
                  <button
                    className={`filter-option ${
                      filterRead === false ? "active" : ""
                    }`}
                    onClick={() => setFilterRead(false)}
                  >
                    Unread
                  </button>
                  <button
                    className={`filter-option ${
                      filterRead === true ? "active" : ""
                    }`}
                    onClick={() => setFilterRead(true)}
                  >
                    Read
                  </button>
                </div>
              </div>

              {hasActiveFilters && (
                <button className="reset-filters-btn" onClick={resetFilters}>
                  Reset Filters
                </button>
              )}
            </div>
          )}

          {/* Notifications list */}
          <div className="notifications-list">
            {Object.keys(groupedNotifications).length > 0 ? (
              Object.entries(groupedNotifications).map(([date, items]) => (
                <div key={date} className="notifications-group">
                  <div className="notifications-date">{date}</div>
                  {items.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${
                        notification.isRead ? "read" : "unread"
                      } ${getNotificationClass(notification.type)} ${
                        notification.priority
                          ? `priority-${notification.priority}`
                          : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="notification-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <div className="notification-header">
                          <h3 className="notification-title">
                            {notification.title}
                          </h3>
                          <span className="notification-time">
                            {notification.time}
                          </span>
                        </div>
                        <p className="notification-message">
                          {notification.message}
                        </p>
                        {notification.subject && (
                          <div className="notification-subject">
                            <div className="subject-avatar">
                              {notification.subject.avatar}
                            </div>
                            <div className="subject-info">
                              <span className="subject-name">
                                {notification.subject.name}
                              </span>
                              <span className="subject-role">
                                {notification.subject.role}
                                {notification.subject.department &&
                                  ` • ${notification.subject.department}`}
                                {notification.subject.year &&
                                  ` • ${notification.subject.year}`}
                              </span>
                            </div>
                          </div>
                        )}
                        {notification.actionLabel && (
                          <button className="notification-action">
                            {notification.actionLabel}
                            <FaAngleRight className="action-icon" />
                          </button>
                        )}
                      </div>
                      {!notification.isRead && (
                        <div className="notification-badge"></div>
                      )}
                      {notification.priority && (
                        <div
                          className={`priority-indicator priority-${notification.priority}`}
                        >
                          {notification.priority === "high" && (
                            <FaExclamationTriangle />
                          )}
                          {notification.priority === "medium" && (
                            <FaInfoCircle />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="no-notifications">
                <FaRegBell className="empty-icon" />
                <h3>No notifications found</h3>
                <p>
                  {hasActiveFilters
                    ? "Try changing your filter settings"
                    : "You're all caught up!"}
                </p>
                {hasActiveFilters && (
                  <button className="reset-filters-btn" onClick={resetFilters}>
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorNotificationsPage;
