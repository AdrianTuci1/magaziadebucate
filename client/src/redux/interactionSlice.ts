import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAuthToken } from './storage';

interface Favorite {
  userId: string;
  recipeId: string;
}

interface InteractionState {
  favorites: Favorite[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InteractionState = {
  favorites: [],
  status: 'idle',
  error: null,
};

export const addFavorite = createAsyncThunk<Favorite, { userId: string; recipeId: string }, { rejectValue: string }>(
  'interaction/addFavorite',
  async (favoriteData, { rejectWithValue }) => {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('No authentication token found');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(favoriteData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return (await response.json()) as Favorite;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return rejectWithValue('Failed to add favorite');
    }
  }
);

export const removeFavorite = createAsyncThunk<Favorite, { userId: string; recipeId: string }, { rejectValue: string }>(
  'interaction/removeFavorite',
  async (favoriteData, { rejectWithValue }) => {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('No authentication token found');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(favoriteData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return favoriteData;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return rejectWithValue('Failed to remove favorite');
    }
  }
);


const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFavorite.fulfilled, (state, action: PayloadAction<Favorite>) => {
        state.status = 'succeeded';
        state.favorites.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to add favorite';
      })
      .addCase(removeFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<Favorite>) => {
        state.status = 'succeeded';
        state.favorites = state.favorites.filter(favorite => favorite.recipeId !== action.payload.recipeId);
      })
      .addCase(removeFavorite.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to remove favorite';
      });
  },
});

export default interactionSlice.reducer;
