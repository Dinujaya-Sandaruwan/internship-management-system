import React, { useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiMail,
  FiPhone,
  FiUser,
  FiX,
  FiCheck,
  FiAlertTriangle,
  FiEye,
  FiUsers,
  FiCalendar,
  FiBookOpen,
  FiAward,
} from "react-icons/fi";

interface Coordinator {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
  experience: string;
  qualifications: string;
  activeInterns: number;
  completedInternships: number;
  status: "active" | "inactive";
  profileImage?: string;
}

interface Department {
  code: string;
  name: string;
  hasCoordinator: boolean;
}

const HODManageCoordinatorsPage: React.FC = () => {
  const [coordinators, setCoordinators] = useState<Coordinator[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      position: "Senior Coordinator",
      joinDate: "2020-01-15",
      experience: "8 years",
      qualifications: "PhD in Computer Science, MBA",
      activeInterns: 25,
      completedInternships: 150,
      status: "active",
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      phone: "+1 (555) 234-5678",
      department: "Engineering",
      position: "Lead Coordinator",
      joinDate: "2019-03-20",
      experience: "10 years",
      qualifications: "PhD in Engineering, PMP Certified",
      activeInterns: 30,
      completedInternships: 200,
      status: "active",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@university.edu",
      phone: "+1 (555) 345-6789",
      department: "Business Administration",
      position: "Coordinator",
      joinDate: "2021-08-10",
      experience: "5 years",
      qualifications: "PhD in Business, CPA",
      activeInterns: 20,
      completedInternships: 80,
      status: "active",
    },
  ]);

  const [departments] = useState<Department[]>([
    { code: "CS", name: "Computer Science", hasCoordinator: true },
    { code: "ENG", name: "Engineering", hasCoordinator: true },
    { code: "BA", name: "Business Administration", hasCoordinator: true },
    { code: "MED", name: "Medicine", hasCoordinator: false },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCoordinator, setSelectedCoordinator] = useState<Coordinator | null>(null);
  const [formData, setFormData] = useState<Partial<Coordinator>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter coordinators based on search and filters
  const filteredCoordinators = coordinators.filter((coordinator) => {
    const matchesSearch = coordinator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coordinator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coordinator.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || coordinator.department === filterDepartment;
    const matchesStatus = !filterStatus || coordinator.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Reset form data
  const resetForm = () => {
    setFormData({});
    setErrors({});
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.position?.trim()) newErrors.position = "Position is required";
    if (!formData.experience?.trim()) newErrors.experience = "Experience is required";
    if (!formData.qualifications?.trim()) newErrors.qualifications = "Qualifications are required";

    // Check if department already has a coordinator (for add mode)
    if (!showEditModal && formData.department) {
      const departmentHasCoordinator = coordinators.some(
        coord => coord.department === formData.department
      );
      if (departmentHasCoordinator) {
        newErrors.department = "This department already has a coordinator";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle add coordinator
  const handleAddCoordinator = () => {
    if (!validateForm()) return;

    const newCoordinator: Coordinator = {
      id: Date.now().toString(),
      name: formData.name!,
      email: formData.email!,
      phone: formData.phone!,
      department: formData.department!,
      position: formData.position!,
      joinDate: new Date().toISOString().split('T')[0],
      experience: formData.experience!,
      qualifications: formData.qualifications!,
      activeInterns: 0,
      completedInternships: 0,
      status: "active",
    };

    setCoordinators([...coordinators, newCoordinator]);
    setShowAddModal(false);
    resetForm();
  };

  // Handle edit coordinator
  const handleEditCoordinator = () => {
    if (!validateForm() || !selectedCoordinator) return;

    const updatedCoordinators = coordinators.map(coord =>
      coord.id === selectedCoordinator.id
        ? { ...coord, ...formData }
        : coord
    );

    setCoordinators(updatedCoordinators);
    setShowEditModal(false);
    setSelectedCoordinator(null);
    resetForm();
  };

  // Handle delete coordinator
  const handleDeleteCoordinator = () => {
    if (!selectedCoordinator) return;

    setCoordinators(coordinators.filter(coord => coord.id !== selectedCoordinator.id));
    setShowDeleteModal(false);
    setSelectedCoordinator(null);
  };

  // Open edit modal
  const openEditModal = (coordinator: Coordinator) => {
    setSelectedCoordinator(coordinator);
    setFormData(coordinator);
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (coordinator: Coordinator) => {
    setSelectedCoordinator(coordinator);
    setShowDeleteModal(true);
  };

  // Open view modal
  const openViewModal = (coordinator: Coordinator) => {
    setSelectedCoordinator(coordinator);
    setShowViewModal(true);
  };

  // Get available departments for dropdown
  const getAvailableDepartments = () => {
    if (showEditModal && selectedCoordinator) {
      return departments;
    }
    return departments.filter(dept => !dept.hasCoordinator);
  };

  return (
    <div className="hod-manage-coordinators">
      <div className="dashboard__main">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1>Manage Coordinators</h1>
            <p>Manage department coordinators and their assignments</p>
          </div>
          <div className="dashboard__header-right">
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
              disabled={departments.filter(d => !d.hasCoordinator).length === 0}
            >
              <FiPlus /> Add Coordinator
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FiUsers />
            </div>
            <div className="stat-content">
              <h3>{coordinators.length}</h3>
              <p>Total Coordinators</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiBookOpen />
            </div>
            <div className="stat-content">
              <h3>{departments.filter(d => d.hasCoordinator).length}</h3>
              <p>Departments Covered</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiUser />
            </div>
            <div className="stat-content">
              <h3>{coordinators.reduce((sum, coord) => sum + coord.activeInterns, 0)}</h3>
              <p>Active Interns</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiAward />
            </div>
            <div className="stat-content">
              <h3>{coordinators.reduce((sum, coord) => sum + coord.completedInternships, 0)}</h3>
              <p>Completed Internships</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search coordinators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept.code} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="view-toggle">
              <button
                className={`btn btn-sm ${viewMode === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setViewMode('cards')}
              >
                Cards
              </button>
              <button
                className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setViewMode('table')}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Coordinators Display */}
        {viewMode === 'cards' ? (
          <div className="coordinators-grid">
            {filteredCoordinators.map((coordinator) => (
              <div key={coordinator.id} className="coordinator-card">
                <div className="coordinator-header">
                  <div className="coordinator-avatar">
                    <img
                      src={`https://randomuser.me/api/portraits/${parseInt(coordinator.id) % 2 === 0 ? 'men' : 'women'}/${(parseInt(coordinator.id) % 50) + 1}.jpg`}
                      alt={coordinator.name}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = target.nextElementSibling as HTMLDivElement;
                        if (fallback) {
                          target.style.display = 'none';
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="avatar-fallback" style={{ display: 'none' }}>
                      {coordinator.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="coordinator-info">
                    <h3>{coordinator.name}</h3>
                    <p className="position">{coordinator.position}</p>
                    <span className={`status-badge ${coordinator.status}`}>
                      {coordinator.status}
                    </span>
                  </div>
                </div>
                <div className="coordinator-details">
                  <div className="detail-item">
                    <FiBookOpen className="detail-icon" />
                    <span>{coordinator.department}</span>
                  </div>
                  <div className="detail-item">
                    <FiMail className="detail-icon" />
                    <span>{coordinator.email}</span>
                  </div>
                  <div className="detail-item">
                    <FiPhone className="detail-icon" />
                    <span>{coordinator.phone}</span>
                  </div>
                  <div className="detail-item">
                    <FiUsers className="detail-icon" />
                    <span>{coordinator.activeInterns} Active Interns</span>
                  </div>
                </div>
                <div className="coordinator-actions">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => openViewModal(coordinator)}
                  >
                    <FiEye /> View
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openEditModal(coordinator)}
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => openDeleteModal(coordinator)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="coordinators-table">
            <table>
              <thead>
                <tr>
                  <th>Coordinator</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Experience</th>
                  <th>Active Interns</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoordinators.map((coordinator) => (
                  <tr key={coordinator.id}>
                    <td>
                      <div className="coordinator-cell">
                        <div className="coordinator-avatar small">
                          <img
                            src={`https://randomuser.me/api/portraits/${parseInt(coordinator.id) % 2 === 0 ? 'men' : 'women'}/${(parseInt(coordinator.id) % 50) + 1}.jpg`}
                            alt={coordinator.name}
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              const fallback = target.nextElementSibling as HTMLDivElement;
                              if (fallback) {
                                target.style.display = 'none';
                                fallback.style.display = 'flex';
                              }
                            }}
                          />
                          <div className="avatar-fallback" style={{ display: 'none' }}>
                            {coordinator.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div>
                          <div className="coordinator-name">{coordinator.name}</div>
                          <div className="coordinator-position">{coordinator.position}</div>
                        </div>
                      </div>
                    </td>
                    <td>{coordinator.department}</td>
                    <td>
                      <div>{coordinator.email}</div>
                      <div className="phone">{coordinator.phone}</div>
                    </td>
                    <td>{coordinator.experience}</td>
                    <td>{coordinator.activeInterns}</td>
                    <td>
                      <span className={`status-badge ${coordinator.status}`}>
                        {coordinator.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-icon btn-sm"
                          onClick={() => openViewModal(coordinator)}
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                        <button
                          className="btn btn-icon btn-sm"
                          onClick={() => openEditModal(coordinator)}
                          title="Edit Coordinator"
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="btn btn-icon btn-sm btn-danger"
                          onClick={() => openDeleteModal(coordinator)}
                          title="Delete Coordinator"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Coordinator Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Add New Coordinator</h2>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                      <label>Department *</label>
                      <select
                        value={formData.department || ''}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className={errors.department ? 'error' : ''}
                      >
                        <option value="">Select Department</option>
                        {getAvailableDepartments().map(dept => (
                          <option key={dept.code} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                      {errors.department && <span className="error-text">{errors.department}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Position *</label>
                      <input
                        type="text"
                        value={formData.position || ''}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                        className={errors.position ? 'error' : ''}
                      />
                      {errors.position && <span className="error-text">{errors.position}</span>}
                    </div>
                    <div className="form-group">
                      <label>Experience *</label>
                      <input
                        type="text"
                        placeholder="e.g., 5 years"
                        value={formData.experience || ''}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className={errors.experience ? 'error' : ''}
                      />
                      {errors.experience && <span className="error-text">{errors.experience}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Qualifications *</label>
                    <textarea
                      value={formData.qualifications || ''}
                      onChange={(e) => setFormData({...formData, qualifications: e.target.value})}
                      className={errors.qualifications ? 'error' : ''}
                      rows={3}
                    />
                    {errors.qualifications && <span className="error-text">{errors.qualifications}</span>}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAddCoordinator}
                >
                  <FiCheck /> Add Coordinator
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Coordinator Modal */}
        {showEditModal && selectedCoordinator && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Edit Coordinator</h2>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCoordinator(null);
                    resetForm();
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                      <label>Department *</label>
                      <select
                        value={formData.department || ''}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className={errors.department ? 'error' : ''}
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept.code} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                      {errors.department && <span className="error-text">{errors.department}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Position *</label>
                      <input
                        type="text"
                        value={formData.position || ''}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                        className={errors.position ? 'error' : ''}
                      />
                      {errors.position && <span className="error-text">{errors.position}</span>}
                    </div>
                    <div className="form-group">
                      <label>Experience *</label>
                      <input
                        type="text"
                        placeholder="e.g., 5 years"
                        value={formData.experience || ''}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className={errors.experience ? 'error' : ''}
                      />
                      {errors.experience && <span className="error-text">{errors.experience}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Qualifications *</label>
                    <textarea
                      value={formData.qualifications || ''}
                      onChange={(e) => setFormData({...formData, qualifications: e.target.value})}
                      className={errors.qualifications ? 'error' : ''}
                      rows={3}
                    />
                    {errors.qualifications && <span className="error-text">{errors.qualifications}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={formData.status || 'active'}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCoordinator(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleEditCoordinator}
                >
                  <FiCheck /> Update Coordinator
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Coordinator Modal */}
        {showViewModal && selectedCoordinator && (
          <div className="modal-overlay">
            <div className="modal large">
              <div className="modal-header">
                <h2>Coordinator Details</h2>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedCoordinator(null);
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="coordinator-profile">
                  <div className="profile-header">
                    <div className="coordinator-avatar large">
                      <img
                        src={`https://randomuser.me/api/portraits/${parseInt(selectedCoordinator.id) % 2 === 0 ? 'men' : 'women'}/${(parseInt(selectedCoordinator.id) % 50) + 1}.jpg`}
                        alt={selectedCoordinator.name}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          const fallback = target.nextElementSibling as HTMLDivElement;
                          if (fallback) {
                            target.style.display = 'none';
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="avatar-fallback" style={{ display: 'none' }}>
                        {selectedCoordinator.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="profile-info">
                      <h3>{selectedCoordinator.name}</h3>
                      <p className="position">{selectedCoordinator.position}</p>
                      <span className={`status-badge ${selectedCoordinator.status}`}>
                        {selectedCoordinator.status}
                      </span>
                    </div>
                  </div>
                  <div className="profile-details">
                    <div className="detail-section">
                      <h4>Contact Information</h4>
                      <div className="detail-grid">
                        <div className="detail-item">
                          <FiMail className="detail-icon" />
                          <div>
                            <label>Email</label>
                            <span>{selectedCoordinator.email}</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FiPhone className="detail-icon" />
                          <div>
                            <label>Phone</label>
                            <span>{selectedCoordinator.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="detail-section">
                      <h4>Professional Information</h4>
                      <div className="detail-grid">
                        <div className="detail-item">
                          <FiBookOpen className="detail-icon" />
                          <div>
                            <label>Department</label>
                            <span>{selectedCoordinator.department}</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FiCalendar className="detail-icon" />
                          <div>
                            <label>Join Date</label>
                            <span>{new Date(selectedCoordinator.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FiAward className="detail-icon" />
                          <div>
                            <label>Experience</label>
                            <span>{selectedCoordinator.experience}</span>
                          </div>
                        </div>
                        <div className="detail-item full-width">
                          <FiUser className="detail-icon" />
                          <div>
                            <label>Qualifications</label>
                            <span>{selectedCoordinator.qualifications}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="detail-section">
                      <h4>Performance Metrics</h4>
                      <div className="metrics-grid">
                        <div className="metric-card">
                          <div className="metric-value">{selectedCoordinator.activeInterns}</div>
                          <div className="metric-label">Active Interns</div>
                        </div>
                        <div className="metric-card">
                          <div className="metric-value">{selectedCoordinator.completedInternships}</div>
                          <div className="metric-label">Completed Internships</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedCoordinator(null);
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedCoordinator);
                  }}
                >
                  <FiEdit /> Edit Coordinator
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedCoordinator && (
          <div className="modal-overlay">
            <div className="modal small">
              <div className="modal-header">
                <h2>Confirm Delete</h2>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCoordinator(null);
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="delete-confirmation">
                  <FiAlertTriangle className="warning-icon" />
                  <h3>Delete Coordinator</h3>
                  <p>
                    Are you sure you want to delete <strong>{selectedCoordinator.name}</strong>?
                    This action cannot be undone.
                  </p>
                  {selectedCoordinator.activeInterns > 0 && (
                    <div className="warning-message">
                      <FiAlertTriangle />
                      <span>
                        This coordinator has {selectedCoordinator.activeInterns} active interns.
                        Please reassign them before deletion.
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCoordinator(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteCoordinator}
                  disabled={selectedCoordinator.activeInterns > 0}
                >
                  <FiTrash2 /> Delete Coordinator
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HODManageCoordinatorsPage;