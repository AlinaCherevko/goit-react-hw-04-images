import React, { Component } from 'react';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };
  onInputChange = ({ target }) => {
    this.setState({ value: target.value });
  };
  formSubmit = e => {
    e.preventDefault();
    this.props.handleSearch(this.state.value);

    this.setState({ value: '' });
  };
  render() {
    const { value } = this.state;
    return (
      <header className={css.searchBar}>
        <form onSubmit={this.formSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.onInputChange}
            value={value}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
