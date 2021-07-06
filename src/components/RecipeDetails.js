import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { urlToEmbed, getDetails } from '../helpers';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import './RecipeDetails.css';

function RecipeDetails() {
  let [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const type = isDrinks ? 'drinks' : 'meals';
  const nameKey = isDrinks ? 'strDrink' : 'strMeal';
  const imgKey = isDrinks ? 'strDrinkThumb' : 'strMealThumb';

  if (!details) details = {}; // Cypress bug

  useEffect(() => {
    async function setter() {
      const result = await getDetails(type, id);
      setDetails(result[0]);
      setIngredients(result[1]);
      setMeasures(result[2]);
    }
    setter();
  }, [id, type]);

  function renderIngredients() {
    return (
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            { ingredient }
            { measures[index] && ` - ${measures[index]}` }
          </li>
        ))}
      </ul>
    );
  }

  function renderYoutubeVideo() {
    return (
      <iframe
        className="youtube-video"
        src={ urlToEmbed(details.strYoutube) }
        title="Video da receita"
        data-testid="video"
      />
    );
  }

  return (
    <div>
      <img
        className="details-image"
        src={ details[imgKey] }
        alt={ details[nameKey] }
        data-testid="recipe-photo"
      />
      <div>
        <h2 data-testid="recipe-title">{details[nameKey]}</h2>
        <div>
          <ShareButton />
          <FavoriteButton recipe={ details } />
        </div>
      </div>
      <h4 data-testid="recipe-category">
        <span>{details.strCategory}</span>
        {isDrinks && <span>{` - ${details.strAlcoholic}`}</span>}
      </h4>
      {renderIngredients()}
      <p data-testid="instructions">{details.strInstructions}</p>
      {!isDrinks && renderYoutubeVideo()}
    </div>
  );
}

export default RecipeDetails;
