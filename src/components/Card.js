import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/card.css';

export default function Card({ mealOrDrink, index, testId }) {
  const { path } = useRouteMatch();
  const [imgSrcKey, titleKey] = path.includes('comidas')
    ? [mealOrDrink.strMealThumb, mealOrDrink.strMeal]
    : [mealOrDrink.strDrinkThumb, mealOrDrink.strDrink];

  const [imgSrcRecKey, titleRecKey] = path.includes('bebidas')
    ? [mealOrDrink.strMealThumb, mealOrDrink.strMeal]
    : [mealOrDrink.strDrinkThumb, mealOrDrink.strDrink];

  return (
    <section className="card" data-testid={ `${index}-${testId}-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ imgSrcKey || imgSrcRecKey }
        alt={ titleKey || titleRecKey }
      />
      <p
        data-testid={ (testId === 'recipe') ? `${index}-card-name`
          : `${index}-recomendation-title` }
      >
        {titleKey || titleRecKey}
      </p>
    </section>
  );
}

Card.propTypes = {
  mealOrDrink: PropTypes.shape(Object).isRequired,
  index: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
};
