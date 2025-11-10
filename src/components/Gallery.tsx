import React, { useEffect, useRef, useState } from 'react';
import '../styles/Gallery.css';

interface GalleryItem {
  title: string;
  category: string;
  icon: string;
}

const Gallery: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);

  const galleryItems: GalleryItem[] = [
    { title: 'Science Laboratory', category: 'facilities', icon: '🔬' },
    { title: 'Computer Lab', category: 'facilities', icon: '💻' },
    { title: 'Library', category: 'facilities', icon: '📚' },
    { title: 'Sports Complex', category: 'sports', icon: '⚽' },
    { title: 'Annual Day', category: 'events', icon: '🎭' },
    { title: 'Cultural Fest', category: 'events', icon: '🎨' },
    { title: 'Basketball Court', category: 'sports', icon: '🏀' },
    { title: 'Auditorium', category: 'facilities', icon: '🎪' },
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Facilities', value: 'facilities' },
    { label: 'Events', value: 'events' },
    { label: 'Sports', value: 'sports' },
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            filteredItems.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index]);
              }, index * 80);
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
  }, [activeFilter]);

  return (
    <section className="gallery" ref={sectionRef} id="gallery">
      <div className="gallery-container">
        <div className="section-header">
          <h2 className="section-title">Campus Life</h2>
          <p className="section-subtitle">
            Explore our vibrant campus and world-class facilities
          </p>
        </div>

        <div className="gallery-filters">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(filter.value);
                setVisibleItems([]);
              }}
            >
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className={`gallery-item ${visibleItems.includes(index) ? 'visible' : ''}`}
            >
              <div className="gallery-item-inner">
                <div className="gallery-icon">{item.icon}</div>
                <h3 className="gallery-title">{item.title}</h3>
                <span className="gallery-category">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
