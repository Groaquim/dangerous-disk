import { useState } from 'react';

export default function ProductGallery({ images, title }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="gallery-container">
      {/* Miniatures sur le côté */}
      <div className="thumbnails">
        {images.map((img, index) => (
          <button
            key={index}
            className={`thumb-btn ${selectedImage === img ? 'active' : ''}`}
            onClick={() => setSelectedImage(img)}
            type="button"
            aria-label={`Afficher l'image ${index + 1}`}
          >
            <img src={img} alt={`${title} vue ${index + 1}`} />
          </button>
        ))}
      </div>

      {/* Image principale */}
      <div className="main-image-wrapper">
        <img src={selectedImage} alt={title} className="main-image" />
      </div>

      <style>{`
        .gallery-container {
          display: flex;
          flex-direction: column-reverse;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .gallery-container {
            flex-direction: row;
          }
        }

        .thumbnails {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
        }

        @media (min-width: 768px) {
          .thumbnails {
            flex-direction: column;
            width: 80px;
          }
        }

        .thumb-btn {
          border: 2px solid transparent;
          background: none;
          padding: 0;
          cursor: pointer;
          border-radius: 6px;
          overflow: hidden;
          opacity: 0.6;
          transition: all 0.2s ease;
          width: 70px;
          height: 70px;
          flex-shrink: 0;
        }

        .thumb-btn.active, .thumb-btn:hover {
          opacity: 1;
          border-color: #111;
        }

        .thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .main-image-wrapper {
          flex: 1;
          border-radius: 8px;
          overflow: hidden;
          background-color: #f4f4f4;
          aspect-ratio: 4/5;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}