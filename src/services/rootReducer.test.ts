import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('ingredientDetails');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feeds');
    expect(state).toHaveProperty('profileOrders');
    expect(state).toHaveProperty('order');
  });
});
