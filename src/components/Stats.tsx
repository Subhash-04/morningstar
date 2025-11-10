import React, { useEffect, useRef, useState } from 'react';
import '../styles/Stats.css';

interface Stat {
  value: number;
  label: string;
  suffix: string;
}

const Stats: React.FC = () => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats: Stat[] = [
    { value: 2500, label: 'Students', suffix: '+' },
    { value: 98, label: 'Success Rate', suffix: '%' },
    { value: 50, label: 'Expert Faculty', suffix: '+' },
    { value: 25, label: 'Years of Excellence', suffix: '+' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            stats.forEach((stat, index) => {
              animateCount(stat.value, index);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = (target: number, index: number) => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounts((prev) => {
        const newCounts = [...prev];
        newCounts[index] = Math.floor(current);
        return newCounts;
      });
    }, duration / steps);
  };

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-value">
              {counts[index]}{stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-bar">
              <div className="stat-bar-fill"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
