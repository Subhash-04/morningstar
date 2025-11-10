import React, { useEffect, useRef, useState } from 'react';
import '../styles/Features.css';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const features: Feature[] = [
    {
      icon: '🎓',
      title: 'Quality Education',
      description: 'Comprehensive curriculum designed to nurture academic excellence and critical thinking'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Faculty',
      description: 'Experienced educators dedicated to student success and personalized learning'
    },
    {
      icon: '🏆',
      title: 'Outstanding Results',
      description: 'Proven track record of academic achievements and university placements'
    },
    {
      icon: '💻',
      title: 'Modern Facilities',
      description: 'State-of-the-art infrastructure with advanced labs and digital classrooms'
    },
    {
      icon: '🌟',
      title: 'Holistic Development',
      description: 'Focus on sports, arts, and extracurricular activities for well-rounded growth'
    },
    {
      icon: '🤝',
      title: 'Career Guidance',
      description: 'Professional counseling and support for higher education and career planning'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="features" ref={sectionRef}>
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Morning Star?</h2>
          <p className="section-subtitle">
            Discover what makes us the preferred choice for quality education
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${visibleCards.includes(index) ? 'visible' : ''}`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
