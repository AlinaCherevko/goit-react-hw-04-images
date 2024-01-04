import React, { useEffect, useState } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getData } from 'servises/api';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [isVisibleLoadMoreBtn, setIsVisibleLoadMoreBtn] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);

  //ств метод який буде забирати значееня яке ми вводимо у форму
  //також ми скидуємо стейт до початкових значень
  const handleSearch = value => {
    setSearchValue(value);
    setHits([]);
    setStatus('idle');
    setPage(1);
    // setLargeImageURL('');
    // setTags('');
    // setIsOpenModal(false);
    setIsVisibleLoadMoreBtn(false);
  };
  const onOpenModal = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setIsOpenModal(true);
  };
  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  const onLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (searchValue === '') return;
    const getHitsByQuery = async () => {
      try {
        setStatus('pending');

        const { hits, totalHits } = await getData(searchValue, page);

        setHits(prevState => [...prevState, ...hits]);
        setStatus('success');
        setIsVisibleLoadMoreBtn(page < Math.ceil(totalHits / hits.length));

        if (hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
      } catch (error) {
        setStatus('error');
        setError(error.message);
        alert(
          `Oops... Your request was rejected with the error: ${error.message}`
        );
        console.log(error.message);
      }
    };
    getHitsByQuery();
  }, [searchValue, page]);
  //сховище:
  // useEffect(() => {
  //   localStorage.setItem('hits', JSON.stringify(hits));
  // }, [hits]);
  // useEffect(() => {
  //   const savedData = JSON.parse(localStorage.getItem('hits')) ?? [];
  //   if (savedData !== 0) {
  //     setHits(savedData);
  //   }
  // }, []);

  return (
    <div className="container">
      <Searchbar handleSearch={handleSearch} />
      {status === 'pending' && <Loader />}
      {status === 'error' && (
        <p>Oops...your request was rejected with the error: {error}</p>
      )}
      {hits.length > 0 && (
        <ImageGallery hits={hits} onOpenModal={onOpenModal} />
      )}

      {isVisibleLoadMoreBtn && <Button onClick={onLoadMoreClick} />}
      {isOpenModal && (
        <Modal
          tags={tags}
          largeImageURL={largeImageURL}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
};
