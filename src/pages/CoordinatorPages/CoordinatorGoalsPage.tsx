import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaRegCheckCircle,
  FaCheckCircle,
  FaFilter,
  FaSearch,
  FaClock,
  FaExclamation,
  FaRegCalendarAlt,
  FaTag,
  FaClipboardList,
  FaThumbtack,
  FaToggleOn,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaUserGraduate,
  FaEye,
  FaLock,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa";
import "../../scss/pageStyles/cordinator/_coordinatorGoals.scss";
import mockGoalsData from "../../data/mockGoalsData.json";

interface Task {
  id: number;
  internId: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueDate: Date | null;
  completed: boolean;
  category: string;
  pinned: boolean;
  tags: string[];
  createdAt: Date;
  createdBy: "intern" | "supervisor";
  isLocked: boolean;
  supervisorNotes?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
}

interface Category {
  id: number;
  name: string;
  color: string;
}

interface Intern {
  id: number;
  name: string;
  avatar: string;
  email: string;
  company: string;
  position: string;
  department: string;
  startDate: Date;
  profilePicture?: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
}

interface Goal {
  id: string;
  internId: string;
  internName: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  startDate: string;
  dueDate: string;
  completedDate: string | null;
  progress: number;
  category: string;
  skills: string[];
  supervisor: string;
  company: string;
  milestones: Array<{
    id: number;
    title: string;
    completed: boolean;
    completedDate: string | null;
  }>;
  notes: string;
  lastUpdated: string;
}

