import React, { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };
  onEscapeClick = e => {
    if (e.code === 'Escape') this.props.onCloseModal();
  };
  componentDidMount = () => {
    window.addEventListener('keydown', this.onEscapeClick);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.onEscapeClick);
  };

  render() {
    return (
      <div onClick={this.onOverlayClick} className={css.overlay}>
        <div className={css.modal}>
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </div>
      </div>
    );
  }
}
