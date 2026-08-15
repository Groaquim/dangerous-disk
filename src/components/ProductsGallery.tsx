// src/components/ProductGallery.tsx
import { useState } from 'react';

interface ProductGalleryProps {
  images?: string[];
  title?: string;
}

export default function ProductGallery({ images = [], title = "" }: ProductGalleryProps) {
  const fallbackImage = "https://placehold.co/800x1000?text=Visuel+Indisponible";
  const initialImage = images.length > 0 ? images[0] : fallbackImage;

  const [selectedImage, setSelectedImage] = useState<string>(initialImage);

  if (images.length === 0) {
    return (
      <div className="main-image-wrapper">
        <img src={fallbackImage} alt={title} className="main-image" />
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {/* Miniatures uniquement s'il y a plus d'une image */}
      {images.length > 1 && (
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
      )}

      {/* Image principale */}
      <div className="main-image-wrapper">
        <img src={selectedImage} alt={title} className="main-image" />
      </div>
    </div>
  );
}