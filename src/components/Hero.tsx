import React, { useEffect, useState } from 'react';
import '../styles/Hero.css';
import AnimatedBackground from './AnimatedBackground';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero" id="home">
      <AnimatedBackground />
      
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
    </section>
  );
};

export default Hero;
