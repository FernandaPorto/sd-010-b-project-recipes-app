import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { getRandomRecipe } from '../services/apiRequest';

function ExploreFoods() {
  const { path } = useRouteMatch();
  const history = useHistory();

  const [verifyPath, setVerifyPath] = useState(true);
  const [idRandom, setIdRandom] = useState('');

  const [domain, firstKey, secondKey] = path.includes('comidas')
    ? ['themealdb', 'meals', 'idMeal']
    : ['thecocktaildb', 'drinks', 'idDrink'];

  useEffect(() => {
    setVerifyPath(path.includes('comidas'));
  }, [path]);

  useEffect(() => {
    getRandomRecipe(domain)
      .then((result) => setIdRandom(result[firstKey][0][secondKey]));
  }, [firstKey, secondKey, domain]);

  const ingridientPath = path.includes('comidas')
    ? '/explorar/comidas/ingredientes'
    : '/explorar/bebidas/ingredientes';

  function handleSurpriseMe() {
    const randomPath = path.includes('comidas')
      ? `/comidas/${idRandom}`
      : `/bebidas/${idRandom}`;
    history.push(randomPath);
  }

  return (
    <>
      <Header />
      <Link to={ ingridientPath }>
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      {verifyPath && (
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>)}
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleSurpriseMe }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </>
  );
}

export default ExploreFoods;
