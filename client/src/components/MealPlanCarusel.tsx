import React, { useState, useRef, useEffect } from 'react';
import '../styles/mealplancarusel.scss';
import MealPlanCard from './MealPlanCard';
import { RecipeCardProps } from './SmallRecipeCard';
import alimentaryPlanService, { AlimentaryPlan } from '../redux/alimentaryPlanService';
import recipeService from '../redux/recipeService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type MealPlan = {
  day: string;
  meals: (string | RecipeCardProps)[];
  nutrition: { carbs: number; protein: number; calories: number };
};

interface MealPlanCarouselProps {
  mode: 'create' | 'edit' | 'view';
  planId?: string; // Only required for edit/view modes
}

const MealPlanCarousel: React.FC<MealPlanCarouselProps> = ({ mode, planId }) => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mealPlanName, setMealPlanName] = useState<string>('');
  const [isNameSet, setIsNameSet] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate()

  useEffect(() => {
    if (mode !== 'create' && planId) {
      // Fetch the meal plan if editing or viewing
      const fetchMealPlan = async () => {
        try {
          const plan = await alimentaryPlanService.getPlan(planId);
          setMealPlanName(plan.name);

          const enrichedCards = await Promise.all(plan.cards.map(async (card: any) => {
            const meals = await Promise.all(card.lines.map(async (line: any) => {
              if (typeof line === 'string') {
                return line;
              } else {
                const recipe = await recipeService.getRecipe(line.id);
                return recipe;
              }
            }));
            return { ...card, meals };
          }));

          setMealPlans(enrichedCards);
        } catch (error) {
          console.error('Error fetching meal plan:', error);
        }
      };

      fetchMealPlan();
    }
  }, [mode, planId]);

  const handleAddCard = () => {
    if (mealPlans.length < 7) {
      const newPlans = [
        ...mealPlans,
        { day: `${mealPlans.length + 1}`, meals: [], nutrition: { carbs: 0, protein: 0, calories: 0 } },
      ];
      setMealPlans(newPlans);
      setActiveIndex(newPlans.length - 1); // Set active index to the new card
    }
  };

  const handleInputChange = (index: number, type: 'meals', value: (string | RecipeCardProps)[]) => {
    const newMealPlans = [...mealPlans];
    if (type === 'meals') {
      newMealPlans[index].meals = value;
    } else if (type === 'nutrition') {
      newMealPlans[index].nutrition = { ...newMealPlans[index].nutrition, ...value };
    }
    setMealPlans(newMealPlans);
  };

  const handleRemoveCard = (index: number) => {
    const newMealPlans = mealPlans.filter((_, i) => i !== index);
    setMealPlans(newMealPlans);
    setActiveIndex(Math.max(0, newMealPlans.length - 1));
  };

  const handleSaveMealPlan = async () => {
    const mealPlanData: AlimentaryPlan = {
      name: mealPlanName,
      isShared: false,
      cards: mealPlans.map((plan, index) => ({
        day: index + 1,
        lines: plan.meals.map((meal) => {
          if (typeof meal === 'string') {
            return meal;
          } else {
            return { id: meal.id }; // Only save the recipe ID
          }
        })
      }))
    };

    try {
      let response;
      if (mode === 'create') {
        response = await alimentaryPlanService.createPlan(mealPlanData);
      } else if (mode === 'edit' && planId) {
        response = await alimentaryPlanService.updatePlan(planId, mealPlanData);
      }
      console.log('Meal Plan Saved:', response);
      toast('Ai salvat cu succes planul!')
      navigate(-1)
    } catch (error) {
      toast('A aparut o problema.')
      console.error('Failed to save meal plan:', error);
    }
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length > 0) {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const cardWidth = container.children[activeIndex]?.getBoundingClientRect().width || 0;
      const activeCard = container.children[activeIndex] as HTMLElement;

      if (activeCard) {
        const scrollPosition = activeCard.offsetLeft - (containerWidth / 2 - cardWidth / 2) + (containerWidth / 2 - cardWidth / 2);
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [activeIndex, mealPlans.length]);

  const renderCards = () => {
    const cardsToRender = [];
    const startIndex = activeIndex > 0 ? activeIndex - 1 : 0;
    const endIndex = Math.min(mealPlans.length, activeIndex + 2);

    for (let i = startIndex; i < endIndex; i++) {
      if (mealPlans[i]) {
        cardsToRender.push(
          <MealPlanCard
            key={i}
            mealPlan={mealPlans[i]}
            index={i}
            activeIndex={activeIndex}
            onCardClick={handleCardClick}
            onRemoveCard={handleRemoveCard}
            onInputChange={handleInputChange}
            mode={mode} // Pass mode to MealPlanCard
          />
        );
      }
    }

    return cardsToRender;
  };

  const handleSetName = () => {
    if (mealPlanName.trim()) {
      setIsNameSet(true);
    }
  };

  return (
    <div className="appcarusel">
      {mode === 'create' && !isNameSet ? (
        <div className="set-name-container">
          <h2>INTRODU NUMELE PLANULUI</h2>
          <input
            type="text"
            value={mealPlanName}
            onChange={(e) => setMealPlanName(e.target.value)}
            placeholder="Titlu"
          />
          <button onClick={handleSetName}>URMATORUL PAS</button>
        </div>
      ) : (
        <div className="meal-plan-carousel">
          <div className="set-name-container">
            {mode === 'view' ? <h2 className='mpn'>{mealPlanName}</h2> : (
              <input
                type="text"
                value={mealPlanName}
                onChange={(e) => setMealPlanName(e.target.value)}
                placeholder="Titlu"
                style={{display:'none'}}
              />
            )}
          </div>
          <div className="cards-container-wrapper">
            <div className={`cards-container ${activeIndex === 0 ? 'offset-right' : ''} ${mode === 'view' && activeIndex === mealPlans.length - 1 ? 'offset-left' : ''}`} ref={containerRef}>
              {renderCards()}
              {/* Conditionally render the "+" card */}
              {mode !== 'view' && (mealPlans.length === 0 || activeIndex === mealPlans.length - 1) ? (
                <div className={`card add-card ${activeIndex >= mealPlans.length - 1 ? 'visible' : ''}`} key="add-card" onClick={handleAddCard}>
                  <span>+</span>
                </div>
              ) : null}
            </div>
          </div>
          {mode !== 'view' && mealPlans.length > 0 && (
            <div className="btn-wrap">
              <button className="save-button" onClick={handleSaveMealPlan}>
                SALVEAZA PLANUL
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MealPlanCarousel;
