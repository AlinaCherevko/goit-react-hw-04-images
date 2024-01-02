import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
// import Modal from 'components/Modal/Modal';

const ImageGallery = ({ hits, onOpenModal }) => {
  return (
    <ul className={css.gallery}>
      {Array.isArray(hits) &&
        hits.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            onOpenModal={onOpenModal}
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          ></ImageGalleryItem>
        ))}
    </ul>
  );
};
export default ImageGallery;
