import {
  ingredientDetailsReducer,
  setIngredientDetails,
  clearIngredientData
} from './ingredientDetailsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientDetailsSlice', () => {
  const initialState = {
    data: null,
    loading: false,
    error: null
  };

  const mockIngredient: TIngredient = {
    _id: '123',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 100,
    price: 50,
    image: 'img.png',
    image_mobile: 'img_mobile.png',
    image_large: 'img_large.png'
  };

  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('should handle setIngredientDetails', () => {
    const nextState = ingredientDetailsReducer(
      initialState,
      setIngredientDetails(mockIngredient)
    );
    expect(nextState).toEqual({
      data: mockIngredient,
      loading: false,
      error: null
    });
  });

  it('should handle clearIngredientData', () => {
    const modifiedState = {
      data: mockIngredient,
      loading: true,
      error: 'Ошибка'
    };
    const nextState = ingredientDetailsReducer(
      modifiedState,
      clearIngredientData()
    );
    expect(nextState).toEqual(initialState);
  });
});
