import React, { useEffect, useState } from 'react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-title">
          <span className="title-line">Empowering</span>
          <span className="title-line title-highlight">Future Leaders</span>
        </h1>
        <p className="hero-subtitle">
          Excellence in Education, Innovation in Learning
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary">
            Apply Now
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn btn-secondary">
            Explore Programs
          </button>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;
