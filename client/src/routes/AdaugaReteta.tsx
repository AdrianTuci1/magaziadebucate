
import RetetaForm from '../components/RetetaForm'
import { RecipeCardProps } from '../types/RecipeCardProps';
import '../styles/retetaform.scss'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdaugaReteta() {

  const navigate = useNavigate();

const initialRecipeData:RecipeCardProps = {
  id: '',
  title:       '', // Titlu
  imageUrl:   '', // Optional image URL
  cookingTime: '', // Time for cooking (timp preparare, timp gatit)
  prepTime:    '',
  type:        '', // Vegan/Pui/Porc/Peste
  options:     '', // Dimineata/Pranz/Seara/Gustare
  servings:    1, // Numar de portii
  difficulty:  'easy', // Difficulty level
  price:       1, // 1-4 $$$$
  kitchen:     'toate', // Romaneasca, Italiana, Spaniola...
  otherKitchen: '',
  ingredients: '', // 400gr Pui, 1/2 linguri sare, 1 ou
  steps: '', // se prajesc cartofii, se pune puiul pe grill
  likes:       0,
  views:       0,
  commentsCount:    0,
  author:      '',
  isPublic:    false,
  userId: '',
  approved: false,
}

  const handleSubmit = async (formData: FormData) => {

    try {
      const token = Cookies.get('auth_token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}` 
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Handle successful response (e.g., show success message)
      console.log('Recipe submitted successfully!');
      toast('Reteta a fost adaugata cu succes!');
      navigate(-1)
    } catch (error) {
      toast("Nu a functionat!")
      console.error('Error submitting recipe:', error);
      navigate(-1)
    } finally {

    }
  };
  return (
    <div className='adauga-content' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <RetetaForm onSubmit={handleSubmit} initialData={initialRecipeData}/>
    </div>
  )
}

export default AdaugaReteta
