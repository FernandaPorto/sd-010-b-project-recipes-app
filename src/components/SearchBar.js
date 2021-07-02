import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import fetchAPI from '../services/apiRequest';
import RecipesContext from '../context/RecipesContext';

export default function SearchBar() {
  const { path } = useRouteMatch();
  const [filter, setFilter] = useState({ content: '', URL: '' });
  // const [show, setShow] = useState(false);
  const { setGlobalState } = useContext(RecipesContext);

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
    let domain = 'themealdb';
    if (path === '/bebidas') domain = 'thecocktaildb';

    const { content, URL: { name, link } } = filter;
    if (content.length >= 2 && name === 'char') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const data = await fetchAPI(link(domain, content));
    if (content !== '' && URL !== '') setGlobalState(data);
  }

  return (
    <div className="search-container">
      {/* <Alert
        data-testid="alert"
        variant="danger"
        show={ show }
        onClose={ () => setShow(false) }
        dismissible
      >
        Upss, deu ruím!!!
      </Alert> */}
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <label htmlFor="ingredients">
        Ingredientes
        <input
          id="ingredients"
          name="search"
          type="radio"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          name="search"
          type="radio"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="char">
        Primeira letra
        <input
          id="char"
          name="search"
          type="radio"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
      </label>
      <Button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </Button>
    </div>
  );
}
