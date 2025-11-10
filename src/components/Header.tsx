import React, { useState } from 'react';
import '../styles/Header.css';

interface HeaderProps {
  scrollY: number;
}

const Header: React.FC<HeaderProps> = ({ scrollY }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-placeholder">
            <img src={require('../logo.png')} alt="Morning Star College Logo" className="logo-image" />
          </div>
          <div className="logo-text">
            <h1>Morning Star</h1>
            <p>Junior Inter & Degree College</p>
          </div>
        </div>
        <nav className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#courses" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Courses</a>
          <a href="#gallery" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <button className="nav-cta">Apply Now</button>
        </nav>
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
