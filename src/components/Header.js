import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

import '../styles/header.css';

export default function Header() {
  const { path } = useRouteMatch();
  const [showSearch, setShowSearch] = useState(false);

  // Source: https://stackoverflow.com/questions/26574388/boolean-logic-in-switch-case-statement-java/26574416

  function getTitle() {
    const title = path.replace(/\W/g, ' ')
      .split(' ').map((word) => (
        word.replace(/\w/, (char) => char.toUpperCase())))
      .join(' ')
      .replace(' ', '');

    if (path.includes('/ingredientes')) { return 'Explorar Ingredientes'; }
    if (path.includes('/area')) { return 'Explorar Origem'; }
    return (path && title);
  }

  function imageRendering() {
    switch (path) {
    case '/comidas':
    case '/bebidas':
    case '/explorar/comidas/area':
      return (
        <div className="header-container">
          <nav className="header-nav">
            <Link to="/perfil">
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="profile-icon"
              />
            </Link>
            <Link href="/">
              <h2 data-testid="page-title">{ getTitle() }</h2>
            </Link>
            <button
              type="button"
              onClick={ () => setShowSearch(!(showSearch)) }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="search-icon" />
            </button>
          </nav>
          {showSearch && (
            <div>
              <SearchBar />
            </div>)}
        </div>);
    case '/explorar':
    case '/explorar/comidas':
    case '/explorar/comidas/ingredientes':
    case '/explorar/bebidas/ingredientes':
    case '/explorar/bebidas':
    case '/receitas-feitas':
    case '/receitas-favoritas':
    case '/perfil':
      return (
        <div className="header-container">
          <nav className="header-nav">
            <Link to="/perfil">
              <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
            </Link>
            <h2 data-testid="page-title">{ getTitle() }</h2>
          </nav>
        </div>
      );
    default:
      return ('');
    }
  }

  return (
    <header>
      {imageRendering()}
    </header>
  );
}
