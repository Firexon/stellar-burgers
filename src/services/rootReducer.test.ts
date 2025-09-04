import rootReducer from './rootReducer';

import {
  constructorInitialState,
  ingredientsInitialState,
  ingredientDetailsInitialState,
  userInitialState,
  feedsInitialState,
  profileOrdersInitialState,
  orderInitialState
} from './slices';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние всех слайсов', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      burgerConstructor: constructorInitialState,
      ingredients: ingredientsInitialState,
      ingredientDetails: ingredientDetailsInitialState,
      user: userInitialState,
      feeds: feedsInitialState,
      profileOrders: profileOrdersInitialState,
      order: orderInitialState
    });
  });
});
