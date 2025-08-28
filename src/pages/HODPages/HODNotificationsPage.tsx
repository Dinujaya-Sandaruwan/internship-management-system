import { useState } from "react";
import {
  FaBell,
  FaClipboardCheck,
  FaChartLine,
  FaCalendarAlt,
  FaInfoCircle,
  FaFilter,
  FaRegBell,
  FaCheckCircle,
  FaAngleRight,
  FaTrashAlt,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa";
import HODSideMenu from "../../components/HODSideMenu";

const HODNotificationsPage: React.FC = () => {
  // Sample user data
  const [currentUser] = useState({
    name: "Prof. Sampath Deegalla",
    avatar: "S",
    title: "Head of Department",
    department: "Information and Communication Technology",
  });

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterRead, setFilterRead] = useState<boolean | null>(null);

  // Sample notifications data with HOD-specific types
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "intern_evaluation",
      title: "Intern evaluation pending",
      message:
        "5 intern evaluations are pending your review for the ICT department.",
      time: "15 minutes ago",
      isRead: false,
      date: new Date("2025-05-09"),
      actionLabel: "Review Evaluations",
      actionPath: "/hod/evaluations",
      sender: {
        name: "Dr. Chandima Jayasundara",
        role: "Internship Coordinator",
        avatar: "C",
      },
    },
    {
      id: 2,
      type: "faculty_meeting",
      title: "Faculty meeting reminder",
      message:
        "Monthly faculty meeting scheduled for tomorrow at 2:00 PM in Conference Room A.",
      time: "1 hour ago",
      isRead: false,
      date: new Date("2025-05-09"),
      actionLabel: "View Agenda",
      actionPath: "/hod/meetings",
    },
    {
      id: 3,
      type: "curriculum_approval",
      title: "Curriculum update approval",
      message:
        "New curriculum proposal for Advanced Database Systems course requires your approval.",
      time: "3 hours ago",
      isRead: true,
      date: new Date("2025-05-09"),
      actionLabel: "Review Proposal",
      actionPath: "/hod/curriculum",
      sender: {
        name: "Dr. Nimal Jayawardena",
        role: "Senior Lecturer",
        avatar: "N",
      },
    },
    {
      id: 4,
      type: "admin",
      title: "Budget allocation update",
      message:
        "The department budget allocation for Q2 2025 has been finalized and is ready for review.",
      time: "Yesterday",
      isRead: true,
      date: new Date("2025-05-08"),
      actionLabel: "View Budget",
      actionPath: "/hod/budget",
      sender: {
        name: "Finance Department",
        role: "University Administration",
        avatar: "F",
      },
    },
    {
      id: 5,
      type: "intern_evaluation",
      title: "Intern performance report",
      message:
        "Monthly performance report for all department interns is now available.",
      time: "2 days ago",
      isRead: false,
      date: new Date("2025-05-07"),
      actionLabel: "View Report",
      actionPath: "/hod/reports",
      sender: {
        name: "Dr. Chandima Jayasundara",
        role: "Internship Coordinator",
        avatar: "C",
      },
    },
    {
      id: 6,
      type: "faculty_development",
      title: "Faculty development program",
      message:
        "Registration for the AI and Machine Learning workshop is now open for faculty members.",
      time: "3 days ago",
      isRead: true,
      date: new Date("2025-05-06"),
      actionLabel: "View Details",
      actionPath: "/hod/faculty-development",
    },
    {
      id: 7,
      type: "curriculum_approval",
      title: "Course schedule approval",
      message:
        "The revised course schedule for the upcoming semester requires your final approval.",
      time: "4 days ago",
      isRead: true,
      date: new Date("2025-05-05"),
      actionLabel: "Approve Schedule",
      actionPath: "/hod/schedule",
      sender: {
        name: "Academic Office",
        role: "University Administration",
        avatar: "A",
      },
    },
    {
      id: 8,
      type: "admin",
      title: "Department accreditation",
      message:
        "The department accreditation review is scheduled for next month. Please prepare required documents.",
      time: "1 week ago",
      isRead: true,
      date: new Date("2025-05-02"),
      actionLabel: "View Requirements",
      actionPath: "/hod/accreditation",
      sender: {
        name: "Quality Assurance Unit",
        role: "University Administration",
        avatar: "Q",
      },
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
      case "intern_evaluation":
        return <FaClipboardCheck />;
      case "faculty_meeting":
        return <FaUsers />;
      case "curriculum_approval":
        return <FaGraduationCap />;
      case "faculty_development":
        return <FaChartLine />;
      case "admin":
        return <FaInfoCircle />;
      default:
        return <FaBell />;
    }
  };

  // Get notification color based on type
  const getNotificationClass = (type: string) => {
    switch (type) {
      case "intern_evaluation":
        return "evaluation-notification";
      case "faculty_meeting":
        return "meeting-notification";
      case "curriculum_approval":
        return "curriculum-notification";
      case "faculty_development":
        return "development-notification";
      case "admin":
        return "admin-notification";
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
    const groups: { [key: string]: typeof notifications } = {};

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
    <div className="dashboard">
      {/* Sidebar */}
      {/* <HODSideMenu /> */}
      {/* Main Content */}
      <div className="dashboard__main notifications-page">
        {/* Header with highlighted title */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="notifications-title">Notifications Center</h1>
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
                      filterType === "intern_evaluation" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("intern_evaluation")}
                  >
                    Evaluations
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "faculty_meeting" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("faculty_meeting")}
                  >
                    Meetings
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "curriculum_approval" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("curriculum_approval")}
                  >
                    Curriculum
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "faculty_development" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("faculty_development")}
                  >
                    Development
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "admin" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("admin")}
                  >
                    Admin
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
                        (filterDate === null && date === "All")
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
                      } ${getNotificationClass(notification.type)}`}
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
                        {notification.sender && (
                          <div className="notification-sender">
                            <div className="sender-avatar">
                              {notification.sender.avatar}
                            </div>
                            <div className="sender-info">
                              <span className="sender-name">
                                {notification.sender.name}
                              </span>
                              <span className="sender-role">
                                {notification.sender.role}
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

export default HODNotificationsPage;
