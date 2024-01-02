import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onOpenModal,
}) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.itemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => onOpenModal(largeImageURL, tags)}
      />
    </li>
  );
};

export default ImageGalleryItem;
