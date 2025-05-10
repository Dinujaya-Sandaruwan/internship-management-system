import { useState, useEffect } from "react";
import {
  FaHome,
  FaEnvelope,
  FaBell,
  FaTasks,
  FaClipboardCheck,
  FaChartLine,
  FaUserEdit,
  FaUserTie,
  FaSignOutAlt,
  FaCheck,
  FaCalendarAlt,
  FaFileAlt,
  FaInfoCircle,
  FaFilter,
  FaEllipsisH,
  FaRegBell,
  FaUniversity,
  FaBuilding,
  FaLaptopCode,
  FaCheckCircle,
  FaExclamationTriangle,
  FaAngleRight,
  FaHistory,
  FaTrashAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const NotificationsPage: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("notifications");

  // Sample user data
  const [currentUser] = useState({
    name: "Erandi Katugampala",
    avatar: "E",
    title: "Software Engineering Intern",
    company: "Tech Solutions Ltd.",
  });

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterRead, setFilterRead] = useState<boolean | null>(null);

  // Sample notifications data with different types
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "supervisor_request",
      title: "New supervisor request",
      message: "Dr. Kumara Jayasuriya has sent you a supervision request.",
      time: "10 minutes ago",
      isRead: false,
      date: new Date("2025-05-09"),
      actionLabel: "View Request",
      actionPath: "/supervisors",
      sender: {
        name: "Dr. Kumara Jayasuriya",
        role: "Senior Lecturer",
        avatar: "K",
      },
    },
    {
      id: 2,
      type: "report_due",
      title: "Report submission reminder",
      message:
        "Your weekly progress report is due tomorrow. Please make sure to submit it on time.",
      time: "2 hours ago",
      isRead: false,
      date: new Date("2025-05-09"),
      actionLabel: "Submit Report",
      actionPath: "/reports/submit",
    },
    {
      id: 3,
      type: "calendar",
      title: "Upcoming meeting",
      message:
        "Team meeting scheduled for tomorrow at 10:00 AM. Don't forget to prepare your progress update.",
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
      sender: {
        name: "System Administrator",
        role: "IT Department",
        avatar: "A",
      },
    },
    {
      id: 5,
      type: "supervisor_request",
      title: "Supervisor feedback",
      message:
        "Prof. Sampath Deegalla has provided feedback on your latest project milestone.",
      time: "2 days ago",
      isRead: false,
      date: new Date("2025-05-07"),
      actionLabel: "View Feedback",
      actionPath: "/feedback",
      sender: {
        name: "Prof. Sampath Deegalla",
        role: "Head of Department",
        avatar: "S",
      },
    },
    {
      id: 6,
      type: "report_due",
      title: "Monthly report approval",
      message:
        "Your April 2025 monthly report has been approved by your academic supervisor.",
      time: "3 days ago",
      isRead: true,
      date: new Date("2025-05-06"),
      actionLabel: "View Report",
      actionPath: "/reports/view",
    },
    {
      id: 7,
      type: "calendar",
      title: "Workshop registration",
      message:
        "Registration for the React Advanced Patterns workshop is now open. Limited spots available.",
      time: "4 days ago",
      isRead: true,
      date: new Date("2025-05-05"),
      actionLabel: "Register Now",
      actionPath: "/workshops",
    },
    {
      id: 8,
      type: "admin",
      title: "Evaluation criteria updated",
      message:
        "The internship evaluation criteria have been updated. Please review the changes.",
      time: "1 week ago",
      isRead: true,
      date: new Date("2025-05-02"),
      actionLabel: "View Changes",
      actionPath: "/evaluation/criteria",
      sender: {
        name: "Dr. Chandima Jayasundara",
        role: "Internship Coordinator",
        avatar: "C",
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
      case "supervisor_request":
        return <FaUserTie />;
      case "report_due":
        return <FaFileAlt />;
      case "calendar":
        return <FaCalendarAlt />;
      case "admin":
        return <FaInfoCircle />;
      default:
        return <FaBell />;
    }
  };

  // Get notification color based on type
  const getNotificationClass = (type: string) => {
    switch (type) {
      case "supervisor_request":
        return "supervisor-notification";
      case "report_due":
        return "report-notification";
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
    <div className="dashboard">
      {/* Sidebar */}
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar-header">
          <div className="dashboard__logo">
            <img
              src="https://cmb.ac.lk/wp-content/uploads/logo-color.png"
              alt="UoC Logo"
            />
            <span>UoC IMS</span>
          </div>
        </div>

        <div className="dashboard__menu">
          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "home" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("home")}
          >
            <FaHome className="dashboard__menu-icon" />
            <span>Home</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "messages" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("messages")}
          >
            <FaEnvelope className="dashboard__menu-icon" />
            <span>Messages</span>
            <div className="dashboard__badge">3</div>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("notifications")}
          >
            <FaBell className="dashboard__menu-icon" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <div className="dashboard__badge">{unreadCount}</div>
            )}
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "goals" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("goals")}
          >
            <FaTasks className="dashboard__menu-icon" />
            <span>Goals</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "evaluation" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("evaluation")}
          >
            <FaClipboardCheck className="dashboard__menu-icon" />
            <span>Evaluation</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "progress" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("progress")}
          >
            <FaChartLine className="dashboard__menu-icon" />
            <span>Progress</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "updateData" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("updateData")}
          >
            <FaUserEdit className="dashboard__menu-icon" />
            <span>Update Data</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "supervisors" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("supervisors")}
          >
            <FaUserTie className="dashboard__menu-icon" />
            <span>Supervisor Requests</span>
          </div>
        </div>

        <div className="dashboard__menu-footer">
          <div className="dashboard__menu-item">
            <FaSignOutAlt className="dashboard__menu-icon" />
            <span>Sign Out</span>
          </div>
        </div>
      </div>

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
                      filterType === "supervisor_request" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("supervisor_request")}
                  >
                    Supervisor
                  </button>
                  <button
                    className={`filter-option ${
                      filterType === "report_due" ? "active" : ""
                    }`}
                    onClick={() => setFilterType("report_due")}
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

export default NotificationsPage;