const CoordinatorGoalsPage: React.FC = () => {
  // Load goals data from mock JSON file
  const [allGoals] = useState(mockGoalsData as Goal[]);

  // Current coordinator data
  const [currentUser] = useState({
    name: "Dr. Sarah Wilson",
    avatar: "SW",
    title: "Program Coordinator",
    department: "Internship Program",
  });

  // Selected intern
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [showInternDropdown, setShowInternDropdown] = useState(false);

  // Generate interns list from goals data
  const generateInternsFromGoals = () => {
    const uniqueInterns = new Map();

    allGoals.forEach((goal) => {
      const internId = parseInt(goal.internId.split("-")[2]);
      if (!uniqueInterns.has(internId)) {
        const nameWords = goal.internName.split(" ");
        const avatar = nameWords
          .map((word) => word.charAt(0))
          .join("")
          .toUpperCase();

        uniqueInterns.set(internId, {
          id: internId,
          name: goal.internName,
          avatar: avatar,
          email: `${goal.internName
            .toLowerCase()
            .replace(" ", ".")}@example.com`,
          company: goal.company,
          position: `${goal.category} Intern`,
          department: goal.category,
          startDate: new Date(goal.startDate),
          progress: goal.progress,
          totalTasks: 1,
          completedTasks: goal.status === "completed" ? 1 : 0,
        });
      } else {
        // Update task counts
        const intern = uniqueInterns.get(internId);
        intern.totalTasks += 1;
        if (goal.status === "completed") {
          intern.completedTasks += 1;
        }
        // Update progress as average
        intern.progress = Math.round((intern.progress + goal.progress) / 2);
      }
    });

    return Array.from(uniqueInterns.values());
  };

  // Interns list
  const [interns] = useState<Intern[]>(generateInternsFromGoals());

  // Convert goals data to tasks format
  const convertGoalsToTasks = () => {
    return allGoals.map((goal) => ({
      id: parseInt(goal.id.split("-")[2]),
      internId: parseInt(goal.internId.split("-")[2]),
      title: goal.title,
      description: goal.description,
      priority: goal.priority as "high" | "medium" | "low",
      dueDate: goal.dueDate ? new Date(goal.dueDate) : null,
      completed: goal.status === "completed",
      category: goal.category,
      pinned: goal.priority === "high",
      tags: goal.skills || [],
      createdAt: new Date(goal.startDate),
      createdBy: "supervisor" as const,
      isLocked: false,
      supervisorNotes: goal.notes,
    }));
  };

  // Tasks state (read-only for coordinator)
  const [tasks] = useState<Task[]>(convertGoalsToTasks());

  // Categories
  const [categories] = useState<Category[]>([
    { id: 1, name: "Development", color: "#3254c5" },
    { id: 2, name: "Documentation", color: "#7030b8" },
    { id: 3, name: "Meetings", color: "#10b981" },
    { id: 4, name: "Reports", color: "#f59e0b" },
    { id: 5, name: "Learning", color: "#3b82f6" },
    { id: 6, name: "Evaluation", color: "#ef4444" },
    { id: 7, name: "Performance", color: "#8b5cf6" },
    { id: 8, name: "Database", color: "#06b6d4" },
  ]);

  // UI states (read-only filters)
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("dueDate");
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "intern" | "supervisor">(
    "all"
  );

  // Get today's date for display
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

  // Get color for category
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.color : "#3254c5";
  };

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "No due date";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if a date is overdue
  const isOverdue = (date: Date | null) => {
    if (!date) return false;
    return new Date() > date;
  };

  // Filter tasks for selected intern
  const getInternTasks = () => {
    if (!selectedIntern) return [];

    return tasks
      .filter((task) => task.internId === selectedIntern.id)
      .filter((task) => {
        // Filter by view mode
        if (viewMode === "intern" && task.createdBy !== "intern") return false;
        if (viewMode === "supervisor" && task.createdBy !== "supervisor")
          return false;

        // Filter by completion status
        if (!showCompletedTasks && task.completed) return false;

        // Filter by priority
        if (filterPriority && task.priority !== filterPriority) return false;

        // Filter by category
        if (filterCategory && task.category !== filterCategory) return false;

        // Filter by search query
        if (
          searchQuery &&
          !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !task.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !task.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
          return false;

        return true;
      })
      .sort((a, b) => {
        // Always sort pinned tasks first
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;

        // Then sort by completion status
        if (!a.completed && b.completed) return -1;
        if (a.completed && !b.completed) return 1;

        // Then sort by the selected sort option
        switch (sortOption) {
          case "dueDate":
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return a.dueDate.getTime() - b.dueDate.getTime();
          case "priority": {
            const priorityRank = { high: 0, medium: 1, low: 2 };
            return (
              priorityRank[a.priority as keyof typeof priorityRank] -
              priorityRank[b.priority as keyof typeof priorityRank]
            );
          }
          case "title":
            return a.title.localeCompare(b.title);
          case "createdAt":
            return b.createdAt.getTime() - a.createdAt.getTime();
          default:
            return 0;
        }
      });
  };

  // Get task statistics
  const getTaskStats = () => {
    const internTasks = getInternTasks();
    return {
      total: internTasks.length,
      completed: internTasks.filter((task) => task.completed).length,
      high: internTasks.filter(
        (task) => task.priority === "high" && !task.completed
      ).length,
      medium: internTasks.filter(
        (task) => task.priority === "medium" && !task.completed
      ).length,
      low: internTasks.filter(
        (task) => task.priority === "low" && !task.completed
      ).length,
      overdue: internTasks.filter(
        (task) => !task.completed && isOverdue(task.dueDate)
      ).length,
      byIntern: internTasks.filter((task) => task.createdBy === "intern")
        .length,
      bySupervisor: internTasks.filter(
        (task) => task.createdBy === "supervisor"
      ).length,
    };
  };

  const taskStats = getTaskStats();

  // Reset filters
  const resetFilters = () => {
    setFilterPriority(null);
    setFilterCategory(null);
    setSearchQuery("");
    setSortOption("dueDate");
    setShowCompletedTasks(true);
    setViewMode("all");
  };

  // Initialize with first intern
  useEffect(() => {
    if (interns.length > 0 && !selectedIntern) {
      setSelectedIntern(interns[0]);
    }
  }, [interns, selectedIntern]);

  return (
    <div className="dashboard__main coordinator-goals-page">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1 className="goals-title">Intern Goals & Tasks Overview</h1>
          <p className="subtitle">
            Monitor intern progress and task completion
          </p>
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

      {/* Goals content */}
      <div className="goals-container">
        {/* Intern selector */}
        <div className="intern-selector-section">
          <div className="intern-selector">
            <button
              className="intern-selector-button"
              onClick={() => setShowInternDropdown(!showInternDropdown)}
            >
              <FaUserGraduate className="selector-icon" />
              <div className="selected-intern-info">
                {selectedIntern ? (
                  <>
                    <span className="intern-name">{selectedIntern.name}</span>
                    <span className="intern-meta">
                      {selectedIntern.position} • {selectedIntern.company}
                    </span>
                  </>
                ) : (
                  <span>Select an intern</span>
                )}
              </div>
              <FaChevronDown
                className={`dropdown-icon ${showInternDropdown ? "open" : ""}`}
              />
            </button>

            {showInternDropdown && (
              <div className="intern-dropdown">
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
                    <div className="intern-avatar">
                      <span>{intern.avatar}</span>
                    </div>
                    <div className="intern-details">
                      <div className="intern-name">{intern.name}</div>
                      <div className="intern-info">
                        <span>{intern.position}</span>
                        <span className="separator">•</span>
                        <span>{intern.company}</span>
                      </div>
                      <div className="intern-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${intern.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {intern.completedTasks}/{intern.totalTasks} tasks
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedIntern && (
            <div className="intern-quick-stats">
              <div className="quick-stat">
                <FaBriefcase className="stat-icon" />
                <span>{selectedIntern.department}</span>
              </div>
              <div className="quick-stat">
                <FaCalendarAlt className="stat-icon" />
                <span>Started {formatDate(selectedIntern.startDate)}</span>
              </div>
              <div className="quick-stat">
                <FaChartLine className="stat-icon" />
                <span>{selectedIntern.progress}% Complete</span>
              </div>
            </div>
          )}
        </div>

        {selectedIntern && (
          <>
            {/* Task stats */}
            <div className="goals-stats">
              <div className="stat-card">
                <div className="stat-card__icon total-icon">
                  <FaClipboardList />
                </div>
                <div className="stat-card__content">
                  <div className="stat-card__value">{taskStats.total}</div>
                  <div className="stat-card__label">Total Tasks</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card__icon completed-icon">
                  <FaCheckCircle />
                </div>
                <div className="stat-card__content">
                  <div className="stat-card__value">{taskStats.completed}</div>
                  <div className="stat-card__label">Completed</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card__icon high-priority-icon">
                  <FaExclamation />
                </div>
                <div className="stat-card__content">
                  <div className="stat-card__value">{taskStats.high}</div>
                  <div className="stat-card__label">High Priority</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card__icon overdue-icon">
                  <FaClock />
                </div>
                <div className="stat-card__content">
                  <div className="stat-card__value">{taskStats.overdue}</div>
                  <div className="stat-card__label">Overdue</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card__icon intern-created-icon">
                  <FaUserGraduate />
                </div>
                <div className="stat-card__content">
                  <div className="stat-card__value">{taskStats.byIntern}</div>
                  <div className="stat-card__label">By Intern</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card__icon supervisor-created-icon">
                  <FaUsers />
                </div>
                <div className="stat-card__content">
                  <div className="stat-card__value">
                    {taskStats.bySupervisor}
                  </div>
                  <div className="stat-card__label">By Supervisor</div>
                </div>
              </div>
            </div>

            {/* Tasks toolbar */}
            <div className="goals-toolbar">
              <div className="toolbar-left">
                <div className="view-mode-info">
                  <FaEye className="view-icon" />
                  <span>View Only Mode</span>
                </div>
                <button
                  className="filter-btn"
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  aria-label="Filter tasks"
                >
                  <FaFilter />
                  <span>Filter</span>
                  {showFilterPanel ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <div className="view-mode-selector">
                  <button
                    className={`view-mode-btn ${
                      viewMode === "all" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("all")}
                  >
                    All
                  </button>
                  <button
                    className={`view-mode-btn ${
                      viewMode === "intern" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("intern")}
                  >
                    Intern's
                  </button>
                  <button
                    className={`view-mode-btn ${
                      viewMode === "supervisor" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("supervisor")}
                  >
                    Assigned
                  </button>
                </div>
              </div>
              <div className="toolbar-right">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="search-icon" />
                </div>
                <div className="display-options">
                  <button
                    className={`toggle-completed ${
                      showCompletedTasks ? "active" : ""
                    }`}
                    onClick={() => setShowCompletedTasks(!showCompletedTasks)}
                    title={`${
                      showCompletedTasks ? "Hide" : "Show"
                    } completed tasks`}
                  >
                    <FaToggleOn />
                    <span>Completed</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter panel */}
            {showFilterPanel && (
              <div className="filter-panel">
                <div className="filter-section">
                  <h4>Sort By</h4>
                  <div className="filter-options">
                    <button
                      className={`filter-option ${
                        sortOption === "dueDate" ? "active" : ""
                      }`}
                      onClick={() => setSortOption("dueDate")}
                    >
                      Due Date
                    </button>
                    <button
                      className={`filter-option ${
                        sortOption === "priority" ? "active" : ""
                      }`}
                      onClick={() => setSortOption("priority")}
                    >
                      Priority
                    </button>
                    <button
                      className={`filter-option ${
                        sortOption === "title" ? "active" : ""
                      }`}
                      onClick={() => setSortOption("title")}
                    >
                      Title
                    </button>
                    <button
                      className={`filter-option ${
                        sortOption === "createdAt" ? "active" : ""
                      }`}
                      onClick={() => setSortOption("createdAt")}
                    >
                      Date Created
                    </button>
                  </div>
                </div>

                <div className="filter-section">
                  <h4>Priority</h4>
                  <div className="filter-options">
                    <button
                      className={`filter-option ${
                        filterPriority === null ? "active" : ""
                      }`}
                      onClick={() => setFilterPriority(null)}
                    >
                      All
                    </button>
                    <button
                      className={`filter-option ${
                        filterPriority === "high" ? "active" : ""
                      }`}
                      onClick={() => setFilterPriority("high")}
                    >
                      <span className="priority-dot high"></span>
                      High
                    </button>
                    <button
                      className={`filter-option ${
                        filterPriority === "medium" ? "active" : ""
                      }`}
                      onClick={() => setFilterPriority("medium")}
                    >
                      <span className="priority-dot medium"></span>
                      Medium
                    </button>
                    <button
                      className={`filter-option ${
                        filterPriority === "low" ? "active" : ""
                      }`}
                      onClick={() => setFilterPriority("low")}
                    >
                      <span className="priority-dot low"></span>
                      Low
                    </button>
                  </div>
                </div>

                <div className="filter-section">
                  <h4>Category</h4>
                  <div className="filter-options category-filters">
                    <button
                      className={`filter-option ${
                        filterCategory === null ? "active" : ""
                      }`}
                      onClick={() => setFilterCategory(null)}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`filter-option ${
                          filterCategory === category.name ? "active" : ""
                        }`}
                        onClick={() => setFilterCategory(category.name)}
                      >
                        <span
                          className="category-color"
                          style={{ backgroundColor: category.color }}
                        ></span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="reset-filters-btn" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            )}

            {/* Tasks list */}
            <div className="tasks-list">
              {getInternTasks().length === 0 ? (
                <div className="no-tasks">
                  <FaClipboardList className="no-tasks-icon" />
                  <h3>No tasks found</h3>
                  <p>
                    {searchQuery || filterPriority || filterCategory
                      ? "Try adjusting your filters or search query"
                      : "This intern has no tasks assigned yet"}
                  </p>
                </div>
              ) : (
                getInternTasks().map((task) => (
                  <div
                    key={task.id}
                    className={`task-item ${
                      task.completed ? "completed" : ""
                    } ${task.pinned ? "pinned" : ""} ${
                      activeTaskId === task.id ? "expanded" : ""
                    }`}
                  >
                    <div className="task-header">
                      <div className="task-checkbox">
                        {task.completed ? (
                          <FaCheckCircle className="check-icon" />
                        ) : (
                          <FaRegCheckCircle className="empty-check-icon" />
                        )}
                      </div>
                      <div className="task-content">
                        <div className="task-title-row">
                          {task.pinned && (
                            <FaThumbtack className="pin-indicator" />
                          )}
                          {task.isLocked && (
                            <FaLock className="lock-indicator" />
                          )}
                          <h3 className="task-title">{task.title}</h3>
                        </div>
                        <div className="task-meta">
                          <span
                            className={`task-priority priority-${task.priority}`}
                          >
                            {task.priority}
                          </span>
                          <span className="task-category">
                            <span
                              className="category-color"
                              style={{
                                backgroundColor: getCategoryColor(
                                  task.category
                                ),
                              }}
                            ></span>
                            {task.category}
                          </span>
                          <span
                            className={`task-due-date ${
                              isOverdue(task.dueDate) ? "overdue" : ""
                            }`}
                          >
                            <FaRegCalendarAlt className="date-icon" />
                            {formatDate(task.dueDate)}
                          </span>
                          <span className="task-creator">
                            {task.createdBy === "intern" ? (
                              <FaUserGraduate className="creator-icon" />
                            ) : (
                              <FaUsers className="creator-icon" />
                            )}
                            {task.createdBy}
                          </span>
                        </div>
                      </div>
                      <div className="task-actions">
                        <button
                          className="expand-btn"
                          onClick={() =>
                            setActiveTaskId(
                              activeTaskId === task.id ? null : task.id
                            )
                          }
                        >
                          {activeTaskId === task.id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </div>
                    </div>

                    {activeTaskId === task.id && (
                      <div className="task-details">
                        <div className="task-description">
                          <p>{task.description}</p>
                        </div>
                        {task.supervisorNotes && (
                          <div className="supervisor-notes">
                            <h4>Supervisor Notes:</h4>
                            <p>{task.supervisorNotes}</p>
                          </div>
                        )}
                        <div className="task-tags">
                          <FaTag className="tags-icon" />
                          {task.tags.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="task-metadata">
                          <span>Created on {formatDate(task.createdAt)}</span>
                          {task.lastModifiedBy && (
                            <span>
                              • Last modified by {task.lastModifiedBy} on{" "}
                              {formatDate(task.lastModifiedDate || null)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {!selectedIntern && (
          <div className="no-intern-selected">
            <FaUsers className="no-intern-icon" />
            <h3>No Intern Selected</h3>
            <p>
              Please select an intern from the dropdown above to view their
              goals and tasks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinatorGoalsPage;
