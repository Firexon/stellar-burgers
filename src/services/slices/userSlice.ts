import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '../../utils/burger-api';

import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';
import { TRegisterData, TLoginData } from '../../utils/burger-api';
import { AppDispatch } from '../store';

interface UserState {
  isLoading: boolean;
  user: TUser | null;
  isAuthorized: boolean;
  error: string | null;
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  isAuthorized: false,
  error: null
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const getUserThunk = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  const token = getCookie('accessToken');
  if (token) {
    dispatch(getUserThunk());
  }
};

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => {
    await forgotPasswordApi(data);
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => {
    await resetPasswordApi(data);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    getUserStateSelector: (state) => state,
    getUserSelector: (state) => state.user,
    isAuthorizedSelector: (state) => state.isAuthorized,
    getUserErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Login failed';
      })

      // register
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Registration failed';
      })

      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthorized = false;
        state.error = null;
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to get user';
        state.isAuthorized = false;
      })

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to send reset email';
      })

      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to reset password';
      });
  }
});

export const { clearUserError } = userSlice.actions;
export const {
  getUserSelector,
  getUserStateSelector,
  getUserErrorSelector,
  isAuthorizedSelector
} = userSlice.selectors;

export const userReducer = userSlice.reducer;
