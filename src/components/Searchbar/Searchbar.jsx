import React, { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ handleSearch }) => {
  const [value, setValue] = useState('');

  const onInputChange = ({ target }) => {
    setValue(target.value);
  };
  const formSubmit = e => {
    e.preventDefault();
    handleSearch(value);
    setValue('');
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={formSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          onChange={onInputChange}
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
};
