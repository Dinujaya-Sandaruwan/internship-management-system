import React, { useState, useMemo } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaTh, 
  FaList, 
  FaEye, 
  FaEdit, 
  FaEnvelope, 
  FaBuilding, 
  FaUsers, 
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaDownload,
  FaUserTie,
  FaCheckCircle
} from 'react-icons/fa';
import mockReportsData from '../../../data/mockReportsData.json';

interface Supervisor {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  department: string;
  experience: number;
  specialization: string;
  totalInterns: number;
  activeInterns: number;
  averageRating: number;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  lastEvaluation: string;
  completedEvaluations: number;
}

// Generate mock supervisor data from reports
const generateSupervisorData = (): Supervisor[] => {
  const supervisorMap = new Map<string, { name: string; company: string; department: string; reports: typeof mockReportsData }>();
  
  mockReportsData.forEach((report: typeof mockReportsData[0]) => {
    const supervisorName = report.supervisorName;
    if (!supervisorMap.has(supervisorName)) {
      supervisorMap.set(supervisorName, {
        name: supervisorName,
        company: report.internCompany,
        department: report.internDepartment,
        reports: []
      });
    }
    supervisorMap.get(supervisorName)!.reports.push(report);
  });

  return Array.from(supervisorMap.entries()).map(([, data], index) => {
    const reports = data.reports;
    const avgRating = reports.reduce((sum: number, r: typeof mockReportsData[0]) => sum + r.overallRating, 0) / reports.length;
    const uniqueInterns = new Set(reports.map((r: typeof mockReportsData[0]) => r.internId)).size;
    
    return {
      id: index + 1,
      name: data.name,
      email: `${data.name.toLowerCase().replace(/\s+/g, '.')}@company.com`,
      phone: `+94 ${Math.floor(Math.random() * 900000000 + 100000000)}`,
      company: data.company,
      department: data.department,
      experience: Math.floor(Math.random() * 15) + 3,
      specialization: data.department === 'Information and Communication Technology' ? 'Software Development' : 'General Management',
      totalInterns: uniqueInterns,
      activeInterns: Math.floor(uniqueInterns * 0.8),
      averageRating: Number(avgRating.toFixed(1)),
      joinDate: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      status: ['Active', 'Active', 'Active', 'Inactive', 'On Leave'][Math.floor(Math.random() * 5)] as 'Active' | 'Inactive' | 'On Leave',
      lastEvaluation: reports[reports.length - 1]?.submissionDate || '2025-01-15',
      completedEvaluations: reports.length
    };
  });
};

