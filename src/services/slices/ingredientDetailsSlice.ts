// src/services/slices/ingredientDetailsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type IngredientDetailsState = {
  data: TIngredient | null;
};

const initialState: IngredientDetailsState = {
  data: null
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientsDetails',
  initialState,
  reducers: {
    setIngredientData(state, action: PayloadAction<TIngredient>) {
      state.data = action.payload;
    },
    clearIngredientData(state) {
      state.data = null;
    }
  }
});

export const { setIngredientData, clearIngredientData } =
  ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
