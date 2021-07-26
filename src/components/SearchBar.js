import React, { useState, useContext } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { fetchAPI } from '../services/apiRequest';
import RecipesContext from '../context/RecipesContext';

import '../styles/searchBar.css';

const TWELVE = 12;
export default function SearchBar() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const [filter, setFilter] = useState({ content: '', URL: '' });
  const { setSearchResult, setLimit } = useContext(RecipesContext);

  function handleChange({ target }) {
    const { id, value, type } = target;

    const data = {
      ingredients: (domain, content) => `https://www.${domain}.com/api/json/v1/1/filter.php?i=${content}`,
      name: (domain, content) => `https://www.${domain}.com/api/json/v1/1/search.php?s=${content}`,
      char: (domain, content) => `https://www.${domain}.com/api/json/v1/1/search.php?f=${content}`,
    };

    if (type === 'radio') {
      setFilter({ ...filter,
        URL: {
          name: id,
          link: data[id] },
      });
    }

    if (type === 'text') setFilter({ ...filter, content: value });
  }

  async function handleClick() {
    const domain = path === '/bebidas' ? 'thecocktaildb' : 'themealdb';
    const targetId = path === '/comidas' ? 'idMeal' : 'idDrink';

    const { content, URL: { name, link } } = filter;
    if (content.length > 1 && name === 'char') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const data = await fetchAPI(link(domain, content));
    const firstKey = (path === '/bebidas') ? 'drinks' : 'meals';
    if (data[firstKey] && data[firstKey].length === 1) {
      history.push(`${path}/${data[firstKey][0][targetId]}`);
    }
    if (!data[firstKey]) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (content !== '' && URL !== '') {
      setSearchResult(data[firstKey]);
    }

    setLimit(TWELVE);
  }

  return (
    <div className="search-container">
      <div className="ipt-pls-sch-btn">
        <input
          type="text"
          data-testid="search-input"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
      <div className="radio-ipts">
        <label htmlFor="ingredients">
          <input
            id="ingredients"
            name="search"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          {' '}
          Ingredientes
        </label>
        <label htmlFor="name">
          <input
            id="name"
            name="search"
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          {' '}
          Nome
        </label>
        <label htmlFor="char">
          <input
            id="char"
            name="search"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
          {' '}
          Primeira letra
        </label>
      </div>
    </div>
  );
}
