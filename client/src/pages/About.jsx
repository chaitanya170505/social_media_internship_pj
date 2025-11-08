// About.js
import React from "react";
import "../styles/About.css";
import profilePic from "../assets/dp.png"; // Replace with your photo path

const About = () => {
  return (
    <div className="about-container">
      <div className="profile-section">
        <img src={profilePic} alt="Chaitanya_M" className="profile-pic" />
        <h2>Chaitanya Mogalla</h2>
        <p className="role">Full-Stack Developer & Creator of Alertify</p>
        <p className="bio">
          I’m a passionate full-stack developer focused on building platforms
          that make real-world impact. Alertify allows users to post urgent
          information and stay informed about critical events in their
          surroundings.
        </p>
      </div>

      <div className="about-content">
        <h1>About Alertify</h1>
        <p>
          <strong>Alertify</strong> is a platform designed to empower users to
          share urgent and important information nearby. Users can post alerts,
          view notifications from the community, and stay informed about events
          that matter.
        </p>
        <p>
          Built with <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express</strong>, and <strong>PostgreSQL</strong>,
          Alertify is fast, secure, and scalable. It features user
          authentication, real-time updates, and a responsive interface for
          web and mobile.
        </p>
        <p>
          Our mission is to help communities stay connected, safe, and informed
          by making sure critical information reaches the right people at the
          right time.
        </p>
      </div>
    </div>
  );
};

export default About;
