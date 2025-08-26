import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRegCalendarCheck,
  FaTimes,
  FaMapMarkerAlt,
  FaStickyNote,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaVideo,
  FaUserTie,
  FaGraduationCap,
  FaSearch,
  FaBuilding,
  FaUser,
} from "react-icons/fa";
import mockScheduleData from "../../data/mockScheduleData.json";
import mockInternsData from "../../data/mockInternsData.json";

interface Event {
  id: number;
  title: string;
  date: Date;
  type:
    | "meeting"
    | "deadline"
    | "event"
    | "evaluation"
    | "report"
    | "coordination";
  description: string;
  location?: string;
  attendees?: string[];
  createdBy?: string;
  internId?: string | null;
}

interface Intern {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  faculty: string;
  degree: string;
  year: string;
  department: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "on-break";
  profileImage: string;
  progress: number;
  location: string;
  company: string;
  companyAddress: string;
  industrySector: string;
  internshipTitle: string;
  supervisor: {
    academic: string;
    industry: string;
  };
  lastActivity: string;
  studentId: string;
  gpa: number;
  workMode: string;
  compensationType: string;
  compensationDetails: string;
  hoursPerWeek: number;
  evaluationStatus: string;
  reportsSubmitted: number;
  totalReports: number;
  skills: string[];
  languages: string[];
  linkedinUrl: string;
  portfolioUrl: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  academicTranscripts: boolean;
  medicalClearance: boolean;
  policeClearance: boolean;
  tags: string[];
  midEvaluation?: boolean;
  endEvaluation?: boolean;
}

