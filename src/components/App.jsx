import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getData } from 'servises/api';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    hits: [],
    status: 'idle',
    page: 1,
    isVisibleLoadMoreBtn: false,
    isOpenModal: false,
    large: '',
    tags: '',
  };

  //ств метод який буде забирати значееня яке ми вводимо у форму
  //також ми скидуємо стейт до початкових значень
  handleSearch = value => {
    this.setState({
      searchValue: value,
      hits: [],
      status: 'idle',
      page: 1,
      large: '',
      tags: '',
      isOpenModal: false,
      isVisibleLoadMoreBtn: false,
    });
  };
  onOpenModal = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags, isOpenModal: true });
    // console.log('hello');
  };
  onCloseModal = () => {
    this.setState({ isOpenModal: false });
    // console.log('hello');
  };
  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  componentDidMount = () => {
    // Json.parse() ми огортаємо в try, catch щоб уникнути падіння скрипта якщо прочитали невалідний JSON
    try {
      const stringifiedHits = localStorage.getItem('hits');
      const hits = JSON.parse(stringifiedHits);
      this.setState({ hits });
    } catch (error) {
      this.setState({ error: error.message, status: 'error' });
      console.log(error.message);
    }
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (
      this.state.searchValue !== prevState.searchValue ||
      this.state.page !== prevState.page
    ) {
      try {
        this.setState({ status: 'pending' });
        const { hits, totalHits } = await getData(
          this.state.searchValue,
          this.state.page
        );

        this.setState(prevState => ({
          status: 'success',
          hits: [...prevState.hits, ...hits],
          isVisibleLoadMoreBtn:
            this.state.page < Math.ceil(totalHits / hits.length),
        }));
        if (hits.length === 0 || this.state.searchValue === '') {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );

          return;
        }
      } catch (error) {
        this.setState({ error: error.message, status: 'error' });
        console.log(error.message);
      }
    }
    if (this.state.hits !== prevState.hits) {
      const stringifiedHits = JSON.stringify(this.state.hits);
      localStorage.setItem('hits', stringifiedHits);
    }
  };

  render() {
    return (
      <div className="container">
        <Searchbar handleSearch={this.handleSearch} />
        {this.state.status === 'pending' && <Loader />}
        {this.state.status === 'error' && (
          <p>
            Oops...your request was rejected with the error: {this.state.error}
          </p>
        )}
        {this.state.searchValue !== '' ? (
          <ImageGallery hits={this.state.hits} onOpenModal={this.onOpenModal} />
        ) : (
          <ImageGallery hits={[]} />
        )}

        {this.state.isVisibleLoadMoreBtn && this.state.searchValue !== '' && (
          <Button onClick={this.onLoadMoreClick} />
        )}
        {this.state.isOpenModal && (
          <Modal
            tags={this.state.tags}
            largeImageURL={this.state.largeImageURL}
            onCloseModal={this.onCloseModal}
          />
        )}
      </div>
    );
  }
}
