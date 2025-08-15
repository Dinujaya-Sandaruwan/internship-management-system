import React, { useState, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaLinkedin,
  FaGlobe,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaLanguage,
  FaAward,
  FaSave,
  FaCamera,
  FaIdCard,
  FaTimes,
  FaPlus,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaUserTie,
  FaChartLine,
} from "react-icons/fa";

interface SupervisorFormData {
  // Personal Information
  fullName: string;
  profilePhoto: File | null;
  employeeId: string;
  workEmail: string;
  workPhone: string;
  personalPhone: string;
  dateOfBirth: string;
  gender: string;
  nationalId: string;

  // Professional Information
  jobTitle: string;
  companyName: string;
  companyAddress: string;
  department: string;
  yearsOfExperience: string;
  linkedinUrl: string;
  professionalWebsite: string;

  // Academic Background
  highestQualification: string;
  fieldOfStudy: string;
  university: string;
  graduationYear: string;

  // Supervision Details
  areasOfExpertise: string[];
  industrySectors: string[];
  maxInterns: string;
  preferredDuration: string;
  availableDays: string[];
  officeHours: string;
  supervisionExperience: string;
  previousInterns: string;

  // Communication Preferences
  preferredCommunication: string;
  responseTime: string;
  meetingFrequency: string;
  supervisionMode: string;

  // Additional Information
  bio: string;
  specialSkills: string;
  awards: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const SupervisorUpdateProfile: React.FC = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Languages state
  const [languages, setLanguages] = useState([
    { language: "English", proficiency: "Fluent" },
  ]);

  // Certifications state
  const [certifications, setCertifications] = useState([
    { name: "", issuer: "", year: "" },
  ]);

  // Form data state
  const [formData, setFormData] = useState<SupervisorFormData>({
    // Personal Information
    fullName: "Dr. Kumara Jayasuriya",
    profilePhoto: null,
    employeeId: "EMP001234",
    workEmail: "kumara.jayasuriya@techsolutions.lk",
    workPhone: "+94 11 234 5678",
    personalPhone: "+94 77 123 4567",
    dateOfBirth: "1978-05-15",
    gender: "male",
    nationalId: "781234567V",

    // Professional Information
    jobTitle: "Senior Software Engineer",
    companyName: "Tech Solutions Ltd.",
    companyAddress: "123 Tech Park, Colombo 03",
    department: "Software Engineering",
    yearsOfExperience: "12",
    linkedinUrl: "https://linkedin.com/in/kumara-jayasuriya",
    professionalWebsite: "https://kumara-tech.com",

    // Academic Background
    highestQualification: "PhD",
    fieldOfStudy: "Computer Science",
    university: "University of Colombo",
    graduationYear: "2010",

    // Supervision Details
    areasOfExpertise: ["Software Development", "AI/ML", "Cloud Computing"],
    industrySectors: ["Technology", "Finance", "Healthcare"],
    maxInterns: "5",
    preferredDuration: "6",
    availableDays: ["Monday", "Wednesday", "Friday"],
    officeHours: "9:00 AM - 5:00 PM",
    supervisionExperience: "8",
    previousInterns: "24",

    // Communication Preferences
    preferredCommunication: "email",
    responseTime: "24",
    meetingFrequency: "weekly",
    supervisionMode: "hybrid",

    // Additional Information
    bio: "Experienced software engineer with a passion for mentoring young talent...",
    specialSkills: "Python, Java, React, AWS, Docker, Kubernetes",
    awards: "Best Mentor Award 2023, Innovation Award 2022",
    emergencyContact: "Jane Jayasuriya",
    emergencyPhone: "+94 77 987 6543",
  });

  // Expertise options
  const expertiseOptions = [
    "Software Development",
    "Web Development",
    "Mobile Development",
    "AI/ML",
    "Data Science",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "UI/UX Design",
    "Database Management",
    "Project Management",
    "Business Analysis",
  ];

