import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MealPlanCarousel from '../components/MealPlanCarusel';
import '../styles/mealplans.scss'; // Ensure this path is correct for your project structure
import alimentaryPlanService from '../redux/alimentaryPlanService';
import MealPlanOverviewCard from '../components/MealPlanOverviewCard';
import toast from 'react-hot-toast';

interface MealPlan {
  id: string;
  name: string;
  days: number;
}

const MealPlansTable: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [showCarousel, setShowCarousel] = useState<boolean>(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const data = await alimentaryPlanService.getUserPlans();
        setMealPlans(data);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      }
    };

    fetchMealPlans();
  }, []);

  const handleViewClick = (id: string) => {
    navigate(`/plan-alimentar/${id}`);
  };

  const handleEditClick = (id: string) => {
    navigate(`/plan-alimentar/${id}/edit`);
  };

  const handleRemoveClick = async (id: string) => {
    try {
      await alimentaryPlanService.removePlan(id);
      console.log('Meal plan removed successfully');
      toast(`Ai sters cu succes planul!`)
      // Update the state to reflect the removed plan
      setMealPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
    } catch (error) {
      console.error('Failed to remove meal plan:', error);
    }
  };

  const handleAddMealPlan = () => {
    setShowCarousel(true);
  };

  if (showCarousel || mealPlans.length === 0) {
    return <MealPlanCarousel mode="create"/>;
  }

  return (
    <div className="mealplans-table-container">
      <div className="mealplans-wrapper">
      <div className="mealplans-title">
      <h1>VEZI PLANURILE ALIMENTARE</h1>
      </div>
      <button className="add-mealplan-button" onClick={handleAddMealPlan}>
        Adauga un Plan
      </button>
      <div className="mealplans-cards">
          {mealPlans.map((mealPlan) => (
            <MealPlanOverviewCard
              key={mealPlan.id}
              mealPlan={mealPlan}
              onViewClick={handleViewClick}
              onEditClick={handleEditClick}
              onRemoveClick={handleRemoveClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlansTable;
