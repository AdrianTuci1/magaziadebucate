import React, { useState } from 'react';
import styles from '../styles/ImageGallery.module.scss';

interface Image {
  url: string;
  description: string;
}

interface ImageGalleryProps {
  images: Image[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0); // First image is selected by default

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const firstGroupImages = images.slice(0, 4);
  const secondGroupImages = images.slice(4, 9);
  const thirdGroupImages = images.slice(9, 13);

  const renderImageGroup = (imageGroup: Image[], startIndex: number) => (
    <div className={styles.imageRow}>
      {imageGroup.map((image, index) => (
        <div
          key={startIndex + index}
          className={`${styles.imageContainer} ${startIndex + index === selectedImageIndex ? styles.selected : ''}`}
          onClick={() => handleImageClick(startIndex + index)}
        >
          <img src={image.url} alt={`Thumbnail ${startIndex + index}`} className={styles.thumbnailImage} />
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.galleryContainer}>
    <div className={styles.imagwrapper}>
      <div className={styles.imagesContainer}>
        {renderImageGroup(firstGroupImages, 0)}
        {renderImageGroup(secondGroupImages, 4)}
        {renderImageGroup(thirdGroupImages, 9)}
      </div>
      </div>
      <div className={styles.selectedImageBox}>
        <div className={styles.selectedImageCard}>
          <img src={images[selectedImageIndex].url} alt="Selected" className={styles.selectedImage} />
          <p className={styles.imageDescription}>{images[selectedImageIndex].description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;



