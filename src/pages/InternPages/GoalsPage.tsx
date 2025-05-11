import React, { useState, useEffect } from "react";
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
  FaPlus,
  FaEllipsisH,
  FaTrashAlt,
  FaEdit,
  FaRegCheckCircle,
  FaCheckCircle,
  FaFilter,
  FaSortAmountDown,
  FaSearch,
  FaClock,
  FaFlag,
  FaExclamation,
  FaCircle,
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
  FaUniversity,
  FaBuilding,
  FaLaptopCode,
} from "react-icons/fa";
import SideMenu from "../../components/InternSideMenu";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueDate: Date | null;
  completed: boolean;
  category: string;
  pinned: boolean;
  tags: string[];
  createdAt: Date;
}

interface Category {
  id: number;
  name: string;
  color: string;
}

const GoalsPage: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("goals");

  // User data
  const [currentUser] = useState({
    name: "Erandi Katugampala",
    avatar: "E",
    title: "Software Engineering Intern",
    company: "Tech Solutions Ltd.",
    position: "Software Engineering Intern",
  });

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete React component documentation",
      description: "Add detailed JSDoc comments to all React components.",
      priority: "high",
      dueDate: new Date("2025-05-15"),
      completed: false,
      category: "Documentation",
      pinned: true,
      tags: ["React", "Documentation"],
      createdAt: new Date("2025-05-01"),
    },
    {
      id: 2,
      title: "Fix the error in CI/CD pipeline (line 341)",
      description:
        "Debug and fix the error in the CI/CD pipeline configuration.",
      priority: "high",
      dueDate: new Date("2025-05-12"),
      completed: false,
      category: "Development",
      pinned: true,
      tags: ["CI/CD", "DevOps"],
      createdAt: new Date("2025-05-02"),
    },
    {
      id: 3,
      title: "Submit weekly progress report",
      description:
        "Complete and submit the weekly progress report to the supervisor.",
      priority: "medium",
      dueDate: new Date("2025-05-10"),
      completed: true,
      category: "Reports",
      pinned: false,
      tags: ["Report", "Weekly"],
      createdAt: new Date("2025-05-03"),
    },
    {
      id: 4,
      title: "Attend the weekly team meeting",
      description: "Join the weekly team meeting and discuss progress.",
      priority: "medium",
      dueDate: new Date("2025-05-09"),
      completed: true,
      category: "Meetings",
      pinned: false,
      tags: ["Meeting", "Team"],
      createdAt: new Date("2025-05-03"),
    },
    {
      id: 5,
      title: "Meet with industry supervisor for feedback",
      description:
        "Schedule and attend a meeting with the industry supervisor to discuss progress and get feedback.",
      priority: "medium",
      dueDate: new Date("2025-05-17"),
      completed: false,
      category: "Meetings",
      pinned: false,
      tags: ["Meeting", "Supervisor"],
      createdAt: new Date("2025-05-04"),
    },
    {
      id: 6,
      title: "Test new API endpoints",
      description:
        "Test the newly implemented API endpoints to ensure they work correctly.",
      priority: "low",
      dueDate: new Date("2025-05-20"),
      completed: false,
      category: "Development",
      pinned: false,
      tags: ["API", "Testing"],
      createdAt: new Date("2025-05-05"),
    },
    {
      id: 7,
      title: "Learn about GraphQL implementation",
      description:
        "Study materials on GraphQL and how to implement it in the project.",
      priority: "low",
      dueDate: new Date("2025-05-30"),
      completed: false,
      category: "Learning",
      pinned: false,
      tags: ["GraphQL", "Learning"],
      createdAt: new Date("2025-05-05"),
    },
    {
      id: 8,
      title: "Prepare for mid-internship evaluation",
      description:
        "Compile work done so far and prepare for the mid-internship evaluation.",
      priority: "high",
      dueDate: new Date("2025-06-01"),
      completed: false,
      category: "Evaluation",
      pinned: false,
      tags: ["Evaluation", "Important"],
      createdAt: new Date("2025-05-06"),
    },
  ]);

  // Categories
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Development", color: "#3254c5" },
    { id: 2, name: "Documentation", color: "#7030b8" },
    { id: 3, name: "Meetings", color: "#10b981" },
    { id: 4, name: "Reports", color: "#f59e0b" },
    { id: 5, name: "Learning", color: "#3b82f6" },
    { id: 6, name: "Evaluation", color: "#ef4444" },
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

  // Toggle task completion status
  const toggleTaskComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Toggle task pin status
  const toggleTaskPin = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, pinned: !task.pinned } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Edit a task
  const startEditingTask = (task: Task) => {
    setEditingTask(task);
    setIsAddingTask(true);
  };

  // Save task (new or edited)
  const saveTask = () => {
    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...newTask,
                tags: newTask.tags || [],
              }
            : task
        )
      );
      setEditingTask(null);
    } else {
      // Add new task
      const currentDate = new Date();
      setTasks([
        ...tasks,
        {
          id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
          title: newTask.title || "Untitled Task",
          description: newTask.description || "",
          priority: newTask.priority as "high" | "medium" | "low",
          dueDate: newTask.dueDate,
          completed: false,
          category: newTask.category || "Development",
          pinned: Boolean(newTask.pinned),
          tags: newTask.tags || [],
          createdAt: currentDate,
        },
      ]);
    }

    // Reset form
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: null,
      completed: false,
      category: "Development",
      pinned: false,
      tags: [],
    });
    setIsAddingTask(false);
  };

  // Add a tag to the new task
  const addTag = () => {
    if (
      newTagInput.trim() !== "" &&
      !newTask.tags?.includes(newTagInput.trim())
    ) {
      setNewTask({
        ...newTask,
        tags: [...(newTask.tags || []), newTagInput.trim()],
      });
      setNewTagInput("");
    }
  };

  // Remove a tag from the new task
  const removeTag = (tagToRemove: string) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  // Handle key press in tag input
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTagInput.trim() !== "") {
      e.preventDefault();
      addTag();
    }
  };

  // Toggle task details view
  const toggleTaskDetails = (taskId: number) => {
    setActiveTaskId(activeTaskId === taskId ? null : taskId);
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

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
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

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterPriority(null);
    setFilterCategory(null);
    setSearchQuery("");
    setSortOption("dueDate");
    setShowCompletedTasks(true);
  };

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
      });
    }
  }, [editingTask]);

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

  // Get tasks count by priority
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    high: tasks.filter((task) => task.priority === "high" && !task.completed)
      .length,
    medium: tasks.filter(
      (task) => task.priority === "medium" && !task.completed
    ).length,
    low: tasks.filter((task) => task.priority === "low" && !task.completed)
      .length,
    overdue: tasks.filter((task) => !task.completed && isOverdue(task.dueDate))
      .length,
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      {/* <SideMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      /> */}

      {/* Main Content */}
      <div className="dashboard__main goals-page">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="goals-title">Goals & Tasks</h1>
            {/* <p>
              <FaUniversity className="info-icon" /> University of Colombo |
              <FaBuilding className="info-icon" /> {currentUser.company} |
              <FaLaptopCode className="info-icon" /> {currentUser.position}
            </p> */}
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
                onClick={toggleFilterPanel}
                aria-label="Filter tasks"
              >
                <FaFilter />
                <span>Filter</span>
                {showFilterPanel ? <FaChevronUp /> : <FaChevronDown />}
              </button>
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
                  <button className="close-form-btn" onClick={cancelTaskForm}>
                    <FaTimes />
                  </button>
                </div>
                <div className="form-body">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Task title"
                      value={newTask.title || ""}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      placeholder="Task description"
                      value={newTask.description || ""}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Priority</label>
                      <select
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
                      <label>Due Date</label>
                      <input
                        type="date"
                        value={
                          newTask.dueDate
                            ? new Date(
                                newTask.dueDate.getTime() -
                                  newTask.dueDate.getTimezoneOffset() * 60000
                              )
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
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select
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
                    <div className="form-group checkbox-group">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={Boolean(newTask.pinned)}
                          onChange={(e) =>
                            setNewTask({ ...newTask, pinned: e.target.checked })
                          }
                        />
                        <span className="checkbox-label">Pin this task</span>
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Tags</label>
                    <div className="tags-input">
                      <input
                        type="text"
                        placeholder="Add a tag and press Enter"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={handleTagKeyPress}
                      />
                      <button
                        type="button"
                        className="add-tag-btn"
                        onClick={addTag}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="tags-list">
                      {newTask.tags?.map((tag, index) => (
                        <div key={index} className="tag">
                          <span>{tag}</span>
                          <button
                            type="button"
                            className="remove-tag-btn"
                            onClick={() => removeTag(tag)}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-footer">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={cancelTaskForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="save-btn"
                    onClick={saveTask}
                    disabled={!newTask.title}
                  >
                    {editingTask ? "Update Task" : "Add Task"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tasks list */}
          <div className="tasks-container">
            {filteredTasks.length > 0 ? (
              <div className="tasks-list">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`task-item ${
                      task.completed ? "completed" : ""
                    } ${task.pinned ? "pinned" : ""} ${
                      isOverdue(task.dueDate) && !task.completed
                        ? "overdue"
                        : ""
                    }`}
                  >
                    <div
                      className="task-header"
                      onClick={() => toggleTaskDetails(task.id)}
                    >
                      <div className="task-left">
                        <div
                          className="task-checkbox"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskComplete(task.id);
                          }}
                        >
                          {task.completed ? (
                            <FaCheckCircle className="check-icon" />
                          ) : (
                            <FaRegCheckCircle className="empty-check-icon" />
                          )}
                        </div>
                        <div className="task-info">
                          <h3 className="task-title">{task.title}</h3>
                          <div className="task-meta">
                            <div
                              className={`task-priority priority-${task.priority}`}
                            >
                              {task.priority.charAt(0).toUpperCase() +
                                task.priority.slice(1)}
                            </div>
                            {task.category && (
                              <div className="task-category">
                                <span
                                  className="category-color"
                                  style={{
                                    backgroundColor: getCategoryColor(
                                      task.category
                                    ),
                                  }}
                                ></span>
                                {task.category}
                              </div>
                            )}
                            {task.dueDate && (
                              <div
                                className={`task-due-date ${
                                  isOverdue(task.dueDate) && !task.completed
                                    ? "overdue"
                                    : ""
                                }`}
                              >
                                <FaRegCalendarAlt className="date-icon" />
                                {formatDate(task.dueDate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="task-actions">
                        {task.pinned && (
                          <div className="pin-indicator">
                            <FaThumbtack />
                          </div>
                        )}
                        <button className="expand-btn" title="Toggle details">
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
                        {task.description && (
                          <div className="task-description">
                            <p>{task.description}</p>
                          </div>
                        )}

                        {task.tags && task.tags.length > 0 && (
                          <div className="task-tags">
                            <FaTag className="tags-icon" />
                            {task.tags.map((tag, index) => (
                              <span key={index} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="task-detail-actions">
                          <button
                            className="pin-btn"
                            onClick={() => toggleTaskPin(task.id)}
                            title={task.pinned ? "Unpin task" : "Pin task"}
                          >
                            <FaThumbtack />
                            <span>{task.pinned ? "Unpin" : "Pin"}</span>
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() => startEditingTask(task)}
                            title="Edit task"
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => deleteTask(task.id)}
                            title="Delete task"
                          >
                            <FaTrashAlt />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-tasks">
                <div className="empty-tasks-icon">
                  <FaTasks />
                </div>
                <h3>No tasks found</h3>
                <p>
                  {searchQuery || filterPriority || filterCategory
                    ? "Try changing your filter settings"
                    : "Add a new task to get started"}
                </p>
                {searchQuery || filterPriority || filterCategory ? (
                  <button className="reset-filters-btn" onClick={resetFilters}>
                    Reset Filters
                  </button>
                ) : (
                  <button
                    className="add-task-btn"
                    onClick={() => setIsAddingTask(true)}
                  >
                    <FaPlus />
                    <span>Add Your First Task</span>
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

export default GoalsPage;
