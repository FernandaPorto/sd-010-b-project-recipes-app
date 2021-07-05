import { combineReducers } from 'redux';
import user from './user';
import recipes from './recipes';
import saveCardsContent from './cardsContent';

const listReducer = combineReducers({ user, recipes, saveCardsContent });

export default listReducer;
