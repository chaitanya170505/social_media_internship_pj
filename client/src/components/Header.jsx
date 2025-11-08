import React, { useState, useContext } from "react";
import "../styles/Header.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import phoenixLogo from "../assets/phoenix.png";

function Header({ onAlengeClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile"); // or whatever route your profile uses
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <img 
          src={phoenixLogo}  
          alt="Alertify Logo" 
          className="logo-icon" 
        />
        <span className="logo-text">VigilNet</span>
      </div>

      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/alerts">Alerts</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <button className="align-button" onClick={onAlengeClick}>
          Post
        </button>

        {/* Profile Icon and Dropdown */}
        {user && (
          <div className="profile-container" onClick={toggleDropdown}>
            <div className="profile-icon">{user.username.charAt(0).toUpperCase()}</div>
            {dropdownOpen && (
              <div className="profile-dropdown">
                <button onClick={goToProfile}>Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
