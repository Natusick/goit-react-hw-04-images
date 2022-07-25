import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import s from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => { 
  const [inputValue, setInputValue] = useState('');
 
  const handleChange = e => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast.warn('Enter the name of the picture, photo', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  };

    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
          <button type="submit" className={s.button}>
            <FaSearch size={20} fill="blue" />
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;