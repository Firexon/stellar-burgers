import { userReducer, clearUserError } from './userSlice';
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk
} from './userSlice';
import { TUser } from '@utils-types';

describe('userSlice reducer', () => {
  const initialState = {
    isLoading: false,
    user: null,
    isAuthorized: false,
    error: null
  };

  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle loginUserThunk.fulfilled', () => {
    const action = { type: loginUserThunk.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthorized).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should handle registerUserThunk.fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthorized).toBe(true);
  });

  it('should handle logoutUserThunk.fulfilled', () => {
    const loggedInState = {
      ...initialState,
      user: mockUser,
      isAuthorized: true
    };
    const action = { type: logoutUserThunk.fulfilled.type };
    const state = userReducer(loggedInState, action);
    expect(state.user).toBe(null);
    expect(state.isAuthorized).toBe(false);
  });

  it('should handle getUserThunk.rejected', () => {
    const action = {
      type: getUserThunk.rejected.type,
      error: { message: 'Unauthorized' }
    };
    const state = userReducer(initialState, action);
    expect(state.error).toBe('Unauthorized');
    expect(state.isAuthorized).toBe(false);
  });

  it('should handle updateUserThunk.fulfilled', () => {
    const action = { type: updateUserThunk.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  it('should handle clearUserError', () => {
    const errorState = { ...initialState, error: 'Some error' };
    const state = userReducer(errorState, clearUserError());
    expect(state.error).toBe(null);
  });
});
