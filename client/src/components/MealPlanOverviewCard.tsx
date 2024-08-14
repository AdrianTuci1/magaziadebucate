import React from 'react';
import '../styles/mealplanoverview.scss'

interface MealPlan {
  id: string;
  name: string;
  days: number;
}

interface MealPlanOverviewCardProps {
  mealPlan: MealPlan;
  onViewClick: (id: string) => void;
  onEditClick: (id: string) => void;
  onRemoveClick: (id: string) => void;
}

const MealPlanOverviewCard: React.FC<MealPlanOverviewCardProps> = ({ mealPlan, onViewClick, onEditClick, onRemoveClick }) => {
  return (
    <div className="mealplan-overview-card">
      <img src="/path.png" alt="" style={{width:'50px'}} className='pathcrd'/>
      <div className="card-display">
      <h2>{mealPlan.name}</h2>
      <p>Zile: {mealPlan.days}</p>
      </div>
      <div className="card-buttons">
        <button onClick={() => onViewClick(mealPlan.id)}>
          <img src="/viewbtn.png" alt="view" style={{width:'50px'}} />
        </button>
        <button onClick={() => onEditClick(mealPlan.id)}>
          <img src="/editbtn.png" alt="view" style={{width:'50px'}} />
        </button>
        <button onClick={() => onRemoveClick(mealPlan.id)}>
        <img src="/removebtn.png" alt="view" style={{width:'50px'}} />
        </button>
      </div>
    </div>
  );
};

export default MealPlanOverviewCard;