  // Industry sectors
  const industrySectors = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "E-commerce",
    "Telecommunications",
    "Manufacturing",
    "Retail",
    "Government",
    "Non-profit",
  ];

  // Available days
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePhoto: file });
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleExpertiseToggle = (expertise: string) => {
    setFormData((prev) => ({
      ...prev,
      areasOfExpertise: prev.areasOfExpertise.includes(expertise)
        ? prev.areasOfExpertise.filter((e) => e !== expertise)
        : [...prev.areasOfExpertise, expertise],
    }));
  };

  const handleSectorToggle = (sector: string) => {
    setFormData((prev) => ({
      ...prev,
      industrySectors: prev.industrySectors.includes(sector)
        ? prev.industrySectors.filter((s) => s !== sector)
        : [...prev.industrySectors, sector],
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: "", proficiency: "Beginner" }]);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setLanguages(updatedLanguages);
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: "", issuer: "", year: "" }]);
  };

  const removeCertification = (index: number) => {
    const updatedCerts = [...certifications];
    updatedCerts.splice(index, 1);
    setCertifications(updatedCerts);
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updatedCerts = [...certifications];
    updatedCerts[index] = { ...updatedCerts[index], [field]: value };
    setCertifications(updatedCerts);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.workEmail) newErrors.workEmail = "Work email is required";
    if (!formData.workPhone) newErrors.workPhone = "Work phone is required";
    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!formData.companyName)
      newErrors.companyName = "Company name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setShowSuccessMessage(true);
        setProfileCompletion(85);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }, 1000);
    }
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: FaUser },
    { id: "professional", label: "Professional", icon: FaBriefcase },
    { id: "academic", label: "Academic", icon: FaGraduationCap },
    { id: "supervision", label: "Supervision", icon: FaUserTie },
    { id: "communication", label: "Communication", icon: FaEnvelope },
    { id: "additional", label: "Additional", icon: FaInfoCircle },
  ];

  return (
    <div className="dashboard__main supervisor-update-profile">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1>Update Profile</h1>
          <p>
            Keep your information up to date for better supervision matching
          </p>
        </div>
        <div className="dashboard__header-right">
          <div className="profile-completion">
            <div className="completion-text">
              <span>Profile Completion</span>
              <span className="completion-percentage">
                {profileCompletion}%
              </span>
            </div>
            <div className="completion-bar">
              <div
                className="completion-fill"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          <FaCheckCircle />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Warning Message */}
      {profileCompletion < 80 && (
        <div className="warning-message">
          <FaExclamationTriangle />
          <span>
            Complete at least 80% of your profile to send supervision requests
            to interns
          </span>
        </div>
      )}

      {/* Section Tabs */}
      <div className="section-tabs">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`section-tab ${
              activeSection === section.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <section.icon />
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="update-profile-form">
        {/* Personal Information Section */}
        {activeSection === "personal" && (
          <div className="form-section">
            <h2>
              <FaUser /> Personal Information
            </h2>

            {/* Profile Photo */}
            <div className="profile-photo-section">
              <div className="photo-preview">
                {previewPhoto ? (
                  <img src={previewPhoto} alt="Profile" />
                ) : (
                  <div className="photo-placeholder">
                    <FaCamera />
                  </div>
                )}
              </div>
              <div className="photo-actions">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className="btn-upload"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaCamera /> Upload Photo
                </button>
                <p className="photo-hint">
                  Upload a professional photo (Max 5MB, JPG/PNG)
                </p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">
                  <FaUser className="field-icon" />
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? "error" : ""}
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="employeeId">
                  <FaIdCard className="field-icon" />
                  Employee ID*
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="workEmail">
                  <FaEnvelope className="field-icon" />
                  Work Email*
                </label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  className={errors.workEmail ? "error" : ""}
                />
                {errors.workEmail && (
                  <span className="error-message">{errors.workEmail}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="workPhone">
                  <FaPhone className="field-icon" />
                  Work Phone*
                </label>
                <input
                  type="tel"
                  id="workPhone"
                  name="workPhone"
                  value={formData.workPhone}
                  onChange={handleInputChange}
                  className={errors.workPhone ? "error" : ""}
                />
                {errors.workPhone && (
                  <span className="error-message">{errors.workPhone}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="personalPhone">
                  <FaPhone className="field-icon" />
                  Personal Phone
                </label>
                <input
                  type="tel"
                  id="personalPhone"
                  name="personalPhone"
                  value={formData.personalPhone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">
                  <FaCalendarAlt className="field-icon" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">
                  <FaUser className="field-icon" />
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nationalId">
                  <FaIdCard className="field-icon" />
                  National ID/Passport
                </label>
                <input
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Professional Information Section */}
        {activeSection === "professional" && (
          <div className="form-section">
            <h2>
              <FaBriefcase /> Professional Information
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobTitle">
                  <FaBriefcase className="field-icon" />
                  Job Title/Position*
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className={errors.jobTitle ? "error" : ""}
                />
                {errors.jobTitle && (
                  <span className="error-message">{errors.jobTitle}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="department">
                  <FaUsers className="field-icon" />
                  Department*
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyName">
                  <FaBuilding className="field-icon" />
                  Company Name*
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={errors.companyName ? "error" : ""}
                />
                {errors.companyName && (
                  <span className="error-message">{errors.companyName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="yearsOfExperience">
                  <FaChartLine className="field-icon" />
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="companyAddress">
                <FaMapMarkerAlt className="field-icon" />
                Company Address
              </label>
              <textarea
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="linkedinUrl">
                  <FaLinkedin className="field-icon" />
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="professionalWebsite">
                  <FaGlobe className="field-icon" />
                  Professional Website
                </label>
                <input
                  type="url"
                  id="professionalWebsite"
                  name="professionalWebsite"
                  value={formData.professionalWebsite}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        )}

        {/* Academic Background Section */}
        {activeSection === "academic" && (
          <div className="form-section">
            <h2>
              <FaGraduationCap /> Academic Background
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="highestQualification">
                  <FaGraduationCap className="field-icon" />
                  Highest Qualification
                </label>
                <select
                  id="highestQualification"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleInputChange}
                >
                  <option value="">Select Qualification</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor's Degree</option>
                  <option value="Master">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Professional">
                    Professional Certification
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fieldOfStudy">
                  <FaGraduationCap className="field-icon" />
                  Field of Study
                </label>
                <input
                  type="text"
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="university">
                  <FaGraduationCap className="field-icon" />
                  University/Institution
                </label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="graduationYear">
                  <FaCalendarAlt className="field-icon" />
                  Graduation Year
                </label>
                <input
                  type="number"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  min="1970"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            {/* Professional Certifications */}
            <div className="certifications-section">
              <h3>Professional Certifications</h3>
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <div className="certification-inputs">
                    <input
                      type="text"
                      placeholder="Certification Name"
                      value={cert.name}
                      onChange={(e) =>
                        updateCertification(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Issuing Organization"
                      value={cert.issuer}
                      onChange={(e) =>
                        updateCertification(index, "issuer", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={cert.year}
                      onChange={(e) =>
                        updateCertification(index, "year", e.target.value)
                      }
                    />
                  </div>
                  {certifications.length > 1 && (
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeCertification(index)}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn-add"
                onClick={addCertification}
              >
                <FaPlus /> Add Certification
              </button>
            </div>
          </div>
        )}

        {/* Supervision Details Section */}
        {activeSection === "supervision" && (
          <div className="form-section">
            <h2>
              <FaUserTie /> Supervision Details
            </h2>

            {/* Areas of Expertise */}
            <div className="checkbox-group">
              <label className="group-label">
                <FaBriefcase className="field-icon" />
                Areas of Expertise
              </label>
              <div className="checkbox-grid">
                {expertiseOptions.map((expertise) => (
                  <label key={expertise} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.areasOfExpertise.includes(expertise)}
                      onChange={() => handleExpertiseToggle(expertise)}
                    />
                    <span>{expertise}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Industry Sectors */}
            <div className="checkbox-group">
              <label className="group-label">
                <FaBuilding className="field-icon" />
                Industry Sectors
              </label>
              <div className="checkbox-grid">
                {industrySectors.map((sector) => (
                  <label key={sector} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.industrySectors.includes(sector)}
                      onChange={() => handleSectorToggle(sector)}
                    />
                    <span>{sector}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="maxInterns">
                  <FaUsers className="field-icon" />
                  Maximum Number of Interns
                </label>
                <input
                  type="number"
                  id="maxInterns"
                  name="maxInterns"
                  value={formData.maxInterns}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                />
              </div>
              <div className="form-group">
                <label htmlFor="preferredDuration">
                  <FaCalendarAlt className="field-icon" />
                  Preferred Duration (months)
                </label>
                <input
                  type="number"
                  id="preferredDuration"
                  name="preferredDuration"
                  value={formData.preferredDuration}
                  onChange={handleInputChange}
                  min="1"
                  max="12"
                />
              </div>
            </div>

            {/* Available Days */}
            <div className="checkbox-group">
              <label className="group-label">
                <FaCalendarAlt className="field-icon" />
                Available Days for Supervision
              </label>
              <div className="checkbox-grid days-grid">
                {weekDays.map((day) => (
                  <label key={day} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.availableDays.includes(day)}
                      onChange={() => handleDayToggle(day)}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="officeHours">
                  <FaClock className="field-icon" />
                  Office Hours/Availability
                </label>
                <input
                  type="text"
                  id="officeHours"
                  name="officeHours"
                  value={formData.officeHours}
                  onChange={handleInputChange}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>
              <div className="form-group">
                <label htmlFor="supervisionExperience">
                  <FaChartLine className="field-icon" />
                  Supervision Experience (years)
                </label>
                <input
                  type="number"
                  id="supervisionExperience"
                  name="supervisionExperience"
                  value={formData.supervisionExperience}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="previousInterns">
                  <FaUsers className="field-icon" />
                  Number of Previous Interns Supervised
                </label>
                <input
                  type="number"
                  id="previousInterns"
                  name="previousInterns"
                  value={formData.previousInterns}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Communication Preferences Section */}
        {activeSection === "communication" && (
          <div className="form-section">
            <h2>
              <FaEnvelope /> Communication Preferences
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredCommunication">
                  <FaEnvelope className="field-icon" />
                  Preferred Communication Method
                </label>
                <select
                  id="preferredCommunication"
                  name="preferredCommunication"
                  value={formData.preferredCommunication}
                  onChange={handleInputChange}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="teams">Microsoft Teams</option>
                  <option value="zoom">Zoom</option>
                  <option value="in-person">In-Person</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="responseTime">
                  <FaClock className="field-icon" />
                  Response Time Commitment (hours)
                </label>
                <select
                  id="responseTime"
                  name="responseTime"
                  value={formData.responseTime}
                  onChange={handleInputChange}
                >
                  <option value="12">Within 12 hours</option>
                  <option value="24">Within 24 hours</option>
                  <option value="48">Within 48 hours</option>
                  <option value="72">Within 72 hours</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="meetingFrequency">
                  <FaCalendarAlt className="field-icon" />
                  Meeting Frequency Preference
                </label>
                <select
                  id="meetingFrequency"
                  name="meetingFrequency"
                  value={formData.meetingFrequency}
                  onChange={handleInputChange}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="as-needed">As Needed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="supervisionMode">
                  <FaUsers className="field-icon" />
                  Supervision Mode Preference
                </label>
                <select
                  id="supervisionMode"
                  name="supervisionMode"
                  value={formData.supervisionMode}
                  onChange={handleInputChange}
                >
                  <option value="in-person">In-Person Only</option>
                  <option value="remote">Remote Only</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information Section */}
        {activeSection === "additional" && (
          <div className="form-section">
            <h2>
              <FaInfoCircle /> Additional Information
            </h2>

            <div className="form-group">
              <label htmlFor="bio">
                <FaUser className="field-icon" />
                Professional Summary/Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={5}
                placeholder="Tell interns about your experience, mentoring style, and what you can offer..."
              />
            </div>

            {/* Languages */}
            <div className="languages-section">
              <h3>
                <FaLanguage /> Languages Spoken
              </h3>
              {languages.map((lang, index) => (
                <div key={index} className="language-item">
                  <input
                    type="text"
                    placeholder="Language"
                    value={lang.language}
                    onChange={(e) =>
                      updateLanguage(index, "language", e.target.value)
                    }
                  />
                  <select
                    value={lang.proficiency}
                    onChange={(e) =>
                      updateLanguage(index, "proficiency", e.target.value)
                    }
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                  {languages.length > 1 && (
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeLanguage(index)}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addLanguage}>
                <FaPlus /> Add Language
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="specialSkills">
                <FaBriefcase className="field-icon" />
                Special Skills/Technologies
              </label>
              <textarea
                id="specialSkills"
                name="specialSkills"
                value={formData.specialSkills}
                onChange={handleInputChange}
                rows={3}
                placeholder="List your technical skills, tools, and technologies..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="awards">
                <FaAward className="field-icon" />
                Awards & Achievements
              </label>
              <textarea
                id="awards"
                name="awards"
                value={formData.awards}
                onChange={handleInputChange}
                rows={3}
                placeholder="List your professional awards and achievements..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emergencyContact">
                  <FaUser className="field-icon" />
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emergencyPhone">
                  <FaPhone className="field-icon" />
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-save">
            <FaSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupervisorUpdateProfile;
