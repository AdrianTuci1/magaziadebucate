import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/smallrecipecard.scss';

export interface RecipeCardProps {
  id: string;
  title: string;
  imageUrl?: string;
}

interface SmallRecipeCardProps {
  recipe: RecipeCardProps;
  isClickable?: boolean;
}

const SmallRecipeCard: React.FC<SmallRecipeCardProps> = ({ recipe, isClickable = true }) => {
  const navigate = useNavigate();

  const handleRecipeClick = (id: string) => {
    if (isClickable) {
      navigate(`/retete/${id}`);
    }
  };

  const imageUrl = recipe.imageUrl ? `${import.meta.env.VITE_API_BASE_URL}${recipe.imageUrl}` : '';

  return (
    <div className="small-card" onClick={() => handleRecipeClick(recipe.id)} style={{ cursor: isClickable ? 'pointer' : 'default' }}>
      <img className="small-card-image" src={imageUrl} alt={recipe.title} />
      <div className="small-card-title">{recipe.title}</div>
    </div>
  );
};

export default SmallRecipeCard;