const CoordinatorSchedulePage: React.FC = () => {
  // Use actual mock data for interns
  const [interns, setInterns] = useState<Intern[]>([]);

  useEffect(() => {
    // Load actual intern data from mockInternsData
    const loadedInterns = mockInternsData as Intern[];
    setInterns(loadedInterns);
  }, []);

  // Selected intern state
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [showInternDropdown, setShowInternDropdown] = useState(false);
  const [internSearchTerm, setInternSearchTerm] = useState("");

  // Use mock data for coordinator events
  const [coordinatorEvents, setCoordinatorEvents] = useState<Event[]>(
    mockScheduleData.coordinatorEvents.map((event, index) => ({
      id: index + 1,
      title: event.title,
      description: event.description,
      date: new Date(`${event.date}T${event.time}:00`),
      type: event.type as Event["type"],
      location: event.location,
      createdBy: "Coordinator",
    }))
  );

  // Use mock data for intern events
  const [internEvents, setInternEvents] = useState<Event[]>(
    Object.entries(mockScheduleData.internEvents).flatMap(
      ([internId, events]) =>
        (events as any[]).map((event: any, index) => ({
          id: 100 + index,
          title: event.title,
          description: event.description,
          date: new Date(`${event.date}T${event.time}:00`),
          type: event.type as Event["type"],
          location: event.location,
          internId: internId,
          createdBy: event.addedBy || "Coordinator",
        }))
    )
  );

  // Calendar states
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [eventTarget, setEventTarget] = useState<"coordinator" | "intern">(
    "coordinator"
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

  // Filter interns based on search term
  const getFilteredInterns = () => {
    if (!internSearchTerm) return interns;

    return interns.filter(
      (intern) =>
        intern.name.toLowerCase().includes(internSearchTerm.toLowerCase()) ||
        intern.email.toLowerCase().includes(internSearchTerm.toLowerCase()) ||
        intern.studentId
          .toLowerCase()
          .includes(internSearchTerm.toLowerCase()) ||
        intern.company.toLowerCase().includes(internSearchTerm.toLowerCase()) ||
        intern.department.toLowerCase().includes(internSearchTerm.toLowerCase())
    );
  };

  // Get days in month for calendar
  const getDaysInMonth = (date: Date, events: Event[]) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: { day: number; events: Event[] }[] = [];

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
      createdBy: "Coordinator",
      internId:
        eventTarget === "intern" && selectedIntern ? selectedIntern.id : null,
    };

    if (eventTarget === "coordinator") {
      setCoordinatorEvents([...coordinatorEvents, event]);
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
      case "coordination":
        return <FaUserTie />;
      default:
        return <FaInfoCircle />;
    }
  };

  // Get avatar for intern
  const getInternAvatar = (intern: Intern) => {
    if (intern.profileImage && intern.profileImage.startsWith("http")) {
      return (
        <img
          src={intern.profileImage}
          alt={intern.name}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
        />
      );
    }
    // Return initials as fallback
    const initials = intern.name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return <span className="avatar-initials">{initials}</span>;
  };

  return (
    <div className="dashboard__main coordinator-schedule-page">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1>Schedule Management</h1>
          <p>Manage your calendar and coordinate intern schedules</p>
        </div>
        <div className="dashboard__header-right">
          <div className="dashboard__date">
            <FaCalendarAlt className="date-icon" />
            <span>{getTodayDate()}</span>
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
                  <div className="dropdown-header">
                    <h4>Select Intern to Manage</h4>
                    <div className="dropdown-search">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search by name, email, ID, company..."
                        value={internSearchTerm}
                        onChange={(e) => setInternSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="dropdown-body">
                    <div className="intern-count">
                      Showing {getFilteredInterns().length} of {interns.length}{" "}
                      interns
                    </div>
                    {getFilteredInterns().map((intern) => (
                      <div
                        key={intern.id}
                        className={`intern-option ${
                          selectedIntern?.id === intern.id ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSelectedIntern(intern);
                          setShowInternDropdown(false);
                          setInternSearchTerm("");
                        }}
                      >
                        <div className="intern-avatar">
                          {getInternAvatar(intern)}
                          <span className="avatar-initials hidden">
                            {intern.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="intern-info">
                          <div className="intern-name">{intern.name}</div>
                          <div className="intern-details">
                            <span className="intern-id">{intern.id}</span>
                            <span className="separator">•</span>
                            <span className="intern-dept">
                              {intern.department}
                            </span>
                          </div>
                          <div className="intern-company">
                            <FaBuilding className="company-icon" />
                            {intern.company}
                          </div>
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
                    {getFilteredInterns().length === 0 && (
                      <div className="no-results">
                        <FaUser />
                        <p>No interns found matching "{internSearchTerm}"</p>
                      </div>
                    )}
                  </div>
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
          {/* Coordinator Calendar */}
          <div className="calendar-section coordinator-calendar">
            <div className="calendar-header">
              <h3>
                <FaUserTie className="calendar-icon" />
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
                {getDaysInMonth(currentMonth, coordinatorEvents).map(
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

              {/* Coordinator Events List */}
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
                    ? getSelectedDateEvents(coordinatorEvents)
                    : coordinatorEvents
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
                    ? getSelectedDateEvents(coordinatorEvents)
                    : coordinatorEvents.filter(
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
                  <FaGraduationCap className="calendar-icon" />
                  {selectedIntern.name}'s Calendar
                </h3>
                <div className="intern-badge">
                  <div className="badge-avatar">
                    {getInternAvatar(selectedIntern)}
                    <span className="avatar-initials hidden">
                      {selectedIntern.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="badge-info">
                    <span className="badge-name">{selectedIntern.name}</span>
                    <span className="badge-dept">{selectedIntern.company}</span>
                  </div>
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
                      eventTarget === "coordinator" ? "active" : ""
                    }`}
                    onClick={() => setEventTarget("coordinator")}
                  >
                    <FaUserTie /> Your Calendar
                  </button>
                  <button
                    className={`target-btn ${
                      eventTarget === "intern" ? "active" : ""
                    } ${!selectedIntern ? "disabled" : ""}`}
                    onClick={() => selectedIntern && setEventTarget("intern")}
                    disabled={!selectedIntern}
                  >
                    <FaGraduationCap />
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
                    <option value="coordination">Coordination</option>
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

export default CoordinatorSchedulePage;
