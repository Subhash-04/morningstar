import React, { useEffect, useRef, useState } from 'react';
import '../styles/Achievements.css';

interface Achievement {
  year: string;
  title: string;
  description: string;
  icon: string;
}

const Achievements: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const achievements: Achievement[] = [
    {
      year: '2023',
      title: 'Best College Award',
      description: 'Recognized as the Best Junior College in the region',
      icon: '🏆'
    },
    {
      year: '2022',
      title: '100% Results',
      description: 'Achieved 100% pass percentage in Board Examinations',
      icon: '📈'
    },
    {
      year: '2021',
      title: 'NAAC A+ Grade',
      description: 'Accredited with A+ grade by NAAC',
      icon: '⭐'
    },
    {
      year: '2020',
      title: 'Excellence in Sports',
      description: 'State-level championship winners',
      icon: '🥇'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            achievements.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index]);
              }, index * 200);
            });
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
    <section className="achievements" ref={sectionRef}>
      <div className="achievements-container">
        <div className="section-header">
          <h2 className="section-title">Our Achievements</h2>
          <p className="section-subtitle">
            Celebrating excellence and milestones in our journey
          </p>
        </div>

        <div className="timeline">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`timeline-item ${visibleItems.includes(index) ? 'visible' : ''} ${
                index % 2 === 0 ? 'left' : 'right'
              }`}
            >
              <div className="timeline-content">
                <div className="achievement-icon">{achievement.icon}</div>
                <span className="achievement-year">{achievement.year}</span>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
