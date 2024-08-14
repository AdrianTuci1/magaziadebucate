import React, { useEffect, useState, useRef } from 'react';
import RecipeCard from './RecipeCard';
import { RecipeCardProps } from '../types/RecipeCardProps';
import '../styles/recipeslider.scss';

const RecipeSlider: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/top/favorites`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError('eroare');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recipe-slider">
        <div className="popular">
            <h2 className='popular-sec'> <img src="/popular.png" alt="" style={{width:'50px'}}/>RETETE POPULARE</h2>
        </div>
      <button className="prev-button" onClick={scrollLeft}>❮</button>
      <div className="slider-container" ref={sliderRef}>
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card-con card-container">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
      <button className="next-button" onClick={scrollRight}>❯</button>
    </div>
  );
};

export default RecipeSlider;
