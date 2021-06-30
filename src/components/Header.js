import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, search }) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      <header>
        <Link to="/perfil">
          <button type="button">
            <img data-testid="profile-top-btn" src={ ProfileIcon } alt="profile-icon" />
          </button>
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        {
          search === 'false' ? ''
            : (
              <button type="button" onClick={ () => setSearchBar(!searchBar) }>
                <img src={ SearchIcon } alt="search-icon" data-testid="search-top-btn" />
              </button>
            )
        }
      </header>
      {searchBar && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};
