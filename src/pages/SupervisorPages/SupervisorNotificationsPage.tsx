import { useState, useEffect } from "react";
import {
  FaHome,
  FaEnvelope,
  FaBell,
  FaUsers,
  FaClipboardCheck,
  FaChartLine,
  FaUserEdit,
  FaFileAlt,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCheck,
  FaInfoCircle,
  FaFilter,
  FaEllipsisH,
  FaRegBell,
  FaUniversity,
  FaBuilding,
  FaCheckCircle,
  FaExclamationTriangle,
  FaAngleRight,
  FaHistory,
  FaTrashAlt,
  FaChevronDown,
  FaChevronUp,
  FaUserGraduate,
  FaUserTie,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaCog,
} from "react-icons/fa";
import SupervisorSideMenu from "../../components/SupervisorSideMenu";

const SupervisorNotificationsPage: React.FC = () => {
  // Active menu item state - this would be 'notifications' for this page
  const [activeMenuItem, setActiveMenuItem] = useState("notifications");

  // Sample supervisor data
  const [currentUser] = useState({
    name: "Dr. Kumara Jayasuriya",
    avatar: "KJ",
    title: "Senior Lecturer",
    department: "Department of Computer Science",
    university: "University of Colombo",
    profileCompletion: 85, // Higher completion for supervisor
  });

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterRead, setFilterRead] = useState<boolean | null>(null);

  // Sample notifications data with supervisor-specific types
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "intern_action",
      title: "Supervision Request Accepted",
      message: "Erandi Katugampala has accepted your supervision request.",
      time: "10 minutes ago",
      isRead: false,
      date: new Date("2025-05-09"),
      actionLabel: "View Intern Profile",
      actionPath: "/interns/profile/1",
      subject: {
        name: "Erandi Katugampala",
        role: "Software Engineering Intern",
        company: "Tech Solutions Ltd.",
        avatar: "E",
      },
    },
    {
      id: 2,
      type: "report_submission",
      title: "New Report Submitted",
      message:
        "Erandi Katugampala has submitted her May weekly progress report.",
      time: "2 hours ago",
      isRead: false,
      date: new Date("2025-05-09"),
      actionLabel: "Review Report",
      actionPath: "/reports/review/15",
      subject: {
        name: "Erandi Katugampala",
        role: "Software Engineering Intern",
        company: "Tech Solutions Ltd.",
        avatar: "E",
      },
    },
    {
      id: 3,
      type: "calendar",
      title: "Upcoming Evaluation Meeting",
      message:
        "Mid-term evaluation meeting with Erandi Katugampala scheduled for tomorrow at 10:00 AM.",
      time: "5 hours ago",
      isRead: true,
      date: new Date("2025-05-09"),
      actionLabel: "View Calendar",
      actionPath: "/calendar",
    },
    {
      id: 4,
      type: "admin",
      title: "System Maintenance",
      message:
        "The system will be undergoing maintenance on Sunday, May 11, 2025, from 2:00 AM to 5:00 AM.",
      time: "Yesterday",
      isRead: true,
      date: new Date("2025-05-08"),
      actionLabel: "Learn More",
      actionPath: "/announcements",
      subject: {
        name: "System Administrator",
        role: "IT Department",
        avatar: "A",
      },
    },
    {
      id: 5,
      type: "intern_action",
      title: "Supervision Request Declined",
      message: "Sahan Perera has declined your supervision request.",
      time: "2 days ago",
      isRead: false,
      date: new Date("2025-05-07"),
      actionLabel: "Find New Interns",
      actionPath: "/interns/available",
      subject: {
        name: "Sahan Perera",
        role: "Data Science Intern",
        company: "DataTech Corp",
        avatar: "S",
      },
    },
    {
      id: 6,
      type: "evaluation",
      title: "Evaluation Reminder",
      message: "Monthly evaluation for Erandi Katugampala is due in 3 days.",
      time: "3 days ago",
      isRead: true,
      date: new Date("2025-05-06"),
      actionLabel: "Complete Evaluation",
      actionPath: "/evaluations/new/1",
      subject: {
        name: "Erandi Katugampala",
        role: "Software Engineering Intern",
        company: "Tech Solutions Ltd.",
        avatar: "E",
      },
    },
    {
      id: 7,
      type: "calendar",
      title: "Department Meeting",
      message:
        "Monthly Department Meeting scheduled for May 15, 2025, at 2:00 PM.",
      time: "4 days ago",
      isRead: true,
      date: new Date("2025-05-05"),
      actionLabel: "Add to Calendar",
      actionPath: "/calendar/add/dept-meeting",
    },
    {
      id: 8,
      type: "admin",
      title: "Evaluation Criteria Updated",
      message:
        "The internship evaluation criteria have been updated for the current semester.",
      time: "1 week ago",
      isRead: true,
      date: new Date("2025-05-02"),
      actionLabel: "View Changes",
      actionPath: "/evaluation/criteria",
      subject: {
        name: "Dr. Chandima Jayasundara",
        role: "Internship Coordinator",
        avatar: "C",
      },
    },
    {
      id: 9,
      type: "report_submission",
      title: "Report Evaluation Complete",
      message:
        "Your evaluation of Dineth Gunawardena's April report has been recorded.",
      time: "1 week ago",
      isRead: true,
      date: new Date("2025-05-01"),
      actionLabel: "View Feedback",
      actionPath: "/reports/feedback/12",
      subject: {
        name: "Dineth Gunawardena",
        role: "UI/UX Design Intern",
        company: "CreativeTech Solutions",
        avatar: "D",
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
      case "intern_action":
        return <FaUserGraduate />;
      case "report_submission":
        return <FaFileAlt />;
      case "evaluation":
        return <FaClipboardCheck />;
      case "calendar":
        return <FaCalendarAlt />;
      case "admin":
        return <FaCog />;
      default:
        return <FaBell />;
    }
  };

  // Get notification color based on type
  const getNotificationClass = (type: string) => {
    switch (type) {
      case "intern_action":
        return "intern-notification";
      case "report_submission":
        return "report-notification";
      case "evaluation":
        return "evaluation-notification";
      case "calendar":
        return "calendar-notification";
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
    <div className="dashboard supervisor-dashboard">
      {/* Sidebar would be included in the layout component */}
      {/* <SupervisorSideMenu profileCompletion={currentUser.profileCompletion} /> */}

      {/* Main Content */}
      <div className="dashboard__main supervisor-notifications-page">
        {/* Header with highlighted title */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="supervisor-notifications-title">
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
                      filterType === "intern_action" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("intern_action")}
                  >
                    Intern Actions
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "report_submission" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("report_submission")}
                  >
                    Reports
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "evaluation" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("evaluation")}
                  >
                    Evaluations
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
                                {notification.subject.company &&
                                  ` • ${notification.subject.company}`}
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

export default SupervisorNotificationsPage;
