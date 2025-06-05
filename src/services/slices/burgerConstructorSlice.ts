import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '../../utils/types';
import { orderBurgerApi } from '../../utils/burger-api';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';

type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  isLoading: boolean;
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  isLoading: false,
  error: null,
  orderRequest: false,
  orderModalData: null
};

export const sendOrderThunk = createAsyncThunk(
  'constructor/sendOrder',
  async (data: string[], thunkAPI) => {
    try {
      return await orderBurgerApi(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },

    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: uuidv4() } };
      }
    },

    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },

    resetOrderRequest(state) {
      state.orderRequest = false;
    },

    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0) {
        [state.ingredients[index - 1], state.ingredients[index]] = [
          state.ingredients[index],
          state.ingredients[index - 1]
        ];
      }
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(sendOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(sendOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.error = action.payload as string;
      });
  }
});

// Селекторы
export const selectConstructor = (state: RootState) => state.burgerConstructor;
export const selectBun = (state: RootState) => state.burgerConstructor.bun;
export const selectIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;
export const selectIsLoading = (state: RootState) =>
  state.burgerConstructor.isLoading;
export const selectError = (state: RootState) => state.burgerConstructor.error;
export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;

export const {
  setBun,
  // addFilling,
  addIngredient,
  removeIngredient,
  resetConstructor,
  resetOrderRequest,
  moveIngredientUp,
  moveIngredientDown,
  setOrderModalData
} = constructorSlice.actions;

export const burgerConstructorReducer = constructorSlice.reducer;
