import { combineReducers } from '@reduxjs/toolkit';
import {
  burgerConstructorReducer,
  ingredientsReducer,
  userReducer,
  feedsReducer,
  profileOrdersReducer,
  orderReducer,
  ingredientDetailsReducer
} from './slices';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  user: userReducer,
  feeds: feedsReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer
});

export default rootReducer;
