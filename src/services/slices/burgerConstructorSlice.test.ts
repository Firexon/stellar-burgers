import {
  addIngredient,
  removeIngredient,
  setBun,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor,
  burgerConstructorReducer
} from './burgerConstructorSlice';
import { TIngredient } from '../../utils/types';

const bun: TIngredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: ''
};

const filling: TIngredient = {
  ...bun,
  _id: '2',
  name: 'Котлета',
  type: 'main'
};

describe('constructorSlice reducer', () => {
  it('должен установить булку', () => {
    const state = burgerConstructorReducer(undefined, setBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('должен добавить ингредиент', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(filling));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0].name).toBe('Котлета');
  });

  it('должен удалить ингредиент', () => {
    const added = burgerConstructorReducer(undefined, addIngredient(filling));
    const idToRemove = added.ingredients[0].id;
    const removed = burgerConstructorReducer(
      added,
      removeIngredient(idToRemove)
    );
    expect(removed.ingredients.length).toBe(0);
  });

  it('должен менять порядок ингредиентов', () => {
    const ing1 = { ...filling, id: '1' };
    const ing2 = { ...filling, id: '2' };
    const state = {
      ...burgerConstructorReducer(undefined, setBun(bun)),
      ingredients: [ing1, ing2]
    };
    const moved = burgerConstructorReducer(state, moveIngredientDown(0));
    expect(moved.ingredients[0].id).toBe('2');
    expect(moved.ingredients[1].id).toBe('1');
  });

  it('должен очищать конструктор', () => {
    const filled = {
      bun,
      ingredients: [{ ...filling, id: 'xyz' }],
      isLoading: false,
      error: null,
      orderRequest: false,
      orderModalData: null
    };
    const reset = burgerConstructorReducer(filled, resetConstructor());
    expect(reset.bun).toBeNull();
    expect(reset.ingredients.length).toBe(0);
  });
});
