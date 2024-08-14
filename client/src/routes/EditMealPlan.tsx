import { useParams } from 'react-router-dom';
import MealPlanCarousel from '../components/MealPlanCarusel';

const EditMealPlanPage = () => {
  const { id } = useParams<{ id: string }>(); // Assuming you're using React Router

  return (
    <div>
      <h2>Mod de editare:</h2>
      <MealPlanCarousel mode="edit" planId={id} />
    </div>
  );
};

export default EditMealPlanPage;
