import React, { useEffect, useRef, useState } from 'react';
import '../styles/Testimonials.css';

interface Testimonial {
  name: string;
  role: string;
  message: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials: Testimonial[] = [
    {
      name: 'Rajesh Kumar',
      role: 'B.Sc Graduate 2023',
      message: 'Morning Star College provided me with excellent education and opportunities. The faculty is supportive and the infrastructure is top-notch.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Intermediate Student',
      message: 'The teaching methods are innovative and the environment is very conducive to learning. I highly recommend this college.',
      rating: 5
    },
    {
      name: 'Anil Reddy',
      role: 'B.Com Graduate 2022',
      message: 'Best decision I made was joining Morning Star. The career guidance and placement support helped me secure a great job.',
      rating: 5
    }
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-subtitle">
            Hear from our successful students and their experiences
          </p>
        </div>

        <div className={`testimonials-slider ${isVisible ? 'visible' : ''}`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="quote-icon">"</div>
              <p className="testimonial-message">{testimonial.message}</p>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.name.charAt(0)}</div>
                <div>
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
