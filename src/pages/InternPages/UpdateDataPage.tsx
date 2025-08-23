import React, { useState, useRef } from "react";
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
  FaUser,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaGraduationCap,
  FaLanguage,
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
  FaUpload,
  FaLinkedin,
  FaGlobe,
  FaBookmark,
  FaHistory,
  FaSave,
  FaCamera,
  FaInfoCircle,
  FaBirthdayCake,
  FaUniversity,
  FaLaptopCode,
  FaUsers,
  FaCalendarDay,
  FaHourglassHalf,
  FaLaptopHouse,
  FaHandshake,
  FaLink,
  FaBullseye,
  FaIndustry,
  FaMapMarked,
  FaExclamationCircle,
  FaCheck,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import SideMenu from "../../components/InternSideMenu";

const UpdateDataPage: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("updateData");

  // Sample user data
  const [currentUser] = useState({
    name: "Erandi Katugampala",
    avatar: "E",
    position: "Software Engineering Intern",
    company: "Tech Solutions Ltd.",
  });

  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "Erandi",
    lastName: "Katugampala",
    username: "erandi_k",
    studentId: "TP/2020/123",
    universityEmail: "2023t01849@cmb.ac.lk",
    phoneNumber: "+94 71 234 5678",
    currentAddress: "123 Campus Road, Colombo 03",
    permanentAddress: "",
    dateOfBirth: "1998-05-15",
    profilePhoto: null,

    // Emergency Contact
    emergencyContactName: "Saman Katugampala",
    emergencyContactRelationship: "Father",
    emergencyContactPhone: "+94 71 987 6543",
    emergencyContactEmail: "saman@example.com",

    // Academic Information
    expectedGraduationDate: "2024-12-15",
    currentGPA: "3.7",
    foreignLanguages: [{ language: "English", proficiency: "Fluent" }],

    // Internship Information
    companyName: "Tech Solutions Ltd.",
    industrySector: "Information Technology",
    companyAddress: "456 Innovation Drive, Colombo 07",
    internshipTitle: "Software Engineering Intern",
    department: "ICT",
    startDate: "2025-01-15",
    endDate: "2025-07-15",
    hoursPerWeek: "40",
    workMode: "Hybrid",
    paidStatus: "Paid",
    compensationDetails: "Rs. 50,000 per month",

    // Supervisor Information
    supervisorName: "Dr. Kumara Jayasuriya",
    supervisorEmail: "kumara@techsolutions.lk",
    supervisorPhone: "+94 71 111 2222",
    secondaryContactName: "Ms. Thilini Peiris",
    secondaryContactEmail: "thilini@techsolutions.lk",

    // Additional Information
    howSecured: "University Career Fair",
    resume: null,
    linkedinUrl: "https://linkedin.com/in/erandi-k",
    portfolioUrl: "https://erandi-k.github.io",

    // Career Information
    shortTermGoals:
      "Gain practical experience in software development and improve problem-solving skills.",
    longTermGoals:
      "Become a technical lead in a product-based company and contribute to innovative projects.",
    previousWorkExperience:
      "Part-time web developer at Campus IT Department (2023-2024)",
    previousInternships: "Summer intern at Local Tech Startup (3 months, 2023)",
    targetIndustries: "Software Development, Data Science, AI/ML",
    geographicalPreferences: "Colombo, Singapore, Remote",
  });

  // Add/remove language fields
  const [languages, setLanguages] = useState([
    { language: "English", proficiency: "Fluent" },
  ]);

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

  // Profile photo upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePhoto: file });
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Resume upload
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<string | null>(null);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, resume: file });
      setResumeFile(file.name);
    }
  };

  const triggerResumeInput = () => {
    resumeInputRef.current?.click();
  };

  // Form submission
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

  return (
    <div className="dashboard">
      {/* Sidebar */}
      {/* <SideMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      /> */}

      {/* Main Content */}
      <div className="dashboard__main update-data-page">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1 className="update-data-title">Update Profile Information</h1>
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

        {/* Page content */}
        <div className="update-data-container">
          {/* Success message */}
          {saveSuccess && (
            <div className="save-success-message">
              <FaCheck className="success-icon" />
              <span>
                Your profile information has been updated successfully!
              </span>
            </div>
          )}

          {/* Form */}
          <form className="update-data-form" onSubmit={handleSubmit}>
            {/* Form sections */}
            <div className="form-sections">
              {/* Left column */}
              <div className="form-column">
                {/* Personal Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <h2>
                      <FaUser className="section-icon" />
                      Personal Information
                    </h2>
                  </div>

                  <div className="profile-photo-container">
                    <div className="profile-photo">
                      {previewPhoto ? (
                        <img src={previewPhoto} alt="Profile preview" />
                      ) : (
                        <div className="photo-placeholder">
                          <span>
                            {formData.firstName.charAt(0)}
                            {formData.lastName.charAt(0)}
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
                      Please upload a professional photo (max 5MB)
                    </p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        <FaUser className="field-icon" />
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        <FaUser className="field-icon" />
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="username">
                        <FaIdCard className="field-icon" />
                        Username*
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="studentId">
                        <FaIdCard className="field-icon" />
                        Student ID Number*
                      </label>
                      <input
                        type="text"
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">
                        <FaPhone className="field-icon" />
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="currentAddress">
                      <FaMapMarkerAlt className="field-icon" />
                      Current Address*
                    </label>
                    <textarea
                      id="currentAddress"
                      name="currentAddress"
                      value={formData.currentAddress}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="permanentAddress">
                      <FaMapMarkerAlt className="field-icon" />
                      Permanent Address (if different)
                    </label>
                    <textarea
                      id="permanentAddress"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth">
                      <FaBirthdayCake className="field-icon" />
                      Date of Birth*
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Emergency Contact Section */}
                <div className="form-section">
                  <div className="section-header">
                    <h2>
                      <FaExclamationCircle className="section-icon" />
                      Emergency Contact
                    </h2>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="emergencyContactName">
                        <FaUser className="field-icon" />
                        Contact Name*
                      </label>
                      <input
                        type="text"
                        id="emergencyContactName"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emergencyContactRelationship">
                        <FaUsers className="field-icon" />
                        Relationship*
                      </label>
                      <input
                        type="text"
                        id="emergencyContactRelationship"
                        name="emergencyContactRelationship"
                        value={formData.emergencyContactRelationship}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="emergencyContactPhone">
                        <FaPhone className="field-icon" />
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emergencyContactEmail">
                        <FaEnvelope className="field-icon" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="emergencyContactEmail"
                        name="emergencyContactEmail"
                        value={formData.emergencyContactEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <h2>
                      <FaGraduationCap className="section-icon" />
                      Academic Information
                    </h2>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expectedGraduationDate">
                        <FaCalendarDay className="field-icon" />
                        Expected Graduation Date*
                      </label>
                      <input
                        type="date"
                        id="expectedGraduationDate"
                        name="expectedGraduationDate"
                        value={formData.expectedGraduationDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="currentGPA">
                        <FaGraduationCap className="field-icon" />
                        Current GPA*
                      </label>
                      <input
                        type="text"
                        id="currentGPA"
                        name="currentGPA"
                        value={formData.currentGPA}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Foreign Language Proficiency */}
                  <div className="language-section">
                    <label>
                      <FaLanguage className="field-icon" />
                      Foreign Language Proficiency
                    </label>

                    {languages.map((lang, index) => (
                      <div className="language-row" key={index}>
                        <div className="language-inputs">
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
                              updateLanguage(
                                index,
                                "proficiency",
                                e.target.value
                              )
                            }
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
                            className="remove-language-btn"
                            onClick={() => removeLanguage(index)}
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-language-btn"
                      onClick={addLanguage}
                    >
                      <FaPlus /> Add Language
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="form-column">
                {/* Internship Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <h2>
                      <FaBriefcase className="section-icon" />
                      Internship Information
                    </h2>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="companyName">
                        <FaBuilding className="field-icon" />
                        Company/Organization Name*
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="industrySector">
                        <FaIndustry className="field-icon" />
                        Industry Sector*
                      </label>
                      <input
                        type="text"
                        id="industrySector"
                        name="industrySector"
                        value={formData.industrySector}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="companyAddress">
                      <FaMapMarkerAlt className="field-icon" />
                      Company Address*
                    </label>
                    <textarea
                      id="companyAddress"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="internshipTitle">
                        <FaIdCard className="field-icon" />
                        Internship Title/Role*
                      </label>
                      <input
                        type="text"
                        id="internshipTitle"
                        name="internshipTitle"
                        value={formData.internshipTitle}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="department">
                        <FaUsers className="field-icon" />
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        disabled
                      >
                        <option value="ICT">ICT</option>
                      </select>
                      <div className="field-note">
                        Automatically selected based on your program
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="startDate">
                        <FaCalendarDay className="field-icon" />
                        Start Date*
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="endDate">
                        <FaCalendarDay className="field-icon" />
                        End Date*
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="hoursPerWeek">
                        <FaHourglassHalf className="field-icon" />
                        Hours Per Week*
                      </label>
                      <input
                        type="number"
                        id="hoursPerWeek"
                        name="hoursPerWeek"
                        value={formData.hoursPerWeek}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="workMode">
                        <FaLaptopHouse className="field-icon" />
                        Work Mode*
                      </label>
                      <select
                        id="workMode"
                        name="workMode"
                        value={formData.workMode}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select --</option>
                        <option value="Remote">Remote</option>
                        <option value="In-person">In-person</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="paidStatus">
                        <FaMoneyBillWave className="field-icon" />
                        Paid Status*
                      </label>
                      <select
                        id="paidStatus"
                        name="paidStatus"
                        value={formData.paidStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select --</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="compensationDetails">
                        <FaMoneyBillWave className="field-icon" />
                        Compensation Details
                      </label>
                      <input
                        type="text"
                        id="compensationDetails"
                        name="compensationDetails"
                        value={formData.compensationDetails}
                        onChange={handleChange}
                        disabled={formData.paidStatus !== "Paid"}
                      />
                    </div>
                  </div>
                </div>

                {/* Supervisor Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <h2>
                      <FaUserTie className="section-icon" />
                      Supervisor Information
                    </h2>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="supervisorName">
                        <FaUser className="field-icon" />
                        Supervisor Name*
                      </label>
                      <input
                        type="text"
                        id="supervisorName"
                        name="supervisorName"
                        value={formData.supervisorName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="supervisorEmail">
                        <FaEnvelope className="field-icon" />
                        Supervisor Email*
                      </label>
                      <input
                        type="email"
                        id="supervisorEmail"
                        name="supervisorEmail"
                        value={formData.supervisorEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="supervisorPhone">
                        <FaPhone className="field-icon" />
                        Supervisor Phone
                      </label>
                      <input
                        type="tel"
                        id="supervisorPhone"
                        name="supervisorPhone"
                        value={formData.supervisorPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="secondaryContactName">
                        <FaUser className="field-icon" />
                        Secondary Contact Name
                      </label>
                      <input
                        type="text"
                        id="secondaryContactName"
                        name="secondaryContactName"
                        value={formData.secondaryContactName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="secondaryContactEmail">
                        <FaEnvelope className="field-icon" />
                        Secondary Contact Email
                      </label>
                      <input
                        type="email"
                        id="secondaryContactEmail"
                        name="secondaryContactEmail"
                        value={formData.secondaryContactEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="howSecured">
                      <FaHandshake className="field-icon" />
                      How was this internship secured?*
                    </label>
                    <select
                      id="howSecured"
                      name="howSecured"
                      value={formData.howSecured}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select --</option>
                      <option value="University Career Fair">
                        University Career Fair
                      </option>
                      <option value="Online Job Board">Online Job Board</option>
                      <option value="Company Website">Company Website</option>
                      <option value="Personal Connection">
                        Personal Connection
                      </option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Faculty Referral">Faculty Referral</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <h2>
                      <FaLink className="section-icon" />
                      Additional Information
                    </h2>
                  </div>

                  <div className="form-group upload-group">
                    <label>
                      <FaUpload className="field-icon" />
                      Resume/CV (PDF, DOC, DOCX)
                    </label>
                    <div className="file-upload-container">
                      <button
                        type="button"
                        className="file-upload-btn"
                        onClick={triggerResumeInput}
                      >
                        <FaUpload /> Upload Resume/CV
                      </button>
                      <input
                        type="file"
                        ref={resumeInputRef}
                        onChange={handleResumeChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden-input"
                      />
                      {resumeFile && (
                        <div className="file-name">{resumeFile}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="linkedinUrl">
                        <FaLinkedin className="field-icon" />
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        id="linkedinUrl"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="portfolioUrl">
                        <FaGlobe className="field-icon" />
                        Portfolio/Website URL
                      </label>
                      <input
                        type="url"
                        id="portfolioUrl"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Career Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <h2>
                      <FaBullseye className="section-icon" />
                      Career Information
                    </h2>
                  </div>

                  <div className="form-group">
                    <label htmlFor="shortTermGoals">
                      <FaBookmark className="field-icon" />
                      Short-term Career Goals
                    </label>
                    <textarea
                      id="shortTermGoals"
                      name="shortTermGoals"
                      value={formData.shortTermGoals}
                      onChange={handleChange}
                      placeholder="Your career goals for the next 1-2 years"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="longTermGoals">
                      <FaBookmark className="field-icon" />
                      Long-term Career Goals
                    </label>
                    <textarea
                      id="longTermGoals"
                      name="longTermGoals"
                      value={formData.longTermGoals}
                      onChange={handleChange}
                      placeholder="Your career goals for the next 5+ years"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="previousWorkExperience">
                      <FaHistory className="field-icon" />
                      Previous Work Experience
                    </label>
                    <textarea
                      id="previousWorkExperience"
                      name="previousWorkExperience"
                      value={formData.previousWorkExperience}
                      onChange={handleChange}
                      placeholder="Brief description of previous work experience"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="previousInternships">
                      <FaHistory className="field-icon" />
                      Previous Internship Experience
                    </label>
                    <textarea
                      id="previousInternships"
                      name="previousInternships"
                      value={formData.previousInternships}
                      onChange={handleChange}
                      placeholder="Brief description of previous internships"
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="targetIndustries">
                        <FaIndustry className="field-icon" />
                        Target Industries
                      </label>
                      <input
                        type="text"
                        id="targetIndustries"
                        name="targetIndustries"
                        value={formData.targetIndustries}
                        onChange={handleChange}
                        placeholder="e.g., Software Development, Data Science"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="geographicalPreferences">
                        <FaMapMarked className="field-icon" />
                        Geographical Preferences
                      </label>
                      <input
                        type="text"
                        id="geographicalPreferences"
                        name="geographicalPreferences"
                        value={formData.geographicalPreferences}
                        onChange={handleChange}
                        placeholder="e.g., Colombo, Singapore, Remote"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form actions */}
            <div className="form-actions">
              <div className="form-note">
                <FaInfoCircle className="note-icon" />
                <span>Fields marked with * are required</span>
              </div>
              <button type="submit" className="save-btn" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="btn-spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Information
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDataPage;
