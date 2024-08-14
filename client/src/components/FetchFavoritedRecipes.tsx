import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SmallRecipeCard, { RecipeCardProps } from './SmallRecipeCard';
import { getUserFavorites } from '../redux/favoriteService';
import { getAuthUser } from '../redux/storage';
import '../styles/fetchFavorited.scss'

const ItemType = 'RECIPE';

type FetchFavoritedRecipesProps = {
  onSelect: (recipes: (string | RecipeCardProps)[]) => void;
  initialSelectedRecipes?: (string | RecipeCardProps)[];
};

type DraggableRecipeProps = {
  recipe: string | RecipeCardProps;
  index: number;
  moveRecipe: (dragIndex: number, hoverIndex: number) => void;
  removeRecipe: (index: number) => void;
};

const DraggableRecipe: React.FC<DraggableRecipeProps> = ({ recipe, index, moveRecipe, removeRecipe }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveRecipe(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="selected-item">
      <button className="drag-handle butto">☰</button>
      {typeof recipe === 'string' ? (
        <div className="custom-text">
          {recipe}
        </div>
      ) : (
        <div className="recipe-card">
          <SmallRecipeCard recipe={recipe} />
        </div>
      )}
      <button onClick={() => removeRecipe(index)} className="remove-button butto">×</button>
    </div>
  );
};

const FetchFavoritedRecipes: React.FC<FetchFavoritedRecipesProps> = ({ onSelect, initialSelectedRecipes = [] }) => {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<(string | RecipeCardProps)[]>(initialSelectedRecipes);
  const [customText, setCustomText] = useState<string>('');

  useEffect(() => {
    const fetchRecipes = async () => {
      const user = getAuthUser();
      if (user) {
        const data = await getUserFavorites(user.id);
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, []);

  const handleSelect = (recipe: RecipeCardProps) => {
    setSelectedRecipes((prevSelected) => {
      if (prevSelected.some((r) => (typeof r === 'string' ? r === recipe.title : r.id === recipe.id))) {
        return prevSelected.filter((r) => (typeof r === 'string' ? r !== recipe.title : r.id !== recipe.id));
      } else if (prevSelected.length < 5) {
        return [...prevSelected, recipe];
      }
      return prevSelected;
    });
  };

  const handleAddCustomText = () => {
    if (customText.trim() && selectedRecipes.length < 5) {
      setSelectedRecipes([...selectedRecipes, customText.trim()]);
      setCustomText('');
    }
  };

  const handleRemoveSelected = (index: number) => {
    setSelectedRecipes(selectedRecipes.filter((_, i) => i !== index));
  };

  const moveRecipe = (dragIndex: number, hoverIndex: number) => {
    const dragRecipe = selectedRecipes[dragIndex];
    const updatedRecipes = [...selectedRecipes];
    updatedRecipes.splice(dragIndex, 1);
    updatedRecipes.splice(hoverIndex, 0, dragRecipe);
    setSelectedRecipes(updatedRecipes);
  };

  const handleSubmit = () => {
    onSelect(selectedRecipes);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>Selected Recipes</h2>
        <div className="selected-recipes">
          {selectedRecipes.map((recipe, index) => (
            <DraggableRecipe
              key={index}
              index={index}
              recipe={recipe}
              moveRecipe={moveRecipe}
              removeRecipe={handleRemoveSelected}
            />
          ))}
        </div>
        <h2>Favorited Recipes</h2>
        <div className="recipes-list">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <input
                type="checkbox"
                checked={selectedRecipes.some(r => typeof r === 'string' ? r === recipe.title : r.id === recipe.id)}
                onChange={() => handleSelect(recipe)}
                className="recipe-checkbox"
             />
              <SmallRecipeCard recipe={recipe} />
            </div>
          ))}
          <input
            type="text"
            placeholder="Add custom text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="custom-text-input"
          />
          <button onClick={handleAddCustomText} className="add-text-button">Add Text</button>
        </div>
        <button onClick={handleSubmit} className="submit-button">Add Selected Recipes</button>
      </div>
    </DndProvider>
  );
};

export default FetchFavoritedRecipes;


