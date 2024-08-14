import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import { 
  setAuthToken, getAuthToken, removeAuthToken,
  setAuthUser, getAuthUser, removeAuthUser,
  setAuthRoles, getAuthRoles, removeAuthRoles 
} from './storage';
import { isTokenExpired } from './auth';
import toast from 'react-hot-toast';

// Define User and AuthState interfaces
interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  image: string;
  verified: boolean;
  roles: string[];
  banned: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  roles: string[];
  error: string | null;
  loading: boolean;
}

// Initial state setup
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: getAuthToken(),
  roles: [],
  error: null,
  loading: true,
};

// Slice definition
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; roles: string[] }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.roles = action.payload.roles;
      state.error = null;
      state.loading = false;
      persistAuthState(action.payload.token, action.payload.user, action.payload.roles);
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.roles = [];
      state.error = null;
      state.loading = false;
      clearAuthState();
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      setAuthUser(action.payload);
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Export actions
export const { loginSuccess, logoutSuccess, updateUserSuccess, authFailure, setLoading } = authSlice.actions;

// Utility functions
const persistAuthState = (token: string, user: User, roles: string[]) => {
  setAuthToken(token);
  setAuthUser(user);
  setAuthRoles(roles);
};

const clearAuthState = () => {
  removeAuthToken();
  removeAuthUser();
  removeAuthRoles();
};

// Thunks
export const initializeLoginState = (): AppThunk => (dispatch) => {
  const token = getAuthToken();
  const user = getAuthUser();
  const roles = getAuthRoles();

  if (token && user && !isTokenExpired(token)) {
    dispatch(loginSuccess({ user, token, roles }));
  } else {
    dispatch(logoutSuccess());
    dispatch(setLoading(false));
  }
};

export const login = (username: string, password: string): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Login failed');
    } else {
      const data = await response.json();
      const userData: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        image: data.image,
        verified: data.verified,
        roles: data.roles,
        banned: data.banned,
      };
      const token = data.accessToken;
      dispatch(loginSuccess({ user: userData, token, roles: data.roles }));
      toast('Te-ai conectat cu succes!');
      console.log(userData, token);
    }
  } catch (error: any) {
    console.error('Login error:', error);
    toast(`${error}`);
    dispatch(authFailure(error.message));
  }
};

export const updateUser = (id: string, formData: FormData): AppThunk => async (dispatch, getState) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Update failed');
    } else {
      const responseData = await response.json();
      const updatedUser: User = responseData.user; // Extract the user object from the response

      // Dispatch the updateUserSuccess action with the updated user
      dispatch(updateUserSuccess(updatedUser));

      // Retrieve the current state to make sure other auth details are intact
      const currentState = getState().auth;

      // Ensure that only the user object is stored in localStorage
      setAuthUser(updatedUser);
      setAuthToken(currentState.token!);
      setAuthRoles(currentState.roles);

      return updatedUser;  // Return the updated user data
    }
  } catch (error: any) {
    console.error('Update error:', error);
    dispatch(authFailure(error.message));
    throw error;  // Re-throw the error so it can be handled in the calling component
  }
};



export const logout = (): AppThunk => (dispatch) => {
  dispatch(logoutSuccess());
  toast('Te-ai deconectat cu succes!');
  console.log('Logout successful!');
};

export default authSlice.reducer;
