import { useNavigate } from 'react-router-dom';
import { Clock2, Edit3, Trash2 } from 'lucide-react';
import '../styles/listrecipecard.scss';
import { RecipeCardProps } from '../types/RecipeCardProps';


interface ListRecipeCardProps {
  recipe: RecipeCardProps;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function ListRecipeCard({ recipe, onEdit, onDelete }: ListRecipeCardProps) {
  const navigate = useNavigate();

  const handleRecipeClick = (id: string) => {
    const recipeId = id;
    navigate(`/retete/${recipeId}`);
  };

  const getOverlayImage = (options: string) => {
    switch (options) {
      case 'High-Protein':
        return '/protein.png';
      case 'Vegan':
        return '/vegan.png';
      case 'Balanced':
        return '/balanced.png';
      case 'Traditional':
        return '/traditional.png';
      default:
        return '/protein.png';
    }
  };

  const getDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '/easy.png';
      case 'medium':
        return '/medium.png';
      case 'hard':
        return '/hard.png';
      default:
        return 'Unknown';
    }
  };

  const overlayImage = getOverlayImage(recipe.options);
  const difficultyLevel = getDifficulty(recipe.difficulty);

  const totalTime = parseInt(recipe.cookingTime, 10) + parseInt(recipe.prepTime, 10);

  const imageUrl = `${import.meta.env.VITE_API_BASE_URL}${recipe.imageUrl}`;

  return (
    <div className="list-card">
      <div className="list-content">
        <div className="list-image-container">
          <img className="recipe-image" src={imageUrl} alt="" />
          <img className="overlay-image" src={overlayImage} alt="Option icon" />
        </div>
        <div className="list-description-container">
          <p className="likes"><img src="/hearta.png" alt="" style={{width:'25px'}}/>{recipe.likes}</p>
          <h2 className='recipe-title'>{recipe.title}</h2>
          <div className="icons-container">
            <p className="time"><Clock2 style={{width:'30px'}}/>{totalTime}</p>
            <p className="serving"><img src="/person.png" alt="" style={{width:'25px'}}/>{recipe.servings}</p>
            <p className="difficulty"><img src={difficultyLevel} alt="" style={{width:'30px'}}/></p>
          </div>
          <button className="view-recipe" onClick={() => handleRecipeClick(recipe.id)}>
            VIEW RECIPE
          </button>
        </div>
        {(onEdit || onDelete) && (
          <div className="actions-container">
            {onEdit && (
              <button className="edit-recipe" onClick={() => onEdit(recipe.id)}>
                <Edit3 style={{width: '20px'}}/>
              </button>
            )}
            {onDelete && (
              <button className="delete-recipe" onClick={() => onDelete(recipe.id)}>
                <Trash2 style={{width: '20px'}}/>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListRecipeCard;
