import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import tortaGif from '../images/torta.gif';
import goatGif from '../images/goat.gif';
import beefGif from '../images/beef2.gif';
import beefAllGif from '../images/beef.gif';
import breakfastGif from '../images/breakfast.gif';
import chickenGif from '../images/chicken.gif';
import ordinaryDrinkGif from '../images/drink1.gif';
import cocktailGif from '../images/drink.gif';
import shakesGif from '../images/shakes.gif';
import otherDrinkGif from '../images/drink2.gif';
import cocoaGif from '../images/cocoa.gif';
import '../styles/otherLoader.css';

function OtherLoader({ category }) {
  const { path } = useRouteMatch();
  function handleSrcImg() {
    if (path.includes('comidas')) {
      switch (category) {
      case 'Beef':
        return beefGif;
      case 'Breakfast':
        return breakfastGif;
      case 'Chicken':
        return chickenGif;
      case 'Dessert':
        return tortaGif;
      case 'Goat':
        return goatGif;
      case 'All':
        return beefAllGif;
      default:
        return beefAllGif;
      }
    }
    if (path.includes('bebidas')) {
      switch (category) {
      case 'Ordinary Drink':
        return ordinaryDrinkGif;
      case 'Cocktail':
        return cocktailGif;
      case 'Milk / Float / Shake':
        return shakesGif;
      case 'Other/Unknown':
        return otherDrinkGif;
      case 'Cocoa':
        return cocoaGif;
      case 'All':
        return otherDrinkGif;
      default:
        return ordinaryDrinkGif;
      }
    }
  }
  return (
    <div className="loader">
      <img src={ handleSrcImg() } alt="Loader" />
    </div>
  );
}

export default OtherLoader;

OtherLoader.propTypes = {
  category: PropTypes.string.isRequired,
};
