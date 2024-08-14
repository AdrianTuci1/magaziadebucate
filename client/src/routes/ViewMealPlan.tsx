
import { useParams } from 'react-router-dom';
import MealPlanCarousel from '../components/MealPlanCarusel';

const ViewMealPlanPage = () => {
  const { id } = useParams<{ id: string }>(); // Assuming you're using React Router

  return (
    <div>
      <div className="mpc-wrapper" style={{marginTop:'50px'}}>
      <MealPlanCarousel mode="view" planId={id} />
      </div>
    </div>
  );
};

export default ViewMealPlanPage;
