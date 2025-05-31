import { RootState } from './store';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsStatus = (state: RootState) =>
  state.ingredients.status;

export const selectFeeds = (state: RootState) => state.feeds.orders;
export const selectFeedsStatus = (state: RootState) => state.feeds.status;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersStatus = (state: RootState) =>
  state.profileOrders.status;
