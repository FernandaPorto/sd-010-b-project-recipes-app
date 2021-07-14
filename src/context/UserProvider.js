import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setOnLocalStorage,
} from '../services/helpers/localStorage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [verifyLogin, setVerifyLogin] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [done, setDone] = useState([]);
  const [progress, setProgress] = useState({
    cocktails: {
    },
    meals: {
    },
  });
  const [copied, setCopied] = useState(false);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    cocktails: {
    },
    meals: {
    },
  });

  useEffect(() => {
    if (!getFromLocalStorage('favoriteRecipes')) setOnLocalStorage('favoriteRecipes', []);
    if (!getFromLocalStorage('doneRecipes')) setOnLocalStorage('doneRecipes', []);
    if (!getFromLocalStorage('inProgressRecipes')) {
      setOnLocalStorage(
        'inProgressRecipes', {},
      );
    }
    setFavorites(getFromLocalStorage('favoriteRecipes') || []);
    setDone(getFromLocalStorage('doneRecipes') || []);
    setProgress(getFromLocalStorage('inProgressRecipes') || {});
  }, []);

  const copyToClipboard = () => {
    const hideMsgTime = 4000;
    setCopied(true);
    setTimeout(() => setCopied(false), hideMsgTime);
  };
  const inFavorites = (id) => {
    const favoritesStorage = getFromLocalStorage('favoriteRecipes');
    return (!!favoritesStorage.find((favorite) => favorite.id === id));
  };

  const addFavorites = async (recipe) => {
    const favoritesList = getFromLocalStorage('favoriteRecipes');
    setOnLocalStorage('favoriteRecipes', [...favoritesList, recipe]);
    setFavorites(getFromLocalStorage('favoriteRecipes') || []);
  };

  const removeFavorites = (id) => {
    const filteredFavorites = favorites.filter((recipe) => recipe.id !== id);
    removeFromLocalStorage('favoriteRecipes', 'id', id);
    setFavorites(filteredFavorites);
  };

  const handleLogin = () => {
    const { email } = user;
    setOnLocalStorage('mealsToken', 1);
    setOnLocalStorage('cocktailsToken', 1);
    setOnLocalStorage('user', {
      email,
    });
    setVerifyLogin(true);
  };

  const validationUser = () => {
    const { email, password } = user;
    const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const Email = regex.test(email);
    const SEVEN = 7;
    if (Email && password.length >= SEVEN) return false;
    return true;
  };

  const handleChange = ({ target: { type, value } }) => {
    setUser({
      ...user,
      [type]: value,
    });
    validationUser();
  };

  const isDone = (id) => {
    const doneStorage = getFromLocalStorage('doneRecipes');
    return (!!doneStorage.find((complete) => complete.id === id));
  };

  const inProgress = (id, type) => {
    const progressStorage = getFromLocalStorage('inProgressRecipes');
    if (type === 'meals') {
      return (!!progressStorage.find((progression) => progression.meals.id === id));
    }
    if (type === 'cocktails') {
      return (!!progressStorage.find((progression) => progression.cocktails.id === id));
    }
  };

  const context = {
    favorites,
    done,
    copied,
    progress,
    verifyLogin,
    inFavorites,
    addFavorites,
    removeFavorites,
    handleChange,
    validationUser,
    handleLogin,
    copyToClipboard,
    isDone,
    inProgress,
    setInProgressRecipes,
  };

  return (
    <UserContext.Provider value={ context }>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
