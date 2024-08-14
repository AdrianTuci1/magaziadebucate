import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import '../styles/retetapage.scss';
import { RecipeCardProps } from '../types/RecipeCardProps';

function RetetaPage() {
  const [recipeData, setRecipeData] = useState<RecipeCardProps | null>(null);
  const { recipeId } = useParams(); // Obține ID-ul rețetei din URL

  useEffect(() => {
    // Efectuați o solicitare API pentru a obține detaliile rețetei specifice
    // pe baza ID-ului din useParams
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => setRecipeData(data))
      .catch((error) => console.error('Eroare la încărcarea rețetei:', error));
  }, [recipeId]); // Depinde de recipeId


  return (
    <>
    {recipeData ? (
      <div className="sectiune_reteta" >
        <RecipeDetails recipe={recipeData}/>
      </div>
    ) : (
      <p className="loading">Incarcare reteta...</p>
    )}
    </>
  );
}

export default RetetaPage;
