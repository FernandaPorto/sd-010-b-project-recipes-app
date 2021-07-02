import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import FoodDetails from '../components/FoodDetails';
import getFoodFromUrlParams from '../services/api/getFoodOrDrink';
import RecipeContext from '../context/Context';

const FoodInProgress = ({ match }) => {
  const { params: { recipeId } } = match;
  const { selectedFood, setSelectedFood } = useContext(RecipeContext);
  const history = useHistory();
  const params = history.location.pathname.split('/');
  params.shift();
  const [location] = params;
  useEffect(() => {
    const getFood = async () => {
      const res = await getFoodFromUrlParams(location, recipeId);
      const SIX = 6;
      if (location === 'comidas') {
        const alternativas = await getFoodFromUrlParams('bebidasAlternativas');
        const sixAlternatives = alternativas.drinks.slice(0, SIX);
        const meal = res.meals[0];
        meal.alternatives = sixAlternatives;
        setSelectedFood(meal);
      } else {
        const alternativas = await getFoodFromUrlParams('comidasAlternativas');
        const sixAlternatives = alternativas.meals.slice(0, SIX);
        const drink = res.drinks[0];
        drink.alternatives = sixAlternatives;
        setSelectedFood(drink);
      }
    };
    getFood();
  });
  if (!selectedFood) {
    return (
      <p>loading</p>
    );
  }
  return (
    <div>
      <FoodDetails />
    </div>
  );
};

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodInProgress;
