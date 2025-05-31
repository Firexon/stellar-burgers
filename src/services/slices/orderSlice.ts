import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  request: boolean;
  orderData: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  request: false,
  orderData: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderStart(state) {
      state.request = true;
      state.error = null;
    },
    createOrderSuccess(state, action: PayloadAction<TOrder>) {
      state.request = false;
      state.orderData = action.payload;
    },
    createOrderFailure(state, action: PayloadAction<string>) {
      state.request = false;
      state.error = action.payload;
    },
    clearOrder(state) {
      state.orderData = null;
      state.error = null;
    }
  }
});

export const {
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  clearOrder
} = orderSlice.actions;

export default orderSlice.reducer;
