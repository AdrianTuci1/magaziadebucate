import React, { useState, useEffect } from 'react';
import ListRecipeCard from './ListRecipeCard';
import { RecipeCardProps } from '../types/RecipeCardProps';
import { getAuthToken, getAuthUser } from '../redux/storage';
import fetchWrapper from '../redux/fetchWrapper';
import '../styles/listrecipecard.scss'

const FavoriteRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const authUser = getAuthUser();
      const authToken = getAuthToken();

      if (!authUser) {
        setError('Unauthorized');
        return;
      }

      try {
        const response = await fetchWrapper(`${import.meta.env.VITE_API_BASE_URL}/api/favorites/user/${authUser.id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError('An error occurred');
      }
    };

    fetchFavorites();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="favorite-recipes-container" style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
      <h1 className='pref' style={{padding:'20px'}}>Retete Preferate</h1>
      <div className="fav-wrp" style={{width:'90%', justifyContent:'center'}}>
      <div className="card-container list-view" style={{flexDirection:'column'}}>
        {recipes.map((recipe) => (
          <ListRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
