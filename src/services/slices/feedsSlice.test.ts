import { feedsReducer, fetchFeedsThunk } from './feedsSlice';
import { TOrder } from '../../utils/types';

type PayloadType = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

describe('feedsSlice', () => {
  const initialState = {
    feedOrders: [],
    userOrders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(feedsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchFeedsThunk.pending', () => {
    const action = { type: fetchFeedsThunk.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle fetchFeedsThunk.fulfilled', () => {
    const mockPayload: PayloadType = {
      orders: [
        {
          _id: '1',
          ingredients: [],
          status: 'done',
          name: 'test',
          createdAt: '',
          updatedAt: '',
          number: 123
        }
      ],
      total: 100,
      totalToday: 10
    };
    const action = {
      type: fetchFeedsThunk.fulfilled.type,
      payload: mockPayload
    };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      feedOrders: mockPayload.orders,
      total: 100,
      totalToday: 10,
      isLoading: false
    });
  });

  it('should handle fetchFeedsThunk.rejected', () => {
    const action = {
      type: fetchFeedsThunk.rejected.type,
      error: { message: 'Ошибка сервера' }
    };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка сервера'
    });
  });
});
