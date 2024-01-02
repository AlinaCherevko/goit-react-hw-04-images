import css from './Button.module.css';
import React from 'react';

const Button = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={css.button}>
        Load more
      </button>
    </div>
  );
};

export default Button;
