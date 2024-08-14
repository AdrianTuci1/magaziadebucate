import '../styles/recipecard.scss'
import { useNavigate } from 'react-router-dom';
import { Clock2 } from 'lucide-react';
import { RecipeCardProps } from '../types/RecipeCardProps';



function RecipeCard({ recipe }: { recipe: RecipeCardProps}) {
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
    switch (difficulty.toLowerCase()) {
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
    <div className="card">
      <div className="content">
      <div className="image-container">
        <img className="recipe-image" src={imageUrl || ''} alt="" />
        <img className="overlay-image" src={overlayImage} alt="Option icon" />
      </div>
      <div className="description-container">
        <p className="likes"><img src="/hearta.png" alt="" style={{width:'25px'}}/>{recipe.likes}</p>
        <h2 className='recipe-title'>{recipe.title}</h2>
        <div className="icons-container">
          <p className="time"><Clock2 style={{width:'30px'}}/>{totalTime} min</p>
          <p className="serving"><img src="/person.png" alt="" style={{width:'25px'}}/>{recipe.servings} pers.</p>
          <p className="dificulty"><img src={difficultyLevel} alt="" style={{width:'30px'}}/></p>
        </div>
        <button className="view-button" onClick={() => handleRecipeClick(recipe.id)}>
          VEZI RETETA
        </button>
      </div>
      </div>
    </div>
  );
}

export default RecipeCard;
