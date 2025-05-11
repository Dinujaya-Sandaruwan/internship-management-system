import { useState } from "react";
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
  FaCalendarAlt,
  FaCheck,
  FaExclamationTriangle,
  FaArrowRight,
  FaEllipsisH,
  FaGraduationCap,
  FaBuilding,
  FaLaptopCode,
  FaClock,
  FaRegClock,
  FaCheckCircle,
  FaInfoCircle,
  FaCircle,
  FaRegCalendarCheck,
  FaRegCalendarAlt,
  FaStar,
  FaCircleNotch,
  FaRegCheckCircle,
  FaBook,
  FaAward,
  FaUniversity,
  FaComment,
  FaTrophy,
  FaFileAlt,
  FaCheckDouble,
  FaExclamation,
  FaShieldAlt,
} from "react-icons/fa";
import SideMenu from "../../components/SideMenu";

const InternDashboard: React.FC = () => {
  // Sample user data
  const [user, setUser] = useState({
    name: "Erandi",
    profileCompletion: 40,
    internshipStart: new Date("2025-01-15"),
    internshipEnd: new Date("2025-07-15"),
    company: "Tech Solutions Ltd.",
    position: "Software Engineering Intern",
    supervisor: "Dr. Kumara Jayasuriya",
    avatar: "S",
  });

  // Calculate internship progress
  const calculateProgress = () => {
    const today = new Date();
    const start = user.internshipStart;
    const end = user.internshipEnd;
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const daysCompleted =
      (today.getTime() - start.getTime()) / (1000 * 3600 * 24);

    return Math.min(
      Math.max(Math.floor((daysCompleted / totalDays) * 100), 0),
      100
    );
  };

  // Sample goals data
  const [goals, setGoals] = useState([
    {
      id: 1,
      text: "Fix the error in CI/CD pipeline (line 341)",
      completed: false,
      priority: "high",
    },
    {
      id: 2,
      text: "Complete the React component documentation",
      completed: false,
      priority: "medium",
    },
    {
      id: 3,
      text: "Attend the weekly team meeting",
      completed: true,
      priority: "medium",
    },
    {
      id: 4,
      text: "Submit weekly progress report",
      completed: true,
      priority: "high",
    },
    {
      id: 5,
      text: "Meet with industry supervisor for feedback",
      completed: false,
      priority: "medium",
    },
    {
      id: 6,
      text: "Test new API endpoints",
      completed: false,
      priority: "low",
    },
  ]);

  // Toggle goal completion status
  const toggleGoalComplete = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  // Calendar events (sample data)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: new Date("2025-05-12T10:00:00"),
      type: "meeting",
      description:
        "Weekly sync with the development team to discuss progress and roadblocks.",
    },
    {
      id: 2,
      title: "Progress Report Due",
      date: new Date("2025-05-15T17:00:00"),
      type: "deadline",
      description:
        "Submit bi-weekly progress report to supervisor with all completed tasks.",
    },
    {
      id: 3,
      title: "Supervisor Check-in",
      date: new Date("2025-05-18T14:30:00"),
      type: "meeting",
      description:
        "One-on-one meeting with Dr. Jayasuriya to review internship progress.",
    },
    {
      id: 4,
      title: "Tech Workshop",
      date: new Date("2025-05-22T09:00:00"),
      type: "event",
      description:
        "Advanced React patterns workshop hosted by senior engineers.",
    },
  ]);

  // Quick stats
  const quickStats = [
    {
      id: 1,
      title: "Tasks Completed",
      value: "8",
      icon: <FaCheckDouble />,
      trend: "+3 this week",
      trendUp: true,
    },
    {
      id: 2,
      title: "Meetings Attended",
      value: "12",
      icon: <FaComment />,
      trend: "+2 this week",
      trendUp: true,
    },
    {
      id: 3,
      title: "Learning Hours",
      value: "42",
      icon: <FaBook />,
      trend: "+5 this week",
      trendUp: true,
    },
    {
      id: 4,
      title: "Next Evaluation",
      value: "May 24",
      icon: <FaFileAlt />,
      trend: "In 16 days",
      trendUp: null,
    },
  ];

  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("home");

  // Current month for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Selected date for calendar
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Get days in month for calendar
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 0, events: [] });
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === i &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });

      days.push({ day: i, events: dayEvents });
    }

    return days;
  };

  // Format the current month for display
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Navigate to next or previous month
  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
    setSelectedDate(null);
  };

  // Handle date selection
  const handleDateClick = (day: number, events: any[]) => {
    setSelectedDate(day);
  };

  // Get selected day events
  const getSelectedDayEvents = () => {
    if (selectedDate === null) return [];

    const days = getDaysInMonth(currentMonth);
    const dayIndex = days.findIndex((day) => day.day === selectedDate);

    if (dayIndex === -1) return [];
    return days[dayIndex].events;
  };

  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get days for the current month
  const days = getDaysInMonth(currentMonth);

  // Get remaining days for internship
  const getRemainingDays = () => {
    const today = new Date();
    const end = new Date(user.internshipEnd);
    const remainingDays = Math.max(
      0,
      Math.ceil((end.getTime() - today.getTime()) / (1000 * 3600 * 24))
    );
    return remainingDays;
  };

  // Get time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
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

  // Format date for milestone display
  const formatMilestoneDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Calculate internship milestones
  const calculateMilestones = () => {
    const startDate = new Date(user.internshipStart);
    const endDate = new Date(user.internshipEnd);
    const totalDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    const milestone1 = new Date(startDate.getTime());
    milestone1.setDate(startDate.getDate() + Math.floor(totalDays * 0.25));

    const milestone2 = new Date(startDate.getTime());
    milestone2.setDate(startDate.getDate() + Math.floor(totalDays * 0.5));

    const milestone3 = new Date(startDate.getTime());
    milestone3.setDate(startDate.getDate() + Math.floor(totalDays * 0.75));

    return [
      { label: "Start", date: startDate, completed: true },
      { label: "25%", date: milestone1, completed: new Date() >= milestone1 },
      { label: "50%", date: milestone2, completed: new Date() >= milestone2 },
      { label: "75%", date: milestone3, completed: new Date() >= milestone3 },
      { label: "End", date: endDate, completed: new Date() >= endDate },
    ];
  };

  const milestones = calculateMilestones();

  return (
    <div className="dashboard">
      {/* Sidebar with darker gradient */}
      <SideMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />

      {/* Main Content */}
      <div className="dashboard__main">
        {/* Header with greeting */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1>
              {getGreeting()}, {user.name}
            </h1>
            <p>
              <FaUniversity className="info-icon" /> University of Colombo |
              <FaBuilding className="info-icon" /> {user.company} |
              <FaLaptopCode className="info-icon" /> {user.position}
            </p>
          </div>
          <div className="dashboard__header-right">
            <div className="dashboard__date">
              <FaCalendarAlt className="date-icon" />
              {getTodayDate()}
            </div>
            <div className="dashboard__profile">
              <div className="dashboard__profile-image">
                <span>{user.avatar}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="dashboard__content">
          {/* Quick Stats */}
          <div className="dashboard__quick-stats">
            {quickStats.map((stat) => (
              <div key={stat.id} className="quick-stat-card">
                <div className="quick-stat-icon">{stat.icon}</div>
                <div className="quick-stat-content">
                  <h3>{stat.title}</h3>
                  <div className="quick-stat-value">{stat.value}</div>
                  <div
                    className={`quick-stat-trend ${
                      stat.trendUp === true
                        ? "trend-up"
                        : stat.trendUp === false
                        ? "trend-down"
                        : "trend-neutral"
                    }`}
                  >
                    {stat.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Profile completion alert - Modified to look like a warning */}
          <div className="dashboard__alert">
            <div className="dashboard__alert-icon">
              <FaExclamationTriangle /> {/* Warning triangle icon */}
            </div>
            <div className="dashboard__alert-content">
              <h3>WARNING: Complete Your Profile</h3>
              <p>
                Your profile is only {user.profileCompletion}% complete.
                Incomplete profiles may prevent you from accessing certain
                system features and reduce opportunities for placement matching.
              </p>
              <button className="dashboard__alert-button">
                Update Profile Now <FaArrowRight />
              </button>
            </div>
            <div className="dashboard__alert-progress">
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${user.profileCompletion}%` }}
                ></div>
              </div>
              <span>{user.profileCompletion}%</span>
            </div>
          </div>

          {/* Dashboard widgets */}
          <div className="dashboard__widgets">
            {/* Left column - Progress and Goals */}
            <div className="dashboard__column-left">
              {/* Internship Progress widget - Redesigned to reduce whitespace */}
              <div className="dashboard__widget dashboard__progress-widget">
                <div className="widget__header">
                  <h3>
                    <FaChartLine className="widget-icon" /> Internship Progress
                  </h3>
                </div>
                <div className="widget__content">
                  <div className="progress-container">
                    {/* Redesigned progress overview with less whitespace */}
                    <div className="progress-overview">
                      <div className="progress-ring-container">
                        <div className="progress-ring">
                          <svg width="110" height="110" viewBox="0 0 110 110">
                            <g transform="rotate(-90 55 55)">
                              <circle
                                r="45"
                                cx="55"
                                cy="55"
                                fill="transparent"
                                stroke="#c1c8e4"
                                strokeWidth="10"
                              />
                              <circle
                                r="45"
                                cx="55"
                                cy="55"
                                fill="transparent"
                                stroke="url(#progressRingGradient)"
                                strokeWidth="10"
                                strokeDasharray={2 * Math.PI * 45}
                                strokeDashoffset={
                                  2 *
                                  Math.PI *
                                  45 *
                                  (1 - calculateProgress() / 100)
                                }
                                strokeLinecap="round"
                              />
                              <defs>
                                <linearGradient
                                  id="progressRingGradient"
                                  x1="0%"
                                  y1="0%"
                                  x2="100%"
                                  y2="0%"
                                >
                                  <stop offset="0%" stopColor="#3254c5" />
                                  <stop offset="100%" stopColor="#7030b8" />
                                </linearGradient>
                              </defs>
                            </g>
                            <text
                              x="55"
                              y="50"
                              textAnchor="middle"
                              fill="#323b4c"
                              fontWeight="bold"
                              fontSize="20px"
                            >
                              {calculateProgress()}%
                            </text>
                            <text
                              x="55"
                              y="70"
                              textAnchor="middle"
                              fill="#5d6578"
                              fontSize="10px"
                            >
                              Completed
                            </text>
                          </svg>
                        </div>
                      </div>

                      <div className="progress-stats-container">
                        <div className="progress-stats-item">
                          <div className="progress-stat-value">
                            {getRemainingDays()}
                          </div>
                          <div className="progress-stat-label">Days Left</div>
                        </div>
                        <div className="progress-stats-divider"></div>
                        <div className="progress-stats-item">
                          <div className="progress-stat-value">180</div>
                          <div className="progress-stat-label">Total Days</div>
                        </div>
                      </div>
                    </div>

                    {/* More compact timeline with less padding */}
                    <div className="progress-timeline">
                      <div className="timeline-track">
                        {milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className={`timeline-milestone ${
                              milestone.completed ? "completed" : ""
                            }`}
                            style={{
                              left: `${
                                (index / (milestones.length - 1)) * 100
                              }%`,
                            }}
                          >
                            <div className="milestone-dot"></div>
                            <div className="milestone-label">
                              {milestone.label}
                            </div>
                            <div className="milestone-date">
                              {formatMilestoneDate(milestone.date)}
                            </div>
                          </div>
                        ))}
                        <div
                          className="timeline-progress"
                          style={{
                            width: `${calculateProgress()}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goals widget with darker styling */}
              <div className="dashboard__widget dashboard__goals-widget">
                <div className="widget__header">
                  <h3>
                    <FaTasks className="widget-icon" /> Goals & Tasks
                  </h3>
                  <button className="widget__action-btn">
                    <FaEllipsisH />
                  </button>
                </div>
                <div className="widget__content">
                  <div className="goals-list">
                    {goals
                      .sort((a, b) => {
                        // Sort incomplete goals first, then by priority, then completed goals
                        if (a.completed !== b.completed)
                          return a.completed ? 1 : -1;

                        if (!a.completed) {
                          const priorityValues = { high: 3, medium: 2, low: 1 };
                          return (
                            priorityValues[
                              b.priority as keyof typeof priorityValues
                            ] -
                            priorityValues[
                              a.priority as keyof typeof priorityValues
                            ]
                          );
                        }

                        return 0;
                      })
                      .map((goal) => (
                        <div
                          key={goal.id}
                          className={`goal-item ${
                            goal.completed ? "completed" : ""
                          } priority-${goal.priority}`}
                          onClick={() => toggleGoalComplete(goal.id)}
                        >
                          <div className="goal-checkbox">
                            {goal.completed ? (
                              <FaCheckCircle className="check-icon" />
                            ) : (
                              <FaRegCheckCircle className="empty-check-icon" />
                            )}
                          </div>
                          <div className="goal-content">
                            <div className="goal-text">{goal.text}</div>
                            <div className="goal-priority">
                              {!goal.completed && (
                                <>
                                  {goal.priority === "high" && (
                                    <span className="priority high">
                                      High Priority
                                    </span>
                                  )}
                                  {goal.priority === "medium" && (
                                    <span className="priority medium">
                                      Medium Priority
                                    </span>
                                  )}
                                  {goal.priority === "low" && (
                                    <span className="priority low">
                                      Low Priority
                                    </span>
                                  )}
                                </>
                              )}
                              {goal.completed && (
                                <span className="completed-text">
                                  <FaCheck /> Completed
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <button className="widget__footer-btn">
                    See All Goals <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>

            {/* Right column - Calendar */}
            <div className="dashboard__column-right">
              {/* Calendar widget with darker styling */}
              <div className="dashboard__widget dashboard__calendar-widget">
                <div className="widget__header">
                  <h3>
                    <FaCalendarAlt className="widget-icon" /> Calendar
                  </h3>
                  <div className="calendar-nav">
                    <button onClick={() => changeMonth(-1)}>&lt;</button>
                    <span>{formatMonth(currentMonth)}</span>
                    <button onClick={() => changeMonth(1)}>&gt;</button>
                  </div>
                </div>
                <div className="widget__content">
                  <div className="calendar">
                    <div className="calendar-header">
                      {daysOfWeek.map((day) => (
                        <div
                          key={day}
                          className="calendar-cell calendar-header-cell"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="calendar-grid">
                      {days.map((day, index) => (
                        <div
                          key={index}
                          className={`calendar-cell ${
                            day.day === 0 ? "empty-day" : ""
                          } ${day.events.length > 0 ? "has-events" : ""} ${
                            selectedDate === day.day ? "selected" : ""
                          }`}
                          onClick={() =>
                            day.day !== 0 &&
                            handleDateClick(day.day, day.events)
                          }
                        >
                          {day.day !== 0 && (
                            <>
                              <span className="calendar-day-number">
                                {day.day}
                              </span>
                              {day.events.length > 0 && (
                                <div className="calendar-event-dots">
                                  {day.events.slice(0, 3).map((event, idx) => (
                                    <span
                                      key={idx}
                                      className={`event-dot event-${event.type}`}
                                    ></span>
                                  ))}
                                  {day.events.length > 3 && (
                                    <span className="event-dot-more">+</span>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="calendar-event-details">
                    {selectedDate ? (
                      <>
                        <h4 className="event-date-header">
                          <FaRegCalendarCheck className="event-header-icon" />
                          Selected Date:{" "}
                          {new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            selectedDate
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </h4>

                        {getSelectedDayEvents().length > 0 ? (
                          <div className="event-list">
                            {getSelectedDayEvents().map((event) => (
                              <div
                                key={event.id}
                                className={`event-card event-${event.type}`}
                              >
                                <div className="event-time">
                                  <FaRegCalendarAlt className="event-time-icon" />
                                  {new Date(event.date).toLocaleTimeString(
                                    "en-US",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </div>
                                <div className="event-details">
                                  <div className="event-title">
                                    {event.title}
                                  </div>
                                  <div className="event-description">
                                    {event.description}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="no-events">
                            <p>No events scheduled for this date.</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="upcoming-events">
                        <h4 className="event-date-header">
                          <FaRegCalendarCheck className="event-header-icon" />
                          Upcoming Events
                        </h4>

                        {events
                          .filter((event) => new Date(event.date) >= new Date())
                          .sort(
                            (a, b) =>
                              new Date(a.date).getTime() -
                              new Date(b.date).getTime()
                          )
                          .slice(0, 3)
                          .map((event) => (
                            <div
                              key={event.id}
                              className={`event-card event-${event.type}`}
                            >
                              <div className="event-time">
                                <FaRegCalendarAlt className="event-time-icon" />
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                              <div className="event-details">
                                <div className="event-title">{event.title}</div>
                                <div className="event-description">
                                  {event.description}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievements Widget with darker styling */}
              <div className="dashboard__widget dashboard__achievements-widget">
                <div className="widget__header">
                  <h3>
                    <FaTrophy className="widget-icon" /> Recent Achievements
                  </h3>
                </div>
                <div className="widget__content">
                  <div className="achievements-list">
                    <div className="achievement-item">
                      <div className="achievement-icon">
                        <FaStar />
                      </div>
                      <div className="achievement-content">
                        <div className="achievement-title">
                          Team Collaboration Award
                        </div>
                        <div className="achievement-date">April 28, 2025</div>
                      </div>
                    </div>
                    <div className="achievement-item">
                      <div className="achievement-icon">
                        <FaGraduationCap />
                      </div>
                      <div className="achievement-content">
                        <div className="achievement-title">
                          Advanced React Training Completed
                        </div>
                        <div className="achievement-date">May 2, 2025</div>
                      </div>
                    </div>
                    <div className="achievement-item">
                      <div className="achievement-icon">
                        <FaShieldAlt />
                      </div>
                      <div className="achievement-content">
                        <div className="achievement-title">
                          Security Certification Badge
                        </div>
                        <div className="achievement-date">May 6, 2025</div>
                      </div>
                    </div>
                  </div>
                  <button className="widget__footer-btn">
                    View All Achievements <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternDashboard;
