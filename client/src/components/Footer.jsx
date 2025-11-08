import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Footer.css'; // Assuming you have a CSS file for styling

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="copyright">© 2025 Chaitanya_M. All Rights Reserved.</p>
                <div className="footer-links">
                    {/* Using NavLink for client-side routing */}
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => isActive ? 'footer-link active-link' : 'footer-link'}
                    >
                        Contact
                    </NavLink>
                    <NavLink
                        to="/privacy-policy"
                        className={({ isActive }) => isActive ? 'footer-link active-link' : 'footer-link'}
                    >
                        Privacy Policy
                    </NavLink>
                </div>
            </div>
        </footer>
    );
}

export default Footer;