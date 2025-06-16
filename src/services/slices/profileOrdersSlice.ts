import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

import { RootState } from '../store';

export type ProfileOrdersState = {
  orders: TOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: ProfileOrdersState = {
  orders: [],
  status: 'idle',
  error: null
};

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch orders';
      });
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
export const profileOrdersInitialState = initialState;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersStatus = (state: RootState) =>
  state.profileOrders.status;
