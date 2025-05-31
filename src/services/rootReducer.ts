import { combineReducers } from '@reduxjs/toolkit';
import {
  constructorReducer,
  ingredientsReducer,
  userReducer,
  feedsReducer,
  profileOrdersReducer,
  orderReducer,
  ingredientDetailsReducer
} from './slices';

const rootReducer = combineReducers({
  constructor: constructorReducer,
  ingredients: ingredientsReducer,
  ingredientsDetails: ingredientDetailsReducer,
  user: userReducer,
  feeds: feedsReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer
});

export default rootReducer;
