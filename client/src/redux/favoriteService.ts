import { getAuthToken } from "./storage";

// Define the response type for the favorite actions
interface FavoriteResponse {
  success: boolean;
  message: string;
}

interface FavoriteRecipe {
  id: string;
  title: string;
  // other fields as needed
}

// Function to add a recipe to favorites
export const addFavorite = async (recipeId: string, userId: string): Promise<FavoriteResponse> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ recipeId, userId })
    });
    if (!response.ok) {
      throw new Error('Failed to add favorite');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeFavorite = async (userId: string, recipeId: string): Promise<void> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, recipeId })
    });
    if (response.status === 204) {
      return; // No content, return early
    }
    if (!response.ok) {
      throw new Error('Failed to remove favorite');
    }
    await response.json(); // This will be skipped if status is 204
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

export const getUserFavorites = async (userId: string): Promise<FavoriteRecipe[]> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user favorites');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw error;
  }
};

export const isRecipeLikedByUser = async (userId: string, recipeId: string): Promise<{ liked: boolean }> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites/isLiked/${userId}/${recipeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to check if recipe is liked by user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking if recipe is liked by user:', error);
    throw error;
  }
};