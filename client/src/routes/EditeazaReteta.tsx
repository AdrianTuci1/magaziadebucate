import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeCardProps } from '../types/RecipeCardProps';
import RetetaForm from '../components/RetetaForm';
import '../styles/retetaform.scss';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

function EditeazaReteta() {
  const [recipeData, setRecipeData] = useState<RecipeCardProps | null>(null);
  const { recipeId } = useParams(); // Get recipe ID from URL

  const navigate = useNavigate();

  useEffect(() => {
    // Make an API request to get the recipe details based on the ID from useParams
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => setRecipeData(data))
      .catch((error) => console.error('Error loading recipe:', error));
  }, [recipeId]); // Dependency on recipeId

  const handleSubmit = async (formData: FormData) => {
    console.log('Submitting Recipe:');
    console.log('Recipe ID:', recipeId);
    try {
      const token = Cookies.get('auth_token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData, // Use FormData directly
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Handle successful response (e.g., show success message)
      console.log('Recipe submitted successfully!');
      toast('Reteta a fost editata cu succes!');
      navigate(-1)
    } catch (error) {
      toast("Nu a functionat!")
      console.error('Error submitting recipe:', error);
      navigate(-1)
    } finally {
      // Any cleanup or final actions
    }
  };

  return (
    <div className='adauga-content' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {recipeData ? (
        <RetetaForm initialData={recipeData} onSubmit={handleSubmit} />
      ) : (
        <p className="loading">Loading data...</p>
      )}
    </div>
  );
}

export default EditeazaReteta;
