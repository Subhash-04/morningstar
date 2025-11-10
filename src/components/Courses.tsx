import React, { useEffect, useRef, useState } from 'react';
import '../styles/Courses.css';

interface Course {
  title: string;
  duration: string;
  description: string;
  subjects: string[];
  icon: string;
}

const Courses: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const courses: Course[] = [
    {
      title: 'Intermediate (MPC)',
      duration: '2 Years',
      description: 'Mathematics, Physics, and Chemistry for aspiring engineers and scientists',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
      icon: '🔬'
    },
    {
      title: 'Intermediate (BiPC)',
      duration: '2 Years',
      description: 'Biology, Physics, and Chemistry for medical and life sciences aspirants',
      subjects: ['Biology', 'Physics', 'Chemistry', 'English'],
      icon: '🧬'
    },
    {
      title: 'Intermediate (CEC)',
      duration: '2 Years',
      description: 'Commerce, Economics, and Civics for business and management careers',
      subjects: ['Commerce', 'Economics', 'Civics', 'English'],
      icon: '💼'
    },
    {
      title: 'B.Sc (Computer Science)',
      duration: '3 Years',
      description: 'Comprehensive computer science program with practical training',
      subjects: ['Programming', 'Data Structures', 'DBMS', 'Web Technologies'],
      icon: '💻'
    },
    {
      title: 'B.Com (General)',
      duration: '3 Years',
      description: 'Bachelor of Commerce with focus on accounting and business',
      subjects: ['Accounting', 'Business Law', 'Economics', 'Taxation'],
      icon: '📊'
    },
    {
      title: 'B.A (English)',
      duration: '3 Years',
      description: 'Bachelor of Arts with specialization in English literature',
      subjects: ['Literature', 'Linguistics', 'Communication', 'Writing'],
      icon: '📚'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            courses.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
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
    <section className="courses" ref={sectionRef} id="courses">
      <div className="courses-container">
        <div className="section-header">
          <h2 className="section-title">Our Programs</h2>
          <p className="section-subtitle">
            Choose from our diverse range of academic programs designed to shape your future
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`course-card ${visibleCards.includes(index) ? 'visible' : ''}`}
            >
              <div className="course-header">
                <div className="course-icon">{course.icon}</div>
                <span className="course-duration">{course.duration}</span>
              </div>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <div className="course-subjects">
                {course.subjects.map((subject, idx) => (
                  <span key={idx} className="subject-tag">{subject}</span>
                ))}
              </div>
              <button className="course-btn">
                Learn More
                <span className="btn-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
