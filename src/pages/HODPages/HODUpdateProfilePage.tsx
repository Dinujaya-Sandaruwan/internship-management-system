import React, { useState, useRef } from "react";
import {
  FiUser,
  FiMail,
  FiBook,
  FiBriefcase,
  FiCamera,
  FiSave,
  FiX,
  FiAlertCircle,
  FiCheckCircle,
  FiSettings,
  FiAlertTriangle,
} from "react-icons/fi";

interface HODProfile {
  // Personal Information
  firstName: string;
  lastName: string;
  title: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  profileImage?: string;
  
  // Contact Information
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  city: string;
  postalCode: string;
  
  // Academic Credentials
  highestQualification: string;
  university: string;
  graduationYear: string;
  specialization: string;
  additionalCertifications: string;
  
  // Administrative Information
  employeeId: string;
  department: string;
  position: string;
  joinDate: string;
  experience: string;
  officeLocation: string;
  
  // Optional Fields
  bio?: string;
  researchInterests?: string;
  publications?: string;
}

const HODUpdateProfilePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<HODProfile>({
    // Personal Information
    firstName: "Dr. Rajesh",
    lastName: "Perera",
    title: "Professor",
    dateOfBirth: "1975-03-15",
    gender: "male",
    nationality: "Sri Lankan",
    
    // Contact Information
    email: "rajesh.perera@university.edu",
    phone: "+94 77 123 4567",
    alternatePhone: "+94 11 234 5678",
    address: "123 University Road, Colombo 03",
    city: "Colombo",
    postalCode: "00300",
    
    // Academic Credentials
    highestQualification: "PhD in Computer Science",
    university: "University of Colombo",
    graduationYear: "2005",
    specialization: "Artificial Intelligence & Machine Learning",
    additionalCertifications: "PMP, AWS Certified Solutions Architect",
    
    // Administrative Information
    employeeId: "EMP001",
    department: "Faculty of Technology",
    position: "Head of Department",
    joinDate: "2010-01-15",
    experience: "15 years",
    officeLocation: "Room 301, Technology Building",
    
    // Optional Fields
    bio: "Experienced academic leader with expertise in computer science and technology management.",
    researchInterests: "Machine Learning, Data Science, Educational Technology",
    publications: "50+ peer-reviewed publications in international journals",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, profileImage: "Image size should be less than 5MB" }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
        setErrors(prev => ({ ...prev, profileImage: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Personal Information validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.nationality.trim()) newErrors.nationality = "Nationality is required";

    // Contact Information validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Invalid phone number format";
    }
    
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    // Academic Credentials validation
    if (!formData.highestQualification.trim()) newErrors.highestQualification = "Highest qualification is required";
    if (!formData.university.trim()) newErrors.university = "University is required";
    if (!formData.graduationYear) newErrors.graduationYear = "Graduation year is required";
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";

    // Administrative Information validation
    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.joinDate) newErrors.joinDate = "Join date is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.officeLocation.trim()) newErrors.officeLocation = "Office location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setShowConfirmModal(true);
  };

  // Confirm and save profile
  const confirmSave = async () => {
    setIsLoading(true);
    setShowConfirmModal(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccessModal(true);
      setIsLoading(false);
    } catch {
        setIsLoading(false);
        setErrors({ general: "Failed to update profile. Please try again." });
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      firstName: "Dr. Rajesh",
      lastName: "Perera",
      title: "Professor",
      dateOfBirth: "1975-03-15",
      gender: "male",
      nationality: "Sri Lankan",
      email: "rajesh.perera@university.edu",
      phone: "+94 77 123 4567",
      alternatePhone: "+94 11 234 5678",
      address: "123 University Road, Colombo 03",
      city: "Colombo",
      postalCode: "00300",
      highestQualification: "PhD in Computer Science",
      university: "University of Colombo",
      graduationYear: "2005",
      specialization: "Artificial Intelligence & Machine Learning",
      additionalCertifications: "PMP, AWS Certified Solutions Architect",
      employeeId: "EMP001",
      department: "Faculty of Technology",
      position: "Head of Department",
      joinDate: "2010-01-15",
      experience: "15 years",
      officeLocation: "Room 301, Technology Building",
      bio: "Experienced academic leader with expertise in computer science and technology management.",
      researchInterests: "Machine Learning, Data Science, Educational Technology",
      publications: "50+ peer-reviewed publications in international journals",
    });
    setProfileImage(null);
    setErrors({});
  };

  return (
    <div className="hod-update-profile">
      <div className="dashboard__main">
        {/* Header */}
        <div className="dashboard__header">
          <div className="dashboard__greeting">
            <h1>Update Profile</h1>
            <p>
              <FiSettings className="info-icon" />
              Manage your personal and professional information
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="profile-form">
          {/* Profile Picture Section */}
          <div className="form-section profile-picture-section">
            <div className="section-header">
              <h2>
                <FiCamera className="section-icon" />
                Profile Picture
              </h2>
            </div>
            
            <div className="profile-picture-container">
              <div className="profile-picture">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <div className="profile-placeholder">
                    <FiUser />
                  </div>
                )}
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiCamera />
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              
              <div className="upload-info">
                <p>Click the camera icon to upload a new profile picture</p>
                <span>Maximum file size: 5MB. Supported formats: JPG, PNG, GIF</span>
              </div>
              
              {errors.profileImage && (
                <div className="error-message">
                  <FiAlertCircle />
                  {errors.profileImage}
                </div>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <div className="section-header">
              <h2>
                <FiUser className="section-icon" />
                Personal Information
              </h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "error" : ""}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <div className="error-message">
                    <FiAlertCircle />
                    {errors.firstName}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "error" : ""}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.lastName}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <select
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? "error" : ""}
                >
                  <option value="">Select title</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
                {errors.title && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.title}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={errors.dateOfBirth ? "error" : ""}
                />
                {errors.dateOfBirth && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.dateOfBirth}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={errors.gender ? "error" : ""}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.gender}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="nationality">Nationality *</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className={errors.nationality ? "error" : ""}
                  placeholder="Enter your nationality"
                />
                {errors.nationality && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.nationality}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <div className="section-header">
              <h2>
                <FiMail className="section-icon" />
                Contact Information
              </h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.email}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "error" : ""}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.phone}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="alternatePhone">Alternate Phone</label>
                <input
                  type="tel"
                  id="alternatePhone"
                  name="alternatePhone"
                  value={formData.alternatePhone || ""}
                  onChange={handleInputChange}
                  placeholder="Enter alternate phone number"
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? "error" : ""}
                  placeholder="Enter your full address"
                />
                {errors.address && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.address}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? "error" : ""}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.city}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code *</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={errors.postalCode ? "error" : ""}
                  placeholder="Enter postal code"
                />
                {errors.postalCode && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.postalCode}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Academic Credentials */}
          <div className="form-section">
            <div className="section-header">
              <h2>
                <FiBook className="section-icon" />
                Academic Credentials
              </h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="highestQualification">Highest Qualification *</label>
                <input
                  type="text"
                  id="highestQualification"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleInputChange}
                  className={errors.highestQualification ? "error" : ""}
                  placeholder="e.g., PhD in Computer Science"
                />
                {errors.highestQualification && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.highestQualification}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="university">University *</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className={errors.university ? "error" : ""}
                  placeholder="Enter university name"
                />
                {errors.university && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.university}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="graduationYear">Graduation Year *</label>
                <input
                  type="number"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className={errors.graduationYear ? "error" : ""}
                  placeholder="e.g., 2005"
                  min="1950"
                  max={new Date().getFullYear()}
                />
                {errors.graduationYear && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.graduationYear}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="specialization">Specialization *</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className={errors.specialization ? "error" : ""}
                  placeholder="Enter your area of specialization"
                />
                {errors.specialization && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.specialization}
                  </div>
                )}
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="additionalCertifications">Additional Certifications</label>
                <textarea
                  id="additionalCertifications"
                  name="additionalCertifications"
                  value={formData.additionalCertifications || ""}
                  onChange={handleInputChange}
                  placeholder="List any additional certifications, courses, or professional qualifications"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Administrative Information */}
          <div className="form-section">
            <div className="section-header">
              <h2>
                <FiBriefcase className="section-icon" />
                Administrative Information
              </h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="employeeId">Employee ID *</label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className={errors.employeeId ? "error" : ""}
                  placeholder="Enter employee ID"
                  readOnly
                />
                {errors.employeeId && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.employeeId}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={errors.department ? "error" : ""}
                  placeholder="Enter department name"
                />
                {errors.department && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.department}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="position">Position *</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={errors.position ? "error" : ""}
                  placeholder="Enter your position"
                />
                {errors.position && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.position}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="joinDate">Join Date *</label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className={errors.joinDate ? "error" : ""}
                />
                {errors.joinDate && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.joinDate}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="experience">Total Experience *</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={errors.experience ? "error" : ""}
                  placeholder="e.g., 15 years"
                />
                {errors.experience && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.experience}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="officeLocation">Office Location *</label>
                <input
                  type="text"
                  id="officeLocation"
                  name="officeLocation"
                  value={formData.officeLocation}
                  onChange={handleInputChange}
                  className={errors.officeLocation ? "error" : ""}
                  placeholder="e.g., Room 301, Technology Building"
                />
                {errors.officeLocation && (
                  <div className="error-message">
                    <FiAlertTriangle />
                    {errors.officeLocation}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <div className="section-header">
              <h2>
                <FiBook className="section-icon" />
                Additional Information
              </h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="bio">Professional Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleInputChange}
                  placeholder="Write a brief professional biography"
                  rows={4}
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="researchInterests">Research Interests</label>
                <textarea
                  id="researchInterests"
                  name="researchInterests"
                  value={formData.researchInterests || ""}
                  onChange={handleInputChange}
                  placeholder="List your research interests and areas of expertise"
                  rows={3}
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="publications">Publications & Achievements</label>
                <textarea
                  id="publications"
                  name="publications"
                  value={formData.publications || ""}
                  onChange={handleInputChange}
                  placeholder="List your notable publications, awards, and achievements"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={isLoading}
            >
              <FiX />
              Reset
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Updating...
                </>
              ) : (
                <>
                  <FiSave />
                  Update Profile
                </>
              )}
            </button>
          </div>
          
          {errors.general && (
            <div className="error-message general-error">
              <FiAlertTriangle />
              {errors.general}
            </div>
          )}
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal confirm-modal">
            <div className="modal-header">
              <h3>Confirm Profile Update</h3>
            </div>
            
            <div className="modal-body">
              <p>Are you sure you want to update your profile with the provided information?</p>
              <p className="warning-text">
                <FiAlertTriangle />
                Please review all information carefully before confirming.
              </p>
            </div>
            
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={confirmSave}
              >
                <FiCheckCircle />
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal success-modal">
            <div className="modal-header">
              <div className="success-icon">
                <FiCheckCircle />
              </div>
              <h3>Profile Updated Successfully!</h3>
            </div>
            
            <div className="modal-body">
              <p>Your profile information has been updated successfully.</p>
            </div>
            
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HODUpdateProfilePage;