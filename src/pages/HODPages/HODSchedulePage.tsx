import React, { useState, useEffect } from 'react';
import { FiCalendar, FiPlus, FiEdit, FiTrash2, FiUsers, FiUser, FiUserCheck, FiChevronLeft, FiChevronRight, FiClock, FiMapPin, FiX, FiSave } from 'react-icons/fi';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  categories: ('coordinators' | 'interns' | 'supervisors')[];
  color: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id'>) => void;
  event?: Event;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, event }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    categories: [] as ('coordinators' | 'interns' | 'supervisors')[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        categories: event.categories
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        categories: []
      });
    }
    setErrors({});
  }, [event, isOpen]);

  const handleCategoryToggle = (category: 'coordinators' | 'interns' | 'supervisors') => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.categories.length === 0) newErrors.categories = 'At least one category must be selected';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const color = formData.categories.includes('coordinators') ? '#3B82F6' :
                   formData.categories.includes('interns') ? '#10B981' : '#8B5CF6';
      
      onSave({
        ...formData,
        color
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay">
      <div className="event-modal">
        <div className="modal-header">
          <h2>{event ? 'Edit Event' : 'Add New Event'}</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={errors.title ? 'error' : ''}
              placeholder="Enter event title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className={errors.time ? 'error' : ''}
              />
              {errors.time && <span className="error-message">{errors.time}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter event location"
            />
          </div>

          <div className="form-group categories-group">
            <label>Target Audience *</label>
            <div className="categories-grid">
              <div className={`category-checkbox ${formData.categories.includes('coordinators') ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  id="coordinators"
                  checked={formData.categories.includes('coordinators')}
                  onChange={() => handleCategoryToggle('coordinators')}
                />
                <label htmlFor="coordinators">
                  <FiUsers />
                  Coordinators
                </label>
              </div>
              <div className={`category-checkbox ${formData.categories.includes('interns') ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  id="interns"
                  checked={formData.categories.includes('interns')}
                  onChange={() => handleCategoryToggle('interns')}
                />
                <label htmlFor="interns">
                  <FiUser />
                  Interns
                </label>
              </div>
              <div className={`category-checkbox ${formData.categories.includes('supervisors') ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  id="supervisors"
                  checked={formData.categories.includes('supervisors')}
                  onChange={() => handleCategoryToggle('supervisors')}
                />
                <label htmlFor="supervisors">
                  <FiUserCheck />
                  Supervisors
                </label>
              </div>
            </div>
            {errors.categories && <span className="error-message">{errors.categories}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <FiSave />
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const HODSchedulePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Intern Orientation',
      description: 'Welcome session for new interns',
      date: '2024-01-15',
      time: '09:00',
      location: 'Main Auditorium',
      categories: ['interns'],
      color: '#10B981'
    },
    {
      id: '2',
      title: 'Coordinator Meeting',
      description: 'Monthly coordination meeting',
      date: '2024-01-20',
      time: '14:00',
      location: 'Conference Room A',
      categories: ['coordinators'],
      color: '#3B82F6'
    },
    {
      id: '3',
      title: 'Supervisor Workshop',
      description: 'Training workshop for supervisors',
      date: '2024-01-25',
      time: '10:00',
      location: 'Training Center',
      categories: ['supervisors'],
      color: '#8B5CF6'
    }
  ]);
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    setEditingEvent(undefined);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...eventData, id: editingEvent.id }
          : event
      ));
    } else {
      // Add new event
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString()
      };
      setEvents(prev => [...prev, newEvent]);
    }
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = formatDateForInput(clickedDate);
    setSelectedDate(dateString);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const todayString = formatDateForInput(today);

  return (
    <div className="hod-schedule-page">
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1>Schedule Management</h1>
          <p>Manage events and schedules for coordinators, interns, and supervisors</p>
        </div>
        <div className="dashboard__header-right">
            <div className="view-mode-selector">
              <button 
                className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
                onClick={() => setViewMode('month')}
              >
                Month
              </button>
              <button 
                className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
                onClick={() => setViewMode('week')}
              >
                Week
              </button>
              <button 
                className={`view-btn ${viewMode === 'day' ? 'active' : ''}`}
                onClick={() => setViewMode('day')}
              >
                Day
              </button>
            </div>
            <button className="btn-primary add-event-btn" onClick={handleAddEvent}>
              <FiPlus />
              Add Event
            </button>
          </div>
        </div>

      <div className="schedule-content">
        <div className="calendar-section">
          <div className="calendar-header">
            <div className="month-navigation">
              <button className="nav-btn" onClick={handlePrevMonth}>
                <FiChevronLeft />
              </button>
              <h2 className="current-month">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button className="nav-btn" onClick={handleNextMonth}>
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {daysOfWeek.map(day => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
            
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="calendar-day other-month"></div>;
              }
              
              const dateString = formatDateForInput(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
              const dayEvents = getEventsForDate(dateString);
              const isToday = dateString === todayString;
              const isSelected = dateString === selectedDate;
              
              return (
                <div 
                  key={`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`} 
                  className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  <span className="day-number">{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="day-events">
                      {dayEvents.slice(0, 3).map(event => (
                        <div 
                          key={event.id} 
                          className={`event-dot ${event.categories[0]}`}
                          title={event.title}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="events-sidebar">
          <div className="sidebar-header">
            <h3>Events</h3>
            {selectedDate && (
              <span className="selected-date">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            )}
          </div>
          
          <div className="events-list">
            {selectedDate ? (
              getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className={`event-item ${event.categories[0]}`}>
                    <div className="event-header">
                      <h4 className="event-title">{event.title}</h4>
                      <div className="event-actions">
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEditEvent(event)}
                          title="Edit Event"
                        >
                          <FiEdit />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDeleteEvent(event.id)}
                          title="Delete Event"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    
                    <div className="event-details">
                      <div className="event-time">
                        <FiClock />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="event-location">
                          <FiMapPin />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    
                    {event.description && (
                      <p className="event-description">{event.description}</p>
                    )}
                    
                    <div className="event-categories">
                      {event.categories.map(category => (
                        <span key={category} className={`category-tag ${category}`}>
                          {category === 'coordinators' && <FiUsers />}
                          {category === 'interns' && <FiUser />}
                          {category === 'supervisors' && <FiUserCheck />}
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events">
                  <FiCalendar />
                  <p>No events scheduled for this date</p>
                  <button className="add-event-btn" onClick={handleAddEvent}>
                    <FiPlus />
                    Add Event
                  </button>
                </div>
              )
            ) : (
              <div className="select-date">
                <FiCalendar />
                <p>Select a date to view events</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        event={editingEvent}
      />
    </div>
  );
};

export default HODSchedulePage;