import React, { useEffect, useState, useContext } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import Card from '../components/Card';
import VideoPlayer from '../components/VideoPlayer';
import { saveFavoriteRecipe } from '../storage/localStorage';
import '../styles/details.css';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import { getDataById, getRandomData } from '../services/apiRequest';
import Loading from '../components/Loading';
import RecipesContext from '../context/RecipesContext';

const SIX = 6;
const LOADER_TIMER = 2000;
function handleIngredientsData(List) {
  const ingredientFormated = List.map((el, i, arr) => (
    (el[0].includes('Ingredient')) && ([`${el[1]
      + arr.filter((elt) => elt[0] === (`strMeasure${i + 1}`))
        .map((result) => (` - ${result[1]}`))}`,
    ]))).filter((fil) => fil);
  return ingredientFormated;
}

function handleRecipeInProgress(history, path, id) {
  history.push(`${path.replace(':id', `${id}`)}/in-progress`);
}

function handleFavorite(fvoritState, setFavoritState, path, content) {
  setFavoritState((prevState) => ({ status: !fvoritState.status,
    imagem: prevState.imagem === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon }));
  saveFavoriteRecipe(path, content);
}

export default function Details() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { id } = useParams();

  const { favorites, readFavoritesFromStorage } = useContext(RecipesContext);

  const [domain, firstKey, imgSrc, title, recDomain, recFirstKey] = path
    .includes('comidas')
    ? ['themealdb', 'meals', 'strMealThumb', 'strMeal', 'thecocktaildb', 'drinks']
    : ['thecocktaildb', 'drinks', 'strDrinkThumb', 'strDrink', 'themealdb', 'meals'];

  const [singleContent, setSingleContent] = useState([]);
  const [ingredientsList, setIngridientsList] = useState([]);
  const [recomendations, setRecomentation] = useState([]);
  const [isFavorit, setFavorit] = useState({ status: false, imagem: whiteHeartIcon });
  const [isLoading, setLoader] = useState(true);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    getDataById(domain, id).then((res) => {
      setSingleContent(res[firstKey] || []);

      const list = Object.entries(res[firstKey][0]).filter((el) => (
        (el[0].includes('Ingredient')
        || el[0].includes('Measure')) && el[1]) && el[1] !== ' ');
      setIngridientsList(list);
    });

    getRandomData(recDomain).then((res) => setRecomentation(res[recFirstKey]
      .filter((_e, index) => index < SIX)));

    setTimeout(() => {
      setLoader(false);
    }, LOADER_TIMER);
  }, [id, domain, firstKey, recDomain, recFirstKey]);

  useEffect(() => {
    setFavorit({
      status: favorites.find((el) => el.id === id),
      imagem: favorites.find((el) => el.id === id)
        ? blackHeartIcon : whiteHeartIcon });
  }, [favorites, id, readFavoritesFromStorage]);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setCopy(true));
  }
  return (
    isLoading ? (<Loading />)
      : (
        <>
          <img
            data-testid="recipe-photo"
            src={ singleContent[0][imgSrc] }
            alt={ singleContent[0][title] }
            width="200px"
          />
          <div className="recipe-heading-container">
            <div className="info-heading">
              <h3 data-testid="recipe-title">{singleContent[0][title]}</h3>
              <p data-testid="recipe-category">
                {
                  firstKey === 'drinks'
                    ? singleContent[0].strAlcoholic
                    : singleContent[0].strCategory
                }
              </p>
            </div>
            <Button onClick={ handleShare }>
              { !copy ? (<img data-testid="share-btn" src={ shareIcon } alt="" />)
                : (<p data-testid="share-btn">Link copiado!</p>)}
            </Button>
            <Button
              onClick={
                () => handleFavorite(isFavorit, setFavorit, path, singleContent[0])
              }
            >
              <img
                data-testid="favorite-btn"
                src={ isFavorit.imagem }
                alt=""
              />
            </Button>
          </div>
          <div className="ingredients-container">
            <h4>
              Ingredients
            </h4>
            {handleIngredientsData(ingredientsList).map((string, i) => (
              <div key={ i }>
                <p data-testid={ `${i}-ingredient-name-and-measure` }>
                  { string }
                </p>
              </div>
            ))}
          </div>
          <div className="instructions-video-container">
            <p data-testid="instructions">
              {singleContent[0].strInstructions}
            </p>
            { path.includes('/comidas') && (
              <VideoPlayer
                testID="video"
                videoLink={ singleContent[0].strYoutube }
                recipeTitle={ singleContent[0][title] }
              />
            ) }
          </div>
          <Carousel>
            { recomendations.map((item, i) => (
              <Carousel.Item
                className="recomendations-container"
                key={ i }
              >
                <Card
                  mealOrDrink={ item }
                  index={ i }
                  testId="recomendation"
                />
                {/* <CardRecomendation
                mealOrDrink={ array[i + 1] || array[0] }
                index={ i + 1 }
                testId="recomendation"
              /> */}
              </Carousel.Item>
            ))}
          </Carousel>
          <Button
            className="start-recipe-btn"
            onClick={ () => handleRecipeInProgress(history, path, id) }
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </Button>
        </>)
  );
}
