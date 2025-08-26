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
  FaUniversity,
  FaBookOpen,


  FaLaptopCode,
} from "react-icons/fa";

// Interface for coordinator form data
interface CoordinatorFormData {
  // Personal Information
  fullName: string;
  profilePhoto: File | null;
  employeeId: string;
  universityEmail: string;
  personalEmail: string;
  workPhone: string;
  personalPhone: string;
  dateOfBirth: string;
  gender: string;
  nationalId: string;
  officeLocation: string;

  // Professional Information
  jobTitle: string;
  department: string;
  faculty: string;
  yearsAtUniversity: string;
  employmentType: string;
  linkedinUrl: string;
  professionalWebsite: string;
  orcidId: string;

  // Academic Background
  highestQualification: string;
  fieldOfStudy: string;
  university: string;
  graduationYear: string;

  // Coordination Details
  coordinationExperience: string;
  maxInternsSupervised: string;
  preferredInternshipDuration: string;
  availableDays: string[];
  officeHours: string;

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
  professionalMemberships: string;
}

const CoordinatorUpdateProfile: React.FC = () => {
  const [activeSection, setActiveSection] = useState("personal");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Languages state
  const [languages, setLanguages] = useState([
    { language: "English", proficiency: "Fluent" },
    { language: "Sinhala", proficiency: "Native" },
  ]);

  // Certifications state
  const [certifications, setCertifications] = useState([
    { name: "Project Management Professional (PMP)", issuer: "PMI", year: "2022" },
  ]);

  // Form data state with sample coordinator data
  const [formData, setFormData] = useState<CoordinatorFormData>({
    // Personal Information
    fullName: "Dr. Priyanka Wijesinghe",
    profilePhoto: null,
    employeeId: "UOC/UCSC/2018/001",
    universityEmail: "priyanka.w@ucsc.cmb.ac.lk",
    personalEmail: "priyanka.wijesinghe@gmail.com",
    workPhone: "+94 11 250 3345",
    personalPhone: "+94 77 123 4567",
    dateOfBirth: "1985-03-20",
    gender: "female",
    nationalId: "858123456V",
    officeLocation: "Room 301, UCSC Building",

    // Professional Information
    jobTitle: "Senior Lecturer & Internship Coordinator",
    department: "Computer Science",
    faculty: "Faculty of Science",
    yearsAtUniversity: "6",
    employmentType: "permanent",
    linkedinUrl: "https://linkedin.com/in/priyanka-wijesinghe",
    professionalWebsite: "https://priyanka-research.ucsc.lk",
    orcidId: "0000-0002-1234-5678",

    // Academic Background
    highestQualification: "PhD",
    fieldOfStudy: "Computer Science & Engineering",
    university: "University of Moratuwa",
    graduationYear: "2017",

    // Coordination Details
    coordinationExperience: "4",
    maxInternsSupervised: "15",
    preferredInternshipDuration: "6",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    officeHours: "9:00 AM - 4:00 PM",

    // Communication Preferences
    preferredCommunication: "email",
    responseTime: "24",
    meetingFrequency: "weekly",
    supervisionMode: "hybrid",

    // Additional Information
    bio: "Experienced academic and internship coordinator with a passion for bridging the gap between academia and industry. Dedicated to helping students gain valuable real-world experience through quality internship programs.",
    specialSkills: "Project Management, Curriculum Development, Industry Relations, Student Mentoring",
    awards: "Excellence in Teaching Award 2023, Best Coordinator Award 2022",
    emergencyContact: "Rohan Wijesinghe",
    emergencyPhone: "+94 77 987 6543",
    professionalMemberships: "IEEE, ACM, Computer Society of Sri Lanka",
  });







  // Days of the week
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (field: keyof CoordinatorFormData, value: string) => {
    const currentValues = formData[field] as string[];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    setFormData(prev => ({ ...prev, [field]: updatedValues }));
  };

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle language management
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

  // Handle certification management
  const addCertification = () => {
    setCertifications([...certifications, { name: "", issuer: "", year: "" }]);
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
    setCertifications(updatedCertifications);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Get today's date
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

  // Navigation sections
  const sections = [
    { id: "personal", label: "Personal Info", icon: FaUser },
    { id: "professional", label: "Professional Info", icon: FaBriefcase },
    { id: "academic", label: "Academic Background", icon: FaGraduationCap },
    { id: "coordination", label: "Coordination Details", icon: FaUsers },
    { id: "additional", label: "Additional Info", icon: FaInfoCircle },
  ];

  return (
    <div className="coordinator-update-profile">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__greeting">
          <h1>Update Profile</h1>
          <p>Keep your coordinator profile up to date for better coordination</p>
        </div>
        <div className="dashboard__date">
          <FaCalendarAlt className="date-icon" />
          <span>{getTodayDate()}</span>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          <FaCheckCircle className="success-icon" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Main Content */}
      <div className="profile-content">
        {/* Navigation Sidebar */}
        <div className="profile-navigation">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <IconComponent className="nav-icon" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="profile-form-container">
          <form onSubmit={handleSubmit} className="profile-form">
            {/* Personal Information Section */}
            {activeSection === "personal" && (
              <div className="form-section">
                <div className="section-header">
                  <h2>
                    <FaUser className="section-icon" />
                    Personal Information
                  </h2>
                  <p>Basic personal details and contact information</p>
                </div>

                {/* Profile Photo */}
                <div className="profile-photo-container">
                  <div className="profile-photo">
                    {previewPhoto ? (
                      <img src={previewPhoto} alt="Profile preview" />
                    ) : (
                      <div className="photo-placeholder">
                        <span>
                          {formData.fullName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="photo-upload-btn"
                    onClick={triggerFileInput}
                  >
                    <FaCamera />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden-input"
                  />
                  <p className="photo-helper-text">
                    Upload a professional photo (max 5MB)
                  </p>
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
                      required
                    />
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
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="universityEmail">
                      <FaEnvelope className="field-icon" />
                      University Email*
                    </label>
                    <input
                      type="email"
                      id="universityEmail"
                      name="universityEmail"
                      value={formData.universityEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="personalEmail">
                      <FaEnvelope className="field-icon" />
                      Personal Email
                    </label>
                    <input
                      type="email"
                      id="personalEmail"
                      name="personalEmail"
                      value={formData.personalEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
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
                      required
                    />
                  </div>
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
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">
                      <FaCalendarAlt className="field-icon" />
                      Date of Birth*
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">
                      <FaUser className="field-icon" />
                      Gender*
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nationalId">
                      <FaIdCard className="field-icon" />
                      National ID*
                    </label>
                    <input
                      type="text"
                      id="nationalId"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="officeLocation">
                      <FaMapMarkerAlt className="field-icon" />
                      Office Location*
                    </label>
                    <input
                      type="text"
                      id="officeLocation"
                      name="officeLocation"
                      value={formData.officeLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Professional Information Section */}
            {activeSection === "professional" && (
              <div className="form-section">
                <div className="section-header">
                  <h2>
                    <FaBriefcase className="section-icon" />
                    Professional Information
                  </h2>
                  <p>Your role and professional details at the university</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="jobTitle">
                      <FaUserTie className="field-icon" />
                      Job Title*
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="department">
                      <FaBuilding className="field-icon" />
                      Department*
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="faculty">
                      <FaUniversity className="field-icon" />
                      Faculty*
                    </label>
                    <input
                      type="text"
                      id="faculty"
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="yearsAtUniversity">
                      <FaChartLine className="field-icon" />
                      Years at University*
                    </label>
                    <input
                      type="number"
                      id="yearsAtUniversity"
                      name="yearsAtUniversity"
                      value={formData.yearsAtUniversity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="employmentType">
                      <FaBriefcase className="field-icon" />
                      Employment Type*
                    </label>
                    <select
                      id="employmentType"
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Employment Type</option>
                      <option value="permanent">Permanent</option>
                      <option value="contract">Contract</option>
                      <option value="visiting">Visiting</option>
                      <option value="adjunct">Adjunct</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="orcidId">
                      <FaIdCard className="field-icon" />
                      ORCID ID
                    </label>
                    <input
                      type="text"
                      id="orcidId"
                      name="orcidId"
                      value={formData.orcidId}
                      onChange={handleInputChange}
                      placeholder="0000-0000-0000-0000"
                    />
                  </div>
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
                      placeholder="https://linkedin.com/in/yourprofile"
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
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Academic Background Section */}
            {activeSection === "academic" && (
              <div className="form-section">
                <div className="section-header">
                  <h2>
                    <FaGraduationCap className="section-icon" />
                    Academic Background
                  </h2>
                  <p>Your educational qualifications and research interests</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="highestQualification">
                      <FaGraduationCap className="field-icon" />
                      Highest Qualification*
                    </label>
                    <select
                      id="highestQualification"
                      name="highestQualification"
                      value={formData.highestQualification}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Qualification</option>
                      <option value="Bachelor's">Bachelor's Degree</option>
                      <option value="Master's">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Postdoc">Postdoctoral</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fieldOfStudy">
                      <FaBookOpen className="field-icon" />
                      Field of Study*
                    </label>
                    <input
                      type="text"
                      id="fieldOfStudy"
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="university">
                      <FaUniversity className="field-icon" />
                      University*
                    </label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="graduationYear">
                      <FaCalendarAlt className="field-icon" />
                      Graduation Year*
                    </label>
                    <input
                      type="number"
                      id="graduationYear"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      min="1980"
                      max={new Date().getFullYear()}
                      required
                    />
                  </div>
                </div>





                {/* Languages */}
                <div className="language-section">
                  <label>
                    <FaLanguage className="field-icon" />
                    Language Proficiency
                  </label>
                  {languages.map((lang, index) => (
                    <div className="language-row" key={index}>
                      <div className="language-inputs">
                        <input
                          type="text"
                          placeholder="Language"
                          value={lang.language}
                          onChange={(e) => updateLanguage(index, "language", e.target.value)}
                        />
                        <select
                          value={lang.proficiency}
                          onChange={(e) => updateLanguage(index, "proficiency", e.target.value)}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Native">Native</option>
                        </select>
                      </div>
                      {languages.length > 1 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeLanguage(index)}
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addLanguage}
                  >
                    <FaPlus /> Add Language
                  </button>
                </div>

                {/* Certifications */}
                <div className="certification-section">
                  <label>
                    <FaAward className="field-icon" />
                    Professional Certifications
                  </label>
                  {certifications.map((cert, index) => (
                    <div className="certification-row" key={index}>
                      <div className="certification-inputs">
                        <input
                          type="text"
                          placeholder="Certification Name"
                          value={cert.name}
                          onChange={(e) => updateCertification(index, "name", e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Issuing Organization"
                          value={cert.issuer}
                          onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Year"
                          value={cert.year}
                          onChange={(e) => updateCertification(index, "year", e.target.value)}
                          min="1980"
                          max={new Date().getFullYear()}
                        />
                      </div>
                      {certifications.length > 1 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeCertification(index)}
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addCertification}
                  >
                    <FaPlus /> Add Certification
                  </button>
                </div>
              </div>
            )}

            {/* Coordination Details Section */}
            {activeSection === "coordination" && (
              <div className="form-section">
                <div className="section-header">
                  <h2>
                    <FaUsers className="section-icon" />
                    Coordination Details
                  </h2>
                  <p>Your internship coordination experience and preferences</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="coordinationExperience">
                      <FaChartLine className="field-icon" />
                      Coordination Experience (Years)*
                    </label>
                    <input
                      type="number"
                      id="coordinationExperience"
                      name="coordinationExperience"
                      value={formData.coordinationExperience}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="maxInternsSupervised">
                      <FaUsers className="field-icon" />
                      Max Interns Supervised*
                    </label>
                    <input
                      type="number"
                      id="maxInternsSupervised"
                      name="maxInternsSupervised"
                      value={formData.maxInternsSupervised}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferredInternshipDuration">
                      <FaClock className="field-icon" />
                      Preferred Internship Duration (Months)*
                    </label>
                    <select
                      id="preferredInternshipDuration"
                      name="preferredInternshipDuration"
                      value={formData.preferredInternshipDuration}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Duration</option>
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="officeHours">
                      <FaClock className="field-icon" />
                      Office Hours*
                    </label>
                    <input
                      type="text"
                      id="officeHours"
                      name="officeHours"
                      value={formData.officeHours}
                      onChange={handleInputChange}
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      required
                    />
                  </div>
                </div>

                {/* Available Days */}
                <div className="form-group">
                  <label>
                    <FaCalendarAlt className="field-icon" />
                    Available Days*
                  </label>
                  <div className="multi-select-container">
                    {daysOfWeek.map((day) => (
                      <label key={day} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.availableDays.includes(day)}
                          onChange={() => handleMultiSelectChange('availableDays', day)}
                        />
                        <span className="checkbox-text">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>







                {/* Communication Preferences */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferredCommunication">
                      <FaEnvelope className="field-icon" />
                      Preferred Communication*
                    </label>
                    <select
                      id="preferredCommunication"
                      name="preferredCommunication"
                      value={formData.preferredCommunication}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Method</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="video-call">Video Call</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="responseTime">
                      <FaClock className="field-icon" />
                      Response Time (Hours)*
                    </label>
                    <select
                      id="responseTime"
                      name="responseTime"
                      value={formData.responseTime}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="2">Within 2 hours</option>
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
                      Meeting Frequency*
                    </label>
                    <select
                      id="meetingFrequency"
                      name="meetingFrequency"
                      value={formData.meetingFrequency}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="as-needed">As needed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="supervisionMode">
                      <FaUsers className="field-icon" />
                      Supervision Mode*
                    </label>
                    <select
                      id="supervisionMode"
                      name="supervisionMode"
                      value={formData.supervisionMode}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Mode</option>
                      <option value="in-person">In-Person</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Information Section */}
            {activeSection === "additional" && (
              <div className="form-section">
                <div className="section-header">
                  <h2>
                    <FaInfoCircle className="section-icon" />
                    Additional Information
                  </h2>
                  <p>Additional details and emergency contact information</p>
                </div>

                <div className="form-group">
                  <label htmlFor="bio">
                    <FaUser className="field-icon" />
                    Professional Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Write a brief professional bio highlighting your experience and approach to internship coordination..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialSkills">
                    <FaLaptopCode className="field-icon" />
                    Special Skills & Expertise
                  </label>
                  <textarea
                    id="specialSkills"
                    name="specialSkills"
                    value={formData.specialSkills}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="List your special skills, technical expertise, and areas of specialization..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="awards">
                    <FaAward className="field-icon" />
                    Awards & Recognition
                  </label>
                  <textarea
                    id="awards"
                    name="awards"
                    value={formData.awards}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="List any awards, recognition, or achievements..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="professionalMemberships">
                    <FaUsers className="field-icon" />
                    Professional Memberships
                  </label>
                  <textarea
                    id="professionalMemberships"
                    name="professionalMemberships"
                    value={formData.professionalMemberships}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="List your professional memberships and affiliations..."
                  />
                </div>

                {/* Emergency Contact */}
                <div className="emergency-contact-section">
                  <h3>
                    <FaExclamationTriangle className="section-icon" />
                    Emergency Contact
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="emergencyContact">
                        <FaUser className="field-icon" />
                        Emergency Contact Name*
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emergencyPhone">
                        <FaPhone className="field-icon" />
                        Emergency Contact Phone*
                      </label>
                      <input
                        type="tel"
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                <FaSave className="btn-icon" />
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorUpdateProfile;