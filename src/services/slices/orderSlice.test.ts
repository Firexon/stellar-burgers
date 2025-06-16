import { orderReducer, clearOrder, fetchOrderThunk } from './orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice reducer', () => {
  const initialState = {
    isLoading: false,
    order: null,
    error: null
  };

  const mockOrder: TOrder = {
    _id: '123',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Test Burger',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 999
  };

  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchOrderThunk.pending', () => {
    const action = { type: fetchOrderThunk.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle fetchOrderThunk.fulfilled', () => {
    const action = {
      type: fetchOrderThunk.fulfilled.type,
      payload: mockOrder
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, order: mockOrder });
  });

  it('should handle fetchOrderThunk.rejected', () => {
    const action = {
      type: fetchOrderThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'Ошибка' });
  });

  it('should handle clearOrder', () => {
    const stateWithOrder = {
      isLoading: false,
      order: mockOrder,
      error: 'Some error'
    };
    const state = orderReducer(stateWithOrder, clearOrder());
    expect(state).toEqual(initialState);
  });
});
