import { ingredientsReducer, fetchIngredientsThunk } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

const ingredient: TIngredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('ingredientsSlice reducer', () => {
  it('pending делает isLoading true', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredientsThunk.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled сохраняет данные и отключает isLoading', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredientsThunk.fulfilled([ingredient], '', undefined)
    );
    expect(state.ingredients).toEqual([ingredient]);
    expect(state.isLoading).toBe(false);
  });

  it('rejected сохраняет ошибку и отключает isLoading', () => {
    const action = {
      type: fetchIngredientsThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = ingredientsReducer(undefined, action);
    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });
});
