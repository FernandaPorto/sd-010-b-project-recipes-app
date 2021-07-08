import React, { useState } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import CardsRecipesFavorite from '../components/CardsRecipes/CardsRecipesFavorite';

function RecipesFavorite({ match }) {
  const { url } = match;
  const initialFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filterFavorites, setFilterFavorites] = useState(initialFavorites);
  return (
    <div>
      <Header />
      <FilterButtons
        initialFavorites={ initialFavorites }
        setFilterFavorites={ setFilterFavorites }
      />
      <div>
        {filterFavorites.map((aux, index) => (
          <CardsRecipesFavorite
            key={ index }
            aux={ aux }
            index={ index }
            url={ url }
          />
        ))}
      </div>
    </div>
  );
}

export default RecipesFavorite;
