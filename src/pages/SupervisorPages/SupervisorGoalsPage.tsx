import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaRegCheckCircle,
  FaCheckCircle,
  FaFilter,
  FaSearch,
  FaClock,
  FaExclamation,
  FaRegCalendarAlt,
  FaCheck,
  FaTag,
  FaList,
  FaClipboardList,
  FaThumbtack,
  FaToggleOn,
  FaChevronDown,
  FaChevronUp,
  FaSave,
  FaTimes,
  FaUsers,
  FaUserGraduate,
  FaEye,
  FaLock,
  FaUnlock,
  FaBriefcase,
  FaBuilding,
  FaStar,
  FaRegStar,
  FaChartLine,
} from "react-icons/fa";

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

const SupervisorGoalsPage: React.FC = () => {
  // Current supervisor data
  const [currentUser] = useState({
    name: "Dr. John Smith",
    avatar: "JS",
    title: "Senior Supervisor",
    department: "Computer Science",
  });

  // Selected intern
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [showInternDropdown, setShowInternDropdown] = useState(false);

  // Interns list
  const [interns] = useState<Intern[]>([
    {
      id: 1,
      name: "Erandi Katugampala",
      avatar: "EK",
      email: "erandi.k@example.com",
      company: "Tech Solutions Ltd.",
      position: "Software Engineering Intern",
      department: "Engineering",
      startDate: new Date("2025-01-15"),
      progress: 65,
      totalTasks: 12,
      completedTasks: 8,
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "MC",
      email: "michael.c@example.com",
      company: "Innovate Corp",
      position: "Data Science Intern",
      department: "Analytics",
      startDate: new Date("2025-02-01"),
      progress: 45,
      totalTasks: 8,
      completedTasks: 4,
    },
    {
      id: 3,
      name: "Sarah Johnson",
      avatar: "SJ",
      email: "sarah.j@example.com",
      company: "WebDev Studio",
      position: "Frontend Developer Intern",
      department: "Web Development",
      startDate: new Date("2025-01-20"),
      progress: 80,
      totalTasks: 10,
      completedTasks: 8,
    },
  ]);

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      internId: 1,
      title: "Complete React component documentation",
      description: "Add detailed JSDoc comments to all React components.",
      priority: "high",
      dueDate: new Date("2025-05-15"),
      completed: false,
      category: "Documentation",
      pinned: true,
      tags: ["React", "Documentation"],
      createdAt: new Date("2025-05-01"),
      createdBy: "intern",
      isLocked: false,
      supervisorNotes: "Focus on complex components first",
    },
    {
      id: 2,
      internId: 1,
      title: "Implement authentication module",
      description: "Create a secure authentication system using JWT tokens.",
      priority: "high",
      dueDate: new Date("2025-05-20"),
      completed: false,
      category: "Development",
      pinned: false,
      tags: ["Security", "Backend"],
      createdAt: new Date("2025-05-05"),
      createdBy: "supervisor",
      isLocked: true,
      supervisorNotes:
        "This is a critical task. Review security best practices.",
    },
    {
      id: 3,
      internId: 2,
      title: "Data pipeline optimization",
      description:
        "Optimize the existing data processing pipeline for better performance.",
      priority: "medium",
      dueDate: new Date("2025-05-25"),
      completed: false,
      category: "Performance",
      pinned: false,
      tags: ["Optimization", "Data"],
      createdAt: new Date("2025-05-03"),
      createdBy: "supervisor",
      isLocked: false,
    },
    {
      id: 4,
      internId: 1,
      title: "Weekly progress report",
      description: "Submit the weekly progress report to supervisor",
      priority: "medium",
      dueDate: new Date("2025-05-10"),
      completed: true,
      category: "Reports",
      pinned: false,
      tags: ["Report", "Weekly"],
      createdAt: new Date("2025-05-03"),
      createdBy: "intern",
      isLocked: false,
    },
    {
      id: 5,
      internId: 3,
      title: "UI/UX improvements for dashboard",
      description: "Implement the new design mockups for the admin dashboard",
      priority: "high",
      dueDate: new Date("2025-05-18"),
      completed: false,
      category: "Development",
      pinned: true,
      tags: ["UI", "Frontend"],
      createdAt: new Date("2025-05-04"),
      createdBy: "supervisor",
      isLocked: false,
      supervisorNotes: "Coordinate with the design team for any clarifications",
    },
  ]);

  // Categories
  const [categories] = useState<Category[]>([
    { id: 1, name: "Development", color: "#3254c5" },
    { id: 2, name: "Documentation", color: "#7030b8" },
    { id: 3, name: "Meetings", color: "#10b981" },
    { id: 4, name: "Reports", color: "#f59e0b" },
    { id: 5, name: "Learning", color: "#3b82f6" },
    { id: 6, name: "Evaluation", color: "#ef4444" },
    { id: 7, name: "Performance", color: "#8b5cf6" },
  ]);

  // New task state
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: null,
    completed: false,
    category: "Development",
    pinned: false,
    tags: [],
    isLocked: false,
    supervisorNotes: "",
  });

  // Task being edited
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // UI states
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("dueDate");
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [newTagInput, setNewTagInput] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "intern" | "supervisor">(
    "all"
  );

  // Toggle task completion status
  const toggleTaskComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              lastModifiedBy: currentUser.name,
              lastModifiedDate: new Date(),
            }
          : task
      )
    );
  };

  // Toggle task pin status
  const toggleTaskPin = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              pinned: !task.pinned,
              lastModifiedBy: currentUser.name,
              lastModifiedDate: new Date(),
            }
          : task
      )
    );
  };

  // Toggle task lock status
  const toggleTaskLock = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isLocked: !task.isLocked,
              lastModifiedBy: currentUser.name,
              lastModifiedDate: new Date(),
            }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task?.isLocked) {
      alert("Cannot delete a locked task. Please unlock it first.");
      return;
    }
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Edit a task
  const startEditingTask = (task: Task) => {
    if (task.isLocked && task.createdBy === "intern") {
      alert("This task is locked. Unlock it to make changes.");
      return;
    }
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
      pinned: task.pinned,
      tags: [...task.tags],
      isLocked: task.isLocked,
      supervisorNotes: task.supervisorNotes,
    });
    setIsAddingTask(true);
  };

  // Save task (new or edited)
  const saveTask = () => {
    if (!selectedIntern) {
      alert("Please select an intern first");
      return;
    }

    if (!newTask.title?.trim()) {
      alert("Please enter a task title");
      return;
    }

    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...newTask,
                lastModifiedBy: currentUser.name,
                lastModifiedDate: new Date(),
              }
            : task
        )
      );
    } else {
      // Add new task
      const task: Task = {
        id: Math.max(...tasks.map((t) => t.id), 0) + 1,
        internId: selectedIntern.id,
        title: newTask.title || "",
        description: newTask.description || "",
        priority: newTask.priority || "medium",
        dueDate: newTask.dueDate || null,
        completed: false,
        category: newTask.category || "Development",
        pinned: newTask.pinned || false,
        tags: newTask.tags || [],
        createdAt: new Date(),
        createdBy: "supervisor",
        isLocked: newTask.isLocked || false,
        supervisorNotes: newTask.supervisorNotes,
        lastModifiedBy: currentUser.name,
        lastModifiedDate: new Date(),
      };
      setTasks([...tasks, task]);
    }

    cancelTaskForm();
  };

  // Cancel adding/editing a task
  const cancelTaskForm = () => {
    setIsAddingTask(false);
    setEditingTask(null);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: null,
      completed: false,
      category: "Development",
      pinned: false,
      tags: [],
      isLocked: false,
      supervisorNotes: "",
    });
    setNewTagInput("");
  };

  // Add tag to new task
  const addTag = () => {
    if (
      newTagInput.trim() &&
      newTask.tags &&
      !newTask.tags.includes(newTagInput.trim())
    ) {
      setNewTask({
        ...newTask,
        tags: [...newTask.tags, newTagInput.trim()],
      });
      setNewTagInput("");
    }
  };

  // Remove tag from new task
  const removeTag = (tagToRemove: string) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

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
          case "priority":
            const priorityRank = { high: 0, medium: 1, low: 2 };
            return (
              priorityRank[a.priority as keyof typeof priorityRank] -
              priorityRank[b.priority as keyof typeof priorityRank]
            );
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

  // Initialize task form when editing
  useEffect(() => {
    if (editingTask) {
      setNewTask({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
        category: editingTask.category,
        pinned: editingTask.pinned,
        tags: [...editingTask.tags],
        isLocked: editingTask.isLocked,
        supervisorNotes: editingTask.supervisorNotes,
      });
    }
  }, [editingTask]);

  return (
    <div className="dashboard__main supervisor-goals-page">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1 className="goals-title">Intern Goals & Tasks Management</h1>
          <p className="subtitle">Manage and monitor your interns' progress</p>
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
                <button
                  className="add-task-btn"
                  onClick={() => setIsAddingTask(true)}
                >
                  <FaPlus />
                  <span>Add Task</span>
                </button>
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

            {/* Task form */}
            {isAddingTask && (
              <div className="task-form-container">
                <div className="task-form">
                  <div className="form-header">
                    <h3>{editingTask ? "Edit Task" : "Add New Task"}</h3>
                    <button className="close-btn" onClick={cancelTaskForm}>
                      <FaTimes />
                    </button>
                  </div>
                  <div className="form-body">
                    <div className="form-group">
                      <label htmlFor="task-title">Title</label>
                      <input
                        type="text"
                        id="task-title"
                        value={newTask.title || ""}
                        onChange={(e) =>
                          setNewTask({ ...newTask, title: e.target.value })
                        }
                        placeholder="Enter task title"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="task-description">Description</label>
                      <textarea
                        id="task-description"
                        value={newTask.description || ""}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter task description"
                        rows={4}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="task-priority">Priority</label>
                        <select
                          id="task-priority"
                          value={newTask.priority || "medium"}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              priority: e.target.value as
                                | "high"
                                | "medium"
                                | "low",
                            })
                          }
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="task-category">Category</label>
                        <select
                          id="task-category"
                          value={newTask.category || "Development"}
                          onChange={(e) =>
                            setNewTask({ ...newTask, category: e.target.value })
                          }
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="task-due-date">Due Date</label>
                      <input
                        type="date"
                        id="task-due-date"
                        value={
                          newTask.dueDate
                            ? new Date(newTask.dueDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            dueDate: e.target.value
                              ? new Date(e.target.value)
                              : null,
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="supervisor-notes">Supervisor Notes</label>
                      <textarea
                        id="supervisor-notes"
                        value={newTask.supervisorNotes || ""}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            supervisorNotes: e.target.value,
                          })
                        }
                        placeholder="Add notes for the intern (optional)"
                        rows={3}
                      />
                    </div>

                    <div className="form-group">
                      <label>Tags</label>
                      <div className="tags-input">
                        <div className="tags-list">
                          {newTask.tags?.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="remove-tag"
                              >
                                <FaTimes />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="add-tag-input">
                          <input
                            type="text"
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addTag();
                              }
                            }}
                            placeholder="Add a tag and press Enter"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-options">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newTask.pinned || false}
                          onChange={(e) =>
                            setNewTask({ ...newTask, pinned: e.target.checked })
                          }
                        />
                        <span>Pin this task</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newTask.isLocked || false}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              isLocked: e.target.checked,
                            })
                          }
                        />
                        <span>Lock task (prevent intern from editing)</span>
                      </label>
                    </div>

                    <div className="form-actions">
                      <button className="cancel-btn" onClick={cancelTaskForm}>
                        Cancel
                      </button>
                      <button className="save-btn" onClick={saveTask}>
                        <FaSave />
                        {editingTask ? "Update Task" : "Add Task"}
                      </button>
                    </div>
                  </div>
                </div>
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
                      : "Click 'Add Task' to create a new task for this intern"}
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
                          <FaCheckCircle
                            className="check-icon"
                            onClick={() => toggleTaskComplete(task.id)}
                          />
                        ) : (
                          <FaRegCheckCircle
                            className="empty-check-icon"
                            onClick={() => toggleTaskComplete(task.id)}
                          />
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
                          className="action-btn"
                          onClick={() => toggleTaskPin(task.id)}
                          title={task.pinned ? "Unpin task" : "Pin task"}
                        >
                          {task.pinned ? <FaStar /> : <FaRegStar />}
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => toggleTaskLock(task.id)}
                          title={task.isLocked ? "Unlock task" : "Lock task"}
                        >
                          {task.isLocked ? <FaLock /> : <FaUnlock />}
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => startEditingTask(task)}
                          title="Edit task"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteTask(task.id)}
                          title="Delete task"
                          disabled={task.isLocked}
                        >
                          <FaTrashAlt />
                        </button>
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
              Please select an intern from the dropdown above to view and manage
              their goals
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorGoalsPage;
