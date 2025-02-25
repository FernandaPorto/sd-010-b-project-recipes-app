import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';

export default function CardRecipesDone({ mealOrDrink, index }) {
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

  const [copy, setCopy] = useState(false);

  function handleShare() {
    const destination = type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}`;
    const linkAdress = window.location.href.replace('/receitas-feitas', destination);
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

CardRecipesDone.propTypes = {
  mealOrDrink: PropTypes.shape(Object).isRequired,
  index: PropTypes.number.isRequired,
};
