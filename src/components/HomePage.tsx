import React, { useEffect, useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import Courses from './Courses';
import Stats from './Stats';
import Achievements from './Achievements';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from './Footer';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage">
      <Header scrollY={scrollY} />
      <Hero />
      <About />
      <Features />
      <Courses />
      <Stats />
      <Achievements />
      <Gallery />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
