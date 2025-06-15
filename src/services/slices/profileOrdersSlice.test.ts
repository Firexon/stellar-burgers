import {
  profileOrdersReducer,
  fetchProfileOrders,
  type ProfileOrdersState
} from './profileOrdersSlice';
import { TOrder } from '@utils-types';

describe('profileOrdersSlice reducer', () => {
  const initialState: ProfileOrdersState = {
    orders: [],
    status: 'idle',
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '123',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Test Order',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      number: 1
    }
  ];

  it('should return the initial state', () => {
    expect(profileOrdersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchProfileOrders.pending', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle fetchProfileOrders.fulfilled', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = profileOrdersReducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.orders).toEqual(mockOrders);
  });

  it('should handle fetchProfileOrders.rejected', () => {
    const action = {
      type: fetchProfileOrders.rejected.type,
      error: { message: 'Fetch failed' }
    };
    const state = profileOrdersReducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Fetch failed');
  });
});
