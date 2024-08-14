import React, { useState } from 'react';
import Modal from 'react-modal';
import SmallRecipeCard, { RecipeCardProps } from './SmallRecipeCard';
import FetchFavoritedRecipes from './FetchFavoritedRecipes';

type MealPlan = {
  day: string;
  meals: (string | RecipeCardProps)[];
};

type MealPlanCardProps = {
  mealPlan: MealPlan;
  index: number;
  activeIndex: number;
  onCardClick: (index: number) => void;
  onRemoveCard: (index: number) => void;
  onInputChange: (index: number, type: 'meals', value: (string | RecipeCardProps)[]) => void;
  mode: 'create' | 'edit' | 'view'; // Add mode prop
};

const MealPlanCard: React.FC<MealPlanCardProps> = ({
  mealPlan,
  index,
  activeIndex,
  onCardClick,
  onRemoveCard,
  onInputChange,
  mode
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<(string | RecipeCardProps)[]>(mealPlan.meals);

  const handleModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleSelectRecipes = (selectedRecipes: (string | RecipeCardProps)[]) => {
    const updatedMeals = selectedRecipes.slice(0, 5);
    onInputChange(index, 'meals', updatedMeals);
    setSelectedRecipes(updatedMeals);
    handleModalClose();
  };

  const handleRemoveMeal = (mealIndex: number) => {
    const updatedMeals = mealPlan.meals.filter((_, i) => i !== mealIndex);
    onInputChange(index, 'meals', updatedMeals);
    setSelectedRecipes(updatedMeals);
  };

  const renderMeal = (meal: string | RecipeCardProps, mealIndex: number) => {
    if (typeof meal === 'string') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <span>{meal}</span>
          {mode !== 'view' && (
            <button onClick={() => handleRemoveMeal(mealIndex)} style={{ fontSize: '12px', width: '20px' }}>×</button>
          )}
        </div>
      );
    } else {
      return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <SmallRecipeCard recipe={meal} isClickable={false} />
          {mode !== 'view' && (
            <button onClick={() => handleRemoveMeal(mealIndex)} style={{ fontSize: '12px', width: '20px' }}>×</button>
          )}
        </div>
      );
    }
  };

  return (
    <div
      className={`card ${activeIndex === index ? 'active' : ''}`}
      onClick={() => onCardClick(index)}
      style={{ zIndex: activeIndex === index ? 1 : 0, width: '180px', height: '350px' }}
    >
      {mode !== 'view' && (
        <button
          className="remove-button"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveCard(index);
          }}
          style={{ fontSize: '20px', width: '20px' }}
        >
          ×
        </button>
      )}
      <h2>Ziua {mealPlan.day}</h2>
      {mode !== 'view' && (
        <button type="button" onClick={handleModalOpen} style={{ marginBottom: '5px' }}>
          Adauga retete
        </button>
      )}
      <Modal
        isOpen={showModal}
        onRequestClose={handleModalClose}
        contentLabel="Select Recipes"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button className="close-button" onClick={handleModalClose}>
          ×
        </button>
        <h2>Alege retete</h2>
        <FetchFavoritedRecipes onSelect={handleSelectRecipes} initialSelectedRecipes={selectedRecipes} />
      </Modal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {mealPlan.meals.map((meal, mealIndex) => (
          <div
            key={mealIndex}
            style={{
              height: '50px',
              marginBottom: '5px',
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}
          >
            {renderMeal(meal, mealIndex)}
          </div>
        ))}
        {[...Array(5 - mealPlan.meals.length)].map((_, idx) => (
          <div
            key={`placeholder-${idx}`}
            style={{
              height: '50px',
              marginBottom: '5px',
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f0f0f0',
              color: '#999',
            }}
          >
            <span>Reteta {mealPlan.meals.length + idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanCard;
