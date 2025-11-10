import React, { useEffect, useRef, useState } from 'react';
import GalleryModal from './GalleryModal';
import '../styles/Gallery.css';

interface GalleryItem {
  title: string;
  category: string;
  icon: string;
  images: { src: string; title: string }[];
}

const Gallery: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const galleryItems: GalleryItem[] = [
    { 
      title: 'Science Laboratory', 
      category: 'facilities', 
      icon: '🔬',
      images: [
        { src: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=', title: 'Physics Lab' },
        { src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800', title: 'Chemistry Lab' },
        { src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800', title: 'Biology Lab' },
        { src: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800', title: 'Lab Equipment' }
      ]
    },
    { 
      title: 'Computer Lab', 
      category: 'facilities', 
      icon: '💻',
      images: [
        { src: 'https://www.jokescoff.com/wp-content/uploads/profile-whatsapp-dp-1.jpg', title: 'Computer Lab 1' },
        { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', title: 'Computer Lab 2' },
        { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', title: 'Programming Class' },
        { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', title: 'IT Infrastructure' }
      ]
    },
    { 
      title: 'Library', 
      category: 'facilities', 
      icon: '📚',
      images: [
        { src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800', title: 'Reading Hall' },
        { src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800', title: 'Book Collection' },
        { src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', title: 'Study Area' },
        { src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800', title: 'Digital Library' }
      ]
    },
    { 
      title: 'Sports Complex', 
      category: 'sports', 
      icon: '⚽',
      images: [
        { src: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800', title: 'Football Ground' },
        { src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800', title: 'Cricket Field' },
        { src: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800', title: 'Indoor Stadium' },
        { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', title: 'Sports Equipment' }
      ]
    },
    { 
      title: 'Annual Day', 
      category: 'events', 
      icon: '🎭',
      images: [
        { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', title: 'Cultural Performance' },
        { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', title: 'Prize Distribution' },
        { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', title: 'Guest Speech' },
        { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800', title: 'Student Activities' }
      ]
    },
    { 
      title: 'Cultural Fest', 
      category: 'events', 
      icon: '🎨',
      images: [
        { src: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800', title: 'Dance Performance' },
        { src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', title: 'Music Concert' },
        { src: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800', title: 'Art Exhibition' },
        { src: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800', title: 'Drama Show' }
      ]
    },
    { 
      title: 'Basketball Court', 
      category: 'sports', 
      icon: '🏀',
      images: [
        { src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', title: 'Basketball Court' },
        { src: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800', title: 'Practice Session' },
        { src: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800', title: 'Tournament' },
        { src: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800', title: 'Team Photo' }
      ]
    },
    { 
      title: 'Auditorium', 
      category: 'facilities', 
      icon: '🎪',
      images: [
        { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', title: 'Main Hall' },
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Stage View' },
        { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', title: 'Seating Arrangement' },
        { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', title: 'Audio Visual Setup' }
      ]
    },
  ];

  const handleCardClick = (item: GalleryItem) => {
    setSelectedCategory(item);
    setModalOpen(true);
  };

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
              onClick={() => handleCardClick(item)}
            >
              <div className="gallery-item-inner">
                <div className="gallery-icon">{item.icon}</div>
                <h3 className="gallery-title">{item.title}</h3>
                <span className="gallery-category">{item.category}</span>
                <div className="view-gallery-btn">View Gallery →</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedCategory?.title || ''}
        images={selectedCategory?.images || []}
      />
    </section>
  );
};

export default Gallery;
