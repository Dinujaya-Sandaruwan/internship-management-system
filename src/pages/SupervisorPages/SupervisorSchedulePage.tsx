import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRegCalendarCheck,
  FaRegCalendarAlt,
  FaTimes,
  FaUser,
  FaMapMarkerAlt,
  FaStickyNote,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBell,
  FaVideo,
  FaPhoneAlt,
  FaDesktop,
} from "react-icons/fa";

interface Event {
  id: number;
  title: string;
  date: Date;
  type: "meeting" | "deadline" | "event" | "evaluation" | "report";
  description: string;
  location?: string;
  attendees?: string[];
  createdBy?: string;
  internId?: number | null;
}

interface Intern {
  id: number;
  name: string;
  department: string;
  progress: number;
  avatar: string;
}

const SupervisorSchedulePage: React.FC = () => {
  // Sample interns data
  const [interns] = useState<Intern[]>([
    {
      id: 1,
      name: "Erandi Perera",
      department: "Software Engineering",
      progress: 65,
      avatar: "E",
    },
    {
      id: 2,
      name: "Kamal Silva",
      department: "Data Science",
      progress: 45,
      avatar: "K",
    },
    {
      id: 3,
      name: "Nimali Fernando",
      department: "UI/UX Design",
      progress: 80,
      avatar: "N",
    },
    {
      id: 4,
      name: "Ruwan Bandara",
      department: "DevOps",
      progress: 55,
      avatar: "R",
    },
  ]);

  // Selected intern state
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [showInternDropdown, setShowInternDropdown] = useState(false);

  // Supervisor events
  const [supervisorEvents, setSupervisorEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Department Meeting",
      date: new Date("2025-05-20T14:00:00"),
      type: "meeting",
      description: "Monthly department sync with all supervisors",
      location: "Conference Room A",
      createdBy: "HOD",
    },
    {
      id: 2,
      title: "Internship Coordinator Review",
      date: new Date("2025-05-25T10:00:00"),
      type: "meeting",
      description: "Quarterly review with internship coordinator",
      location: "Virtual - Teams",
      createdBy: "Coordinator",
    },
    {
      id: 3,
      title: "Mid-term Evaluations Due",
      date: new Date("2025-05-30T17:00:00"),
      type: "deadline",
      description: "Submit all intern mid-term evaluations",
      createdBy: "System",
    },
  ]);

  // Intern events (different for each intern)
  const [internEvents, setInternEvents] = useState<Event[]>([
    {
      id: 101,
      title: "Weekly Check-in",
      date: new Date("2025-05-18T14:30:00"),
      type: "meeting",
      description: "One-on-one meeting with supervisor",
      location: "Supervisor's Office",
      internId: 1,
    },
    {
      id: 102,
      title: "Progress Report Due",
      date: new Date("2025-05-22T17:00:00"),
      type: "deadline",
      description: "Submit bi-weekly progress report",
      internId: 1,
    },
    {
      id: 103,
      title: "Tech Workshop",
      date: new Date("2025-05-24T09:00:00"),
      type: "event",
      description: "Advanced React patterns workshop",
      location: "Training Room",
      internId: 1,
    },
  ]);

  // Calendar states
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [eventTarget, setEventTarget] = useState<"supervisor" | "intern">(
    "supervisor"
  );
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  // New event form state
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: new Date(),
    type: "meeting",
    description: "",
    location: "",
  });

  // Get today's date formatted
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

  // Format month for display
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Navigate months
  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
    setSelectedDate(null);
  };

  // Get days in month for calendar
  const getDaysInMonth = (date: Date, events: Event[]) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    // Add empty slots for days before the 1st
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

  // Handle date selection
  const handleDateClick = (day: number) => {
    if (day !== 0) {
      setSelectedDate(day);
    }
  };

  // Get events for selected date
  const getSelectedDateEvents = (events: Event[]) => {
    if (selectedDate === null) return [];

    const selectedDateObj = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      selectedDate
    );

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === selectedDateObj.getDate() &&
        eventDate.getMonth() === selectedDateObj.getMonth() &&
        eventDate.getFullYear() === selectedDateObj.getFullYear()
      );
    });
  };

  // Get filtered intern events
  const getInternEventsForSelectedIntern = () => {
    if (!selectedIntern) return [];
    return internEvents.filter((event) => event.internId === selectedIntern.id);
  };

  // Handle add event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.description) return;

    const event: Event = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date || new Date(),
      type: newEvent.type || "meeting",
      description: newEvent.description,
      location: newEvent.location,
      createdBy: "Supervisor",
      internId:
        eventTarget === "intern" && selectedIntern ? selectedIntern.id : null,
    };

    if (eventTarget === "supervisor") {
      setSupervisorEvents([...supervisorEvents, event]);
    } else if (selectedIntern) {
      setInternEvents([...internEvents, event]);
    }

    // Reset form
    setNewEvent({
      title: "",
      date: new Date(),
      type: "meeting",
      description: "",
      location: "",
    });
    setShowAddEventModal(false);
  };

  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get event type icon
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <FaVideo />;
      case "deadline":
        return <FaExclamationTriangle />;
      case "event":
        return <FaCalendarAlt />;
      case "evaluation":
        return <FaCheckCircle />;
      case "report":
        return <FaRegCalendarCheck />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <div className="dashboard__main supervisor-schedule-page">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1>Schedule Management</h1>
          <p>Manage your calendar and intern schedules</p>
        </div>
        <div className="dashboard__header-right">
          <div className="dashboard__date">
            <FaCalendarAlt className="date-icon" />
            {getTodayDate()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="schedule-content">
        {/* Controls Bar */}
        <div className="schedule-controls">
          <div className="controls-left">
            {/* Intern Selector */}
            <div className="intern-selector">
              <button
                className="intern-selector-button"
                onClick={() => setShowInternDropdown(!showInternDropdown)}
              >
                <FaUsers className="selector-icon" />
                <span>
                  {selectedIntern ? selectedIntern.name : "Select an Intern"}
                </span>
                <FaChevronDown
                  className={`dropdown-icon ${
                    showInternDropdown ? "open" : ""
                  }`}
                />
              </button>

              {showInternDropdown && (
                <div className="intern-dropdown">
                  <div className="dropdown-header">Select Intern</div>
                  {interns.map((intern) => (
                    <div
                      key={intern.id}
                      className={`intern-option ${
                        selectedIntern?.id === intern.id ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedIntern(intern);
                        setShowInternDropdown(false);
                      }}
                    >
                      <div className="intern-avatar">{intern.avatar}</div>
                      <div className="intern-info">
                        <div className="intern-name">{intern.name}</div>
                        <div className="intern-dept">{intern.department}</div>
                      </div>
                      <div className="intern-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${intern.progress}%` }}
                          />
                        </div>
                        <span className="progress-text">
                          {intern.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="view-mode-toggle">
              <button
                className={`mode-btn ${viewMode === "month" ? "active" : ""}`}
                onClick={() => setViewMode("month")}
              >
                Month
              </button>
              <button
                className={`mode-btn ${viewMode === "week" ? "active" : ""}`}
                onClick={() => setViewMode("week")}
              >
                Week
              </button>
            </div>
          </div>

          <div className="controls-right">
            <button
              className="add-event-btn"
              onClick={() => setShowAddEventModal(true)}
            >
              <FaPlus />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* Calendars Container */}
        <div className="calendars-container">
          {/* Supervisor Calendar */}
          <div className="calendar-section supervisor-calendar">
            <div className="calendar-header">
              <h3>
                <FaUser className="calendar-icon" />
                Your Calendar
              </h3>
              <div className="calendar-nav">
                <button className="nav-btn" onClick={() => changeMonth(-1)}>
                  <FaChevronLeft />
                </button>
                <span className="current-month">
                  {formatMonth(currentMonth)}
                </span>
                <button className="nav-btn" onClick={() => changeMonth(1)}>
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="calendar-body">
              <div className="calendar-weekdays">
                {daysOfWeek.map((day) => (
                  <div key={day} className="weekday-cell">
                    {day}
                  </div>
                ))}
              </div>

              <div className="calendar-grid">
                {getDaysInMonth(currentMonth, supervisorEvents).map(
                  (day, index) => (
                    <div
                      key={index}
                      className={`calendar-cell ${
                        day.day === 0 ? "empty" : ""
                      } ${day.events.length > 0 ? "has-events" : ""} ${
                        selectedDate === day.day ? "selected" : ""
                      } ${
                        day.day === new Date().getDate() &&
                        currentMonth.getMonth() === new Date().getMonth() &&
                        currentMonth.getFullYear() === new Date().getFullYear()
                          ? "today"
                          : ""
                      }`}
                      onClick={() => handleDateClick(day.day)}
                    >
                      {day.day !== 0 && (
                        <>
                          <span className="day-number">{day.day}</span>
                          {day.events.length > 0 && (
                            <div className="event-indicators">
                              {day.events.slice(0, 3).map((event, idx) => (
                                <span
                                  key={idx}
                                  className={`event-dot ${event.type}`}
                                  title={event.title}
                                />
                              ))}
                              {day.events.length > 3 && (
                                <span className="event-more">
                                  +{day.events.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Supervisor Events List */}
              <div className="events-list">
                <h4>
                  <FaRegCalendarCheck />
                  {selectedDate
                    ? `Events on ${new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        selectedDate
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}`
                    : "Upcoming Events"}
                </h4>

                <div className="events-container">
                  {(selectedDate
                    ? getSelectedDateEvents(supervisorEvents)
                    : supervisorEvents
                        .filter((e) => new Date(e.date) >= new Date())
                        .slice(0, 5)
                  ).map((event) => (
                    <div key={event.id} className={`event-card ${event.type}`}>
                      <div className="event-icon">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="event-details">
                        <div className="event-title">{event.title}</div>
                        <div className="event-meta">
                          <span className="event-time">
                            <FaClock />
                            {new Date(event.date).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {event.location && (
                            <span className="event-location">
                              <FaMapMarkerAlt />
                              {event.location}
                            </span>
                          )}
                          {event.createdBy && (
                            <span className="event-creator">
                              Created by: {event.createdBy}
                            </span>
                          )}
                        </div>
                        <div className="event-description">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  ))}

                  {(selectedDate
                    ? getSelectedDateEvents(supervisorEvents)
                    : supervisorEvents.filter(
                        (e) => new Date(e.date) >= new Date()
                      )
                  ).length === 0 && (
                    <div className="no-events">
                      <FaCalendarAlt />
                      <p>No events scheduled</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Intern Calendar */}
          {selectedIntern && (
            <div className="calendar-section intern-calendar">
              <div className="calendar-header">
                <h3>
                  <FaUsers className="calendar-icon" />
                  {selectedIntern.name}'s Calendar
                </h3>
                <div className="intern-badge">
                  <span className="badge-avatar">{selectedIntern.avatar}</span>
                  <span className="badge-dept">
                    {selectedIntern.department}
                  </span>
                </div>
              </div>

              <div className="calendar-body">
                <div className="calendar-weekdays">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="weekday-cell">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="calendar-grid">
                  {getDaysInMonth(
                    currentMonth,
                    getInternEventsForSelectedIntern()
                  ).map((day, index) => (
                    <div
                      key={index}
                      className={`calendar-cell ${
                        day.day === 0 ? "empty" : ""
                      } ${day.events.length > 0 ? "has-events" : ""} ${
                        selectedDate === day.day ? "selected" : ""
                      } ${
                        day.day === new Date().getDate() &&
                        currentMonth.getMonth() === new Date().getMonth() &&
                        currentMonth.getFullYear() === new Date().getFullYear()
                          ? "today"
                          : ""
                      }`}
                      onClick={() => handleDateClick(day.day)}
                    >
                      {day.day !== 0 && (
                        <>
                          <span className="day-number">{day.day}</span>
                          {day.events.length > 0 && (
                            <div className="event-indicators">
                              {day.events.slice(0, 3).map((event, idx) => (
                                <span
                                  key={idx}
                                  className={`event-dot ${event.type}`}
                                  title={event.title}
                                />
                              ))}
                              {day.events.length > 3 && (
                                <span className="event-more">
                                  +{day.events.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Intern Events List */}
                <div className="events-list">
                  <h4>
                    <FaRegCalendarCheck />
                    Intern's Events
                  </h4>

                  <div className="events-container">
                    {getInternEventsForSelectedIntern().map((event) => (
                      <div
                        key={event.id}
                        className={`event-card ${event.type}`}
                      >
                        <div className="event-icon">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="event-details">
                          <div className="event-title">{event.title}</div>
                          <div className="event-meta">
                            <span className="event-time">
                              <FaClock />
                              {new Date(event.date).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                            {event.location && (
                              <span className="event-location">
                                <FaMapMarkerAlt />
                                {event.location}
                              </span>
                            )}
                          </div>
                          <div className="event-description">
                            {event.description}
                          </div>
                        </div>
                      </div>
                    ))}

                    {getInternEventsForSelectedIntern().length === 0 && (
                      <div className="no-events">
                        <FaCalendarAlt />
                        <p>No events scheduled for this intern</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No Intern Selected State */}
          {!selectedIntern && (
            <div className="calendar-section no-intern-selected">
              <div className="empty-state">
                <FaUsers className="empty-icon" />
                <h3>Select an Intern</h3>
                <p>
                  Choose an intern from the dropdown above to view and manage
                  their calendar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddEventModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Event</h3>
              <button
                className="modal-close"
                onClick={() => setShowAddEventModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              {/* Event Target Selection */}
              <div className="form-group">
                <label>Add Event To:</label>
                <div className="target-selector">
                  <button
                    className={`target-btn ${
                      eventTarget === "supervisor" ? "active" : ""
                    }`}
                    onClick={() => setEventTarget("supervisor")}
                  >
                    <FaUser /> Your Calendar
                  </button>
                  <button
                    className={`target-btn ${
                      eventTarget === "intern" ? "active" : ""
                    } ${!selectedIntern ? "disabled" : ""}`}
                    onClick={() => selectedIntern && setEventTarget("intern")}
                    disabled={!selectedIntern}
                  >
                    <FaUsers />
                    {selectedIntern
                      ? `${selectedIntern.name}'s Calendar`
                      : "Select an Intern First"}
                  </button>
                </div>
              </div>

              {/* Event Form */}
              <div className="form-group">
                <label>
                  <FaStickyNote /> Event Title
                </label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaCalendarAlt /> Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={
                      newEvent.date
                        ? new Date(
                            newEvent.date.getTime() -
                              newEvent.date.getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .slice(0, -8)
                        : ""
                    }
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        date: new Date(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Event Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        type: e.target.value as Event["type"],
                      })
                    }
                  >
                    <option value="meeting">Meeting</option>
                    <option value="deadline">Deadline</option>
                    <option value="event">Event</option>
                    <option value="evaluation">Evaluation</option>
                    <option value="report">Report</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <FaMapMarkerAlt /> Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter location or meeting link"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Enter event description"
                  rows={4}
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowAddEventModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-submit"
                onClick={handleAddEvent}
                disabled={!newEvent.title || !newEvent.description}
              >
                <FaPlus /> Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisorSchedulePage;
