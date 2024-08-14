import { getAuthToken } from './storage';

interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  user: {
    username: string;
  };
}

export const fetchComments = async (recipeId: string): Promise<Comment[]> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${recipeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const addComment = async (recipeId: string, userId: string, content: string): Promise<Comment> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ recipeId, userId, content })
    });
    if (!response.ok) {
      throw new Error('Failed to add comment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId: string, userId: string): Promise<void> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId })
    });
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};


export const incrementRecipeViews = async (recipeId: string): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipeId}/views`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to increment views');
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
    throw error;
  }
};

