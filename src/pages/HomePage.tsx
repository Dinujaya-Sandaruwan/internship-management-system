import React, { useState } from "react";
// import './HomePage.scss';
// import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaLock,
  FaUserGraduate,
  FaUserTie,
  FaClipboardCheck,
  FaChartLine,
  FaExchangeAlt,
  FaSignInAlt,
  FaUserPlus,
  FaGoogle,
  FaIdCard,
  FaArrowLeft,
} from "react-icons/fa";

const HomePage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "role-select">(
    "signin"
  );
  const [userType, setUserType] = useState<"student" | "supervisor">("student");

  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "signin") {
      // Handle login logic here
      console.log("Login attempted with:", email, password);
      // navigate('/dashboard');
    } else {
      // Handle signup logic here
      console.log(
        "Signup attempted with:",
        email,
        username,
        password,
        "as",
        userType
      );
      // navigate('/verify-email');
    }
  };

  const handleRoleSelect = (role: "student" | "supervisor") => {
    setUserType(role);
    setAuthMode("signup");
  };

  const handleGoogleAuth = () => {
    if (authMode === "signin") {
      // Handle Google sign in
      console.log("Google sign in attempted");
      // Implement Google OAuth flow
    } else if (authMode === "signup") {
      // For signup with Google using the selected role
      console.log("Google signup attempted as", userType);
      // Implement Google OAuth signup flow with selected role
    }
  };

  const goBack = () => {
    if (authMode === "signup") {
      setAuthMode("role-select");
    } else if (authMode === "role-select") {
      setAuthMode("signin");
    }
  };

  return (
    <div className="homepage">
      <div className="homepage__left">
        <div className="homepage__content">
          <div className="homepage__text">
            <h1 className="homepage__title">Internship Management System</h1>
            <h2 className="homepage__subtitle">University of Colombo</h2>
          </div>

          <div className="auth-container">
            <div className="auth-selector">
              <button
                className={`auth-selector__btn ${
                  authMode === "signin" ? "active" : ""
                }`}
                onClick={() => {
                  setAuthMode("signin");
                }}
              >
                <FaSignInAlt className="auth-selector__icon" />
                <span>Sign In</span>
              </button>
              <button
                className={`auth-selector__btn ${
                  authMode === "role-select" || authMode === "signup"
                    ? "active"
                    : ""
                }`}
                onClick={() => setAuthMode("role-select")}
              >
                <FaUserPlus className="auth-selector__icon" />
                <span>Sign Up</span>
              </button>
            </div>

            {authMode === "role-select" && (
              <div className="auth-card">
                <div className="card-header">
                  <h3>
                    <FaUserPlus className="header-icon" />
                    Choose Account Type
                  </h3>
                </div>

                <div className="role-options-container">
                  <div className="role-options">
                    <div
                      className="role-option"
                      onClick={() => handleRoleSelect("student")}
                    >
                      <div className="role-icon">
                        <FaUserGraduate />
                      </div>
                      <div className="role-content">
                        <h4>Student</h4>
                        <p>
                          Join as an intern student to manage your internship
                          records
                        </p>
                      </div>
                    </div>

                    <div
                      className="role-option"
                      onClick={() => handleRoleSelect("supervisor")}
                    >
                      <div className="role-icon">
                        <FaUserTie />
                      </div>
                      <div className="role-content">
                        <h4>Supervisor</h4>
                        <p>
                          Join as an academic or industry supervisor to mentor
                          students
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {authMode === "signin" && (
              <div className="auth-card">
                <div className="card-header">
                  <h3>
                    <FaSignInAlt className="header-icon" />
                    Sign In
                  </h3>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="input-icon-wrapper">
                      <FaUser className="input-icon" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-icon-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-btn">
                    Sign In
                  </button>

                  <div className="social-auth-divider">
                    <span>OR</span>
                  </div>

                  <button
                    type="button"
                    className="google-auth-btn"
                    onClick={handleGoogleAuth}
                  >
                    <FaGoogle className="google-icon" />
                    <span>Sign in with Google</span>
                  </button>
                </form>
              </div>
            )}

            {authMode === "signup" && (
              <div className="auth-card">
                <div className="card-header">
                  <button className="back-btn" onClick={goBack}>
                    <FaArrowLeft /> Back
                  </button>
                  <h3>
                    <FaUserPlus className="header-icon" />
                    Sign Up as{" "}
                    {userType === "student" ? "Student" : "Supervisor"}
                  </h3>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="input-icon-wrapper">
                      <FaUser className="input-icon" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-icon-wrapper">
                      <FaIdCard className="input-icon" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-icon-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-btn">
                    Create Account
                  </button>

                  <div className="social-auth-divider">
                    <span>OR</span>
                  </div>

                  <button
                    type="button"
                    className="google-auth-btn"
                    onClick={handleGoogleAuth}
                  >
                    <FaGoogle className="google-icon" />
                    <span>Sign up with Google</span>
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="homepage__footer">
            <p>
              © {new Date().getFullYear()} University of Colombo. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="homepage__right">
        <div className="features-container">
          <h3 className="features-title">System Features</h3>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <FaClipboardCheck />
              </div>
              <div className="feature-content">
                <h4>Progress Tracking</h4>
                <p>
                  Monitor internship milestones and achievements throughout the
                  program duration.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <div className="feature-content">
                <h4>Performance Evaluation</h4>
                <p>
                  Structured assessment of student professional development with
                  comprehensive metrics.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <FaExchangeAlt />
              </div>
              <div className="feature-content">
                <h4>Report Management</h4>
                <p>
                  Submit and review internship reports and evaluations with
                  structured feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
