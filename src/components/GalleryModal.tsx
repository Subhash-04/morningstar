import React, { useEffect, useState } from 'react';
import '../styles/GalleryModal.css';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  images: { src: string; title: string }[];
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, category, images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <h2>{category}</h2>
        </div>

        <div className="circular-carousel-container">
          <div className="carousel-wrapper">
            {images.map((img, index) => {
              const offset = index - selectedImage;
              const totalImages = images.length;
              
              // Calculate position in circle
              const angle = (offset * 360) / totalImages;
              const isActive = index === selectedImage;
              const isPrev = offset === -1 || (selectedImage === 0 && index === totalImages - 1);
              const isNext = offset === 1 || (selectedImage === totalImages - 1 && index === 0);
              
              return (
                <div
                  key={index}
                  className={`carousel-item ${isActive ? 'active' : ''} ${isPrev ? 'prev' : ''} ${isNext ? 'next' : ''}`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(400px)`,
                    opacity: Math.abs(offset) <= 1 ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                  onClick={() => !isActive && setSelectedImage(index)}
                >
                  {img.src ? (
                    <img src={img.src} alt={img.title} className="carousel-image" />
                  ) : (
                    <div className="image-placeholder">
                      <span className="placeholder-icon">📷</span>
                      <p>{img.title}</p>
                    </div>
                  )}
                  <div className="image-title">{img.title}</div>
                </div>
              );
            })}
          </div>
          
          <button 
            className="carousel-nav-btn prev-btn"
            onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
          >
            ‹
          </button>
          <button 
            className="carousel-nav-btn next-btn"
            onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
          >
            ›
          </button>
          
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
