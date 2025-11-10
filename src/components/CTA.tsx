import React, { useEffect, useRef, useState } from 'react';
import '../styles/CTA.css';

const CTA: React.FC = () => {
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
    <section className="cta" ref={sectionRef}>
      <div className="cta-background">
        <div className="cta-shape cta-shape-1"></div>
        <div className="cta-shape cta-shape-2"></div>
        <div className="cta-shape cta-shape-3"></div>
      </div>
      <div className={`cta-content ${isVisible ? 'visible' : ''}`}>
        <h2 className="cta-title">Ready to Start Your Journey?</h2>
        <p className="cta-subtitle">
          Join thousands of successful students who chose Morning Star for their education
        </p>
        <div className="cta-buttons">
          <button className="cta-btn cta-btn-primary">
            Apply for Admission
            <span className="btn-icon">→</span>
          </button>
          <button className="cta-btn cta-btn-secondary">
            Download Brochure
            <span className="btn-icon">📄</span>
          </button>
        </div>
        <div className="cta-info">
          <div className="info-item">
            <span className="info-icon">📞</span>
            <span className="info-text">+91 7013555938</span>
          </div>
          <div className="info-item">
            <span className="info-icon">✉️</span>
            <span className="info-text">info@morningstar.edu</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
