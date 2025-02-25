import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import { changeFavoritStatus } from '../storage/localStorage';
import RecipesContext from '../context/RecipesContext';

export default function CardFavorit({ mealOrDrink, index }) {
  const {
    id,
    type,
    image,
    name,
    area,
    alcoholicOrNot,
    category,
    doneDate,
    tags } = mealOrDrink;
  const [isFavorit, setFavorit] = useState({ status: false, imagem: whiteHeartIcon });
  const [copy, setCopy] = useState(false);

  const { favorites, readFavoritesFromStorage } = useContext(RecipesContext);

  useEffect(() => {
    setFavorit({
      status: favorites.find((el) => el.id === id),
      imagem: favorites.find((el) => el.id === id)
        ? blackHeartIcon : whiteHeartIcon });
  }, [favorites, id, readFavoritesFromStorage]);

  function handleFavorite() {
    changeFavoritStatus(mealOrDrink);
    readFavoritesFromStorage();
  }

  function handleShare() {
    const destination = type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}`;
    const linkAdress = window.location.href.replace('/receitas-favoritas', destination);
    navigator.clipboard.writeText(linkAdress)
      .then(() => setCopy(true));
  }

  return (
    <div data-testid={ `${index}-horizontal-card` }>
      <Link
        to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }
      >
        <img
          width="150px"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </Link>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'bebida' ? `${category} - ${alcoholicOrNot}` : `${area} - ${category}` }
      </p>

      <Link
        to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }
      >
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>

      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

      <button type="button" onClick={ handleShare }>
        {!copy
          ? (
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ name }
            />)
          : (<p data-testid={ `${index}-horizontal-share-btn` }>Link copiado!</p>)}
      </button>

      <button type="button" onClick={ handleFavorite }>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ isFavorit.imagem }
          alt={ name }
        />
      </button>

      {typeof tags === 'object' && tags.length > 0
        ? tags.map((tag, i) => (
          <p
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ `${i} - ${tag}` }
          >
            {tag}
          </p>

        ))
        : <p data-testid={ `${index}-${tags}-horizontal-tag` }>{tags}</p>}

    </div>
  );
}

CardFavorit.propTypes = {
  mealOrDrink: PropTypes.shape(Object).isRequired,
  index: PropTypes.number.isRequired,
};