const HODSupervisorInfoPage: React.FC = () => {
  const [supervisors] = useState<Supervisor[]>(generateSupervisorData());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSupervisors, setSelectedSupervisors] = useState<number[]>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState<Supervisor | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Get unique values for filters
  const departments = ['All', ...Array.from(new Set(supervisors.map(s => s.department)))];
  const companies = ['All', ...Array.from(new Set(supervisors.map(s => s.company)))];
  const statuses = ['All', 'Active', 'Inactive', 'On Leave'];

  // Filter and sort supervisors
  const filteredAndSortedSupervisors = useMemo(() => {
    const filtered = supervisors.filter(supervisor => {
      const matchesSearch = supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supervisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supervisor.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'All' || supervisor.department === selectedDepartment;
      const matchesCompany = selectedCompany === 'All' || supervisor.company === selectedCompany;
      const matchesStatus = selectedStatus === 'All' || supervisor.status === selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesCompany && matchesStatus;
    });

    // Sort supervisors
    filtered.sort((a, b) => {
      let aValue: string | number | Date = a[sortBy as keyof Supervisor];
      let bValue: string | number | Date = b[sortBy as keyof Supervisor];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [supervisors, searchTerm, selectedDepartment, selectedCompany, selectedStatus, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedSupervisors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSupervisors = filteredAndSortedSupervisors.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const stats = {
    total: supervisors.length,
    active: supervisors.filter(s => s.status === 'Active').length,
    companies: new Set(supervisors.map(s => s.company)).size,
    avgRating: Number((supervisors.reduce((sum, s) => sum + s.averageRating, 0) / supervisors.length).toFixed(1))
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSelectSupervisor = (supervisorId: number) => {
    setSelectedSupervisors(prev => 
      prev.includes(supervisorId) 
        ? prev.filter(id => id !== supervisorId)
        : [...prev, supervisorId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSupervisors.length === paginatedSupervisors.length) {
      setSelectedSupervisors([]);
    } else {
      setSelectedSupervisors(paginatedSupervisors.map(s => s.id));
    }
  };

  const handleViewDetails = (supervisor: Supervisor) => {
    setSelectedSupervisor(supervisor);
    setShowModal(true);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on supervisors:`, selectedSupervisors);
    // Implement bulk actions here
    setSelectedSupervisors([]);
  };

  const renderSupervisorCard = (supervisor: Supervisor) => (
    <div key={supervisor.id} className="supervisor-card">
      <div className="card-header">
        <div className="card-checkbox">
          <input
            type="checkbox"
            checked={selectedSupervisors.includes(supervisor.id)}
            onChange={() => handleSelectSupervisor(supervisor.id)}
          />
        </div>
        <div className={`status-badge ${supervisor.status.toLowerCase().replace(' ', '-')}`}>
          {supervisor.status}
        </div>
      </div>
      
      <div className="card-content">
        <div className="supervisor-info">
          <div className="supervisor-avatar">
            <img 
              src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${(supervisor.id % 99) + 1}.jpg`}
              alt={supervisor.name}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                const fallback = target.nextElementSibling as HTMLDivElement;
                target.style.display = 'none';
                if (fallback) {
                  fallback.style.display = 'flex';
                }
              }}
            />
            <div className="avatar-fallback" style={{display: 'none'}}>
              {supervisor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          </div>
          <h3>{supervisor.name}</h3>
          <p className="company"><FaBuilding /> {supervisor.company}</p>
          <p className="department">{supervisor.department}</p>
          <p className="experience">{supervisor.experience} years experience</p>
        </div>
        
        <div className="supervisor-stats">
          <div className="stat">
            <FaUsers className="stat-icon" />
            <span>{supervisor.activeInterns}/{supervisor.totalInterns}</span>
            <small>Active/Total Interns</small>
          </div>
          <div className="stat">
            <FaStar className="stat-icon" />
            <span>{supervisor.averageRating}</span>
            <small>Avg Rating</small>
          </div>
          <div className="stat">
            <FaCheckCircle className="stat-icon" />
            <span>{supervisor.completedEvaluations}</span>
            <small>Evaluations</small>
          </div>
        </div>
      </div>
      
      <div className="card-actions">
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => handleViewDetails(supervisor)}
        >
          <FaEye /> View Details
        </button>
        <button className="btn btn-secondary btn-sm">
          <FaEnvelope /> Contact
        </button>
      </div>
    </div>
  );

  const renderSupervisorTable = () => (
    <div className="table-container">
      <table className="supervisors-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedSupervisors.length === paginatedSupervisors.length && paginatedSupervisors.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th onClick={() => handleSort('name')} className="sortable">
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('company')} className="sortable">
              Company {sortBy === 'company' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('department')} className="sortable">
              Department {sortBy === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('activeInterns')} className="sortable">
              Active Interns {sortBy === 'activeInterns' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('averageRating')} className="sortable">
              Rating {sortBy === 'averageRating' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('status')} className="sortable">
              Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSupervisors.map(supervisor => (
            <tr key={supervisor.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedSupervisors.includes(supervisor.id)}
                  onChange={() => handleSelectSupervisor(supervisor.id)}
                />
              </td>
              <td>
                <div className="supervisor-name">
                  <strong>{supervisor.name}</strong>
                  <small>{supervisor.email}</small>
                </div>
              </td>
              <td>{supervisor.company}</td>
              <td>{supervisor.department}</td>
              <td>
                <span className="intern-count">
                  {supervisor.activeInterns}/{supervisor.totalInterns}
                </span>
              </td>
              <td>
                <div className="rating">
                  <FaStar className="star-icon" />
                  {supervisor.averageRating}
                </div>
              </td>
              <td>
                <span className={`status-badge ${supervisor.status.toLowerCase().replace(' ', '-')}`}>
                  {supervisor.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleViewDetails(supervisor)}
                  >
                    <FaEye />
                  </button>
                  <button className="btn btn-sm btn-secondary">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-secondary">
                    <FaEnvelope />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="dashboard__main">
      <div className="hod-supervisor-info">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1>Supervisor Information</h1>
          <p>Manage and monitor supervisor details across all departments</p>
        </div>
        <div className="dashboard__header-right">
          <button className="btn btn-primary">
            <FaDownload /> Export Data
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="page-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUserTie />
          </div>
          <div className="stat-info">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Supervisors</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <div className="stat-number">{stats.active}</div>
            <div className="stat-label">Active Supervisors</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaBuilding />
          </div>
          <div className="stat-info">
            <div className="stat-number">{stats.companies}</div>
            <div className="stat-label">Partner Companies</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <FaStar />
          </div>
          <div className="stat-info">
            <div className="stat-number">{stats.avgRating}</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="page-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search supervisors by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className={`btn btn-secondary ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>

        <div className="view-controls">
          <div className="view-toggle">
            <button 
              className={`btn ${viewMode === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('cards')}
            >
              <FaTh /> Cards
            </button>
            <button 
              className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('table')}
            >
              <FaList /> Table
            </button>
          </div>

          {selectedSupervisors.length > 0 && (
            <div className="bulk-actions">
              <span className="selected-count">{selectedSupervisors.length} selected</span>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleBulkAction('export')}
              >
                <FaDownload /> Export
              </button>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleBulkAction('email')}
              >
                <FaEnvelope /> Email
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Department:</label>
            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Company:</label>
            <select 
              value={selectedCompany} 
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="company">Company</option>
              <option value="department">Department</option>
              <option value="averageRating">Rating</option>
              <option value="activeInterns">Active Interns</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="page-content">
        {viewMode === 'cards' ? (
          <div className="supervisors-grid">
            {paginatedSupervisors.map(renderSupervisorCard)}
          </div>
        ) : (
          renderSupervisorTable()
        )}

        {filteredAndSortedSupervisors.length === 0 && (
          <div className="no-results">
            <p>No supervisors found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaChevronLeft /> Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i));
              return (
                <button
                  key={pageNum}
                  className={`btn ${currentPage === pageNum ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next <FaChevronRight />
          </button>
        </div>
      )}

      {/* Supervisor Details Modal */}
      {showModal && selectedSupervisor && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Supervisor Details</h2>
              <button 
                className="modal-close btn btn-secondary btn-sm"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="supervisor-details">
                <div className="detail-section">
                  <h3>Personal Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Name:</label>
                      <span>{selectedSupervisor.name}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <span>{selectedSupervisor.email}</span>
                    </div>
                    <div className="detail-item">
                      <label>Phone:</label>
                      <span>{selectedSupervisor.phone}</span>
                    </div>
                    <div className="detail-item">
                      <label>Experience:</label>
                      <span>{selectedSupervisor.experience} years</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h3>Company Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Company:</label>
                      <span>{selectedSupervisor.company}</span>
                    </div>
                    <div className="detail-item">
                      <label>Department:</label>
                      <span>{selectedSupervisor.department}</span>
                    </div>
                    <div className="detail-item">
                      <label>Specialization:</label>
                      <span>{selectedSupervisor.specialization}</span>
                    </div>
                    <div className="detail-item">
                      <label>Join Date:</label>
                      <span>{selectedSupervisor.joinDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h3>Performance Metrics</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Total Interns Supervised:</label>
                      <span>{selectedSupervisor.totalInterns}</span>
                    </div>
                    <div className="detail-item">
                      <label>Currently Active Interns:</label>
                      <span>{selectedSupervisor.activeInterns}</span>
                    </div>
                    <div className="detail-item">
                      <label>Average Rating:</label>
                      <span className="rating">
                        <FaStar className="star-icon" />
                        {selectedSupervisor.averageRating}
                      </span>
                    </div>
                    <div className="detail-item">
                      <label>Completed Evaluations:</label>
                      <span>{selectedSupervisor.completedEvaluations}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-primary">
                <FaEdit /> Edit Supervisor
              </button>
              <button className="btn btn-secondary">
                <FaEnvelope /> Send Email
              </button>
              <button className="btn btn-secondary">
                <FaDownload /> Export Details
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default HODSupervisorInfoPage;