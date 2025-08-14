import React, { useState, useRef } from "react";
import {
  FaUser,
  FaFileAlt,
  FaUpload,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaBuilding,
  FaGraduationCap,
  FaClock,
} from "react-icons/fa";

interface Intern {
  id: string;
  name: string;
  studentId: string;
  program: string;
  company: string;
  startDate: string;
  endDate: string;
  status: "ongoing" | "completed";
  profileImage?: string;
  lastActivity?: string;
}

const SupervisorEvaluation: React.FC = () => {
  const [selectedIntern, setSelectedIntern] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data with profile images - replace with actual API call
  const interns: Intern[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      studentId: "2020/CS/123",
      program: "Computer Science",
      company: "Tech Corp",
      startDate: "2024-01-15",
      endDate: "2024-07-15",
      status: "completed",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      name: "Michael Chen",
      studentId: "2020/CS/124",
      program: "Computer Science",
      company: "Innovation Labs",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      status: "completed",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
      lastActivity: "1 day ago",
    },
    {
      id: "3",
      name: "Emily Davis",
      studentId: "2020/CS/125",
      program: "Computer Science",
      company: "Digital Solutions",
      startDate: "2024-03-01",
      endDate: "2024-09-01",
      status: "ongoing",
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
      lastActivity: "5 minutes ago",
    },
    {
      id: "4",
      name: "James Wilson",
      studentId: "2020/IT/087",
      program: "Information Technology",
      company: "Cloud Systems",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      status: "completed",
      // No profile image - will show placeholder
      lastActivity: "3 days ago",
    },
    {
      id: "5",
      name: "Priya Fernando",
      studentId: "2020/SE/045",
      program: "Software Engineering",
      company: "Web Innovations",
      startDate: "2024-01-20",
      endDate: "2024-07-20",
      status: "completed",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
      lastActivity: "1 hour ago",
    },
    {
      id: "6",
      name: "Ahmed Hassan",
      studentId: "2020/IT/098",
      program: "Information Technology",
      company: "Data Systems Inc",
      startDate: "2024-02-15",
      endDate: "2024-08-15",
      status: "completed",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
      lastActivity: "4 hours ago",
    },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntern || !uploadedFile) {
      alert("Please select an intern and upload an evaluation form");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setSelectedIntern("");
        setUploadedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 3000);
    }, 2000);
  };

  const selectedInternData = interns.find(
    (intern) => intern.id === selectedIntern
  );

  // Get today's date
  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Mock current user data
  const currentUser = {
    name: "Dr. John Smith",
    avatar: "JS",
    role: "Supervisor",
  };

  // Get initials for avatar placeholder
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="dashboard__main supervisor-evaluation-page">
      {/* Header with consistent styling */}
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1>Intern Evaluation Submission</h1>
          <p>Submit evaluation forms for your completed internship students</p>
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

      <div className="evaluation-container">
        <form onSubmit={handleSubmit} className="evaluation-form">
          <div className="form-section">
            <h2>Select Intern</h2>
            <div className="intern-grid">
              {interns.map((intern) => (
                <div
                  key={intern.id}
                  className={`intern-card ${
                    selectedIntern === intern.id ? "selected" : ""
                  } ${intern.status === "ongoing" ? "disabled" : ""}`}
                  onClick={() =>
                    intern.status === "completed" &&
                    setSelectedIntern(intern.id)
                  }
                >
                  <div className="intern-card__header">
                    <div className="intern-card__avatar">
                      {intern.profileImage ? (
                        <img src={intern.profileImage} alt={intern.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {getInitials(intern.name)}
                        </div>
                      )}
                      <div
                        className={`intern-card__status-dot intern-card__status-dot--${intern.status}`}
                      ></div>
                    </div>
                    <div className="intern-card__info">
                      <h3>{intern.name}</h3>
                      <p className="student-id">{intern.studentId}</p>
                      <p className="program">{intern.program}</p>
                    </div>
                    <span className={`status-badge ${intern.status}`}>
                      {intern.status === "completed" ? (
                        <FaCheck size={12} />
                      ) : (
                        <FaClock size={12} />
                      )}
                      {intern.status}
                    </span>
                  </div>

                  <div className="intern-details">
                    <div className="detail-item">
                      <FaBuilding />
                      <span>{intern.company}</span>
                    </div>
                    <div className="detail-item">
                      <FaCalendarAlt />
                      <span>
                        {new Date(intern.startDate).toLocaleDateString()} -{" "}
                        {new Date(intern.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    {intern.lastActivity && (
                      <div className="detail-item">
                        <FaClock />
                        <span className="last-activity">
                          Active {intern.lastActivity}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedInternData && (
            <div className="form-section selected-intern-info">
              <h2>Selected Intern Details</h2>
              <div className="selected-intern-header">
                <div className="selected-intern-avatar">
                  {selectedInternData.profileImage ? (
                    <img
                      src={selectedInternData.profileImage}
                      alt={selectedInternData.name}
                    />
                  ) : (
                    <div className="avatar-placeholder-large">
                      {getInitials(selectedInternData.name)}
                    </div>
                  )}
                </div>
                <div className="selected-intern-main-info">
                  <h3>{selectedInternData.name}</h3>
                  <p className="selected-student-id">
                    {selectedInternData.studentId}
                  </p>
                  <p className="selected-program">
                    <FaGraduationCap /> {selectedInternData.program}
                  </p>
                </div>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>Company:</label>
                  <span>{selectedInternData.company}</span>
                </div>
                <div className="info-item">
                  <label>Internship Period:</label>
                  <span>
                    {new Date(
                      selectedInternData.startDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(selectedInternData.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="info-item">
                  <label>Duration:</label>
                  <span>
                    {Math.round(
                      (new Date(selectedInternData.endDate).getTime() -
                        new Date(selectedInternData.startDate).getTime()) /
                        (1000 * 60 * 60 * 24 * 30)
                    )}{" "}
                    months
                  </span>
                </div>
                <div className="info-item">
                  <label>Status:</label>
                  <span className={`status-text ${selectedInternData.status}`}>
                    {selectedInternData.status === "completed"
                      ? "Completed"
                      : "Ongoing"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="form-section">
            <h2>Upload Evaluation Form</h2>
            <div className="upload-section">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                id="file-upload"
                className="file-input"
              />
              <label htmlFor="file-upload" className="upload-area">
                <FaUpload className="upload-icon" />
                <span className="upload-text">
                  {uploadedFile
                    ? uploadedFile.name
                    : "Click to upload PDF evaluation form"}
                </span>
                <span className="upload-hint">Maximum file size: 10MB</span>
              </label>
              {uploadedFile && (
                <div className="file-preview">
                  <FaFileAlt className="file-icon" />
                  <div className="file-info">
                    <span className="file-name">{uploadedFile.name}</span>
                    <span className="file-size">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => {
                      setUploadedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={!selectedIntern || !uploadedFile || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                "Submit Evaluation"
              )}
            </button>
          </div>
        </form>

        {submitSuccess && (
          <div className="success-message">
            <FaCheck className="success-icon" />
            <p>Evaluation form submitted successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorEvaluation;
