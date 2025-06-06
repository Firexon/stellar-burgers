import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TIngredient } from '@utils-types';

type IngredientDetailsState = {
  data: TIngredient | null;
  loading: boolean;
  error: string | null;
};

const initialState: IngredientDetailsState = {
  data: null,
  loading: false,
  error: null
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    clearIngredientData(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
    setIngredientDetails(state, action: PayloadAction<TIngredient>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { clearIngredientData, setIngredientDetails } =
  ingredientDetailsSlice.actions;

export const selectIngredientDetailsData = (state: RootState) =>
  state.ingredientDetails.data;
export const selectIngredientDetailsLoading = (state: RootState) =>
  state.ingredientDetails.loading;
export const selectIngredientDetailsError = (state: RootState) =>
  state.ingredientDetails.error;

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;
