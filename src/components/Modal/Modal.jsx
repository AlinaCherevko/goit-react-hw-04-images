import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ tags, largeImageURL, onCloseModal }) => {
  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const onEscapeClick = e => {
      if (e.code === 'Escape') onCloseModal();
    };

    window.addEventListener('keydown', onEscapeClick);

    return () => {
      window.removeEventListener('keydown', onEscapeClick);
    };
  }, [onCloseModal]);

  return (
    <div onClick={onOverlayClick} className={css.overlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
