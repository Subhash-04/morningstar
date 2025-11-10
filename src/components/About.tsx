import React, { useEffect, useRef, useState } from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" ref={sectionRef} id="about">
      <div className="about-container">
        <div className={`about-content ${isVisible ? 'visible' : ''}`}>
          <div className="about-text">
            <span className="about-badge">About Us</span>
            <h2 className="about-title">
              Building Tomorrow's Leaders Today
            </h2>
            <p className="about-description">
              Morning Star Junior Inter and Degree College has been a beacon of educational excellence 
              for over 25 years. We are committed to providing quality education that shapes young minds 
              and prepares them for a successful future.
            </p>
            <p className="about-description">
              Our institution combines traditional values with modern teaching methodologies, ensuring 
              that students receive a well-rounded education. With state-of-the-art facilities, 
              experienced faculty, and a nurturing environment, we empower students to achieve their dreams.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">✓</div>
                <div>
                  <h4>NAAC Accredited</h4>
                  <p>Recognized for quality education</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">✓</div>
                <div>
                  <h4>Modern Infrastructure</h4>
                  <p>World-class facilities and labs</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">✓</div>
                <div>
                  <h4>Industry Partnerships</h4>
                  <p>Strong corporate connections</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <div className="image-decoration decoration-1"></div>
              <div className="image-decoration decoration-2"></div>
              <div className="placeholder-content">
                <span className="placeholder-icon">🎓</span>
                <p>Campus Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
