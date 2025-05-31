import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserApi, updateUserApi } from '../../utils/burger-api';
import { TUser } from '../../utils/types';

type UserState = {
  user: TUser | null;
  isAuth: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isAuth: false,
  status: 'idle',
  error: null
};

// Получение текущего пользователя
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await getUserApi();
  return response.user;
});

// Обновление данных пользователя
export const updateUser = createAsyncThunk<
  TUser,
  { name: string; email: string; password?: string }
>('user/updateUser', async (userData) => {
  const response = await updateUserApi(userData);
  return response.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch user';
        state.isAuth = false;
      })

      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to update user';
      });
  }
});

export const userReducer = userSlice.reducer;
