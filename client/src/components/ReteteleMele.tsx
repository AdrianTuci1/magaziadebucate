import { RecipeCardProps } from "../types/RecipeCardProps";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import '../styles/retelemele.scss';
import ListRecipeCard from "./ListRecipeCard";
import fetchWrapper from "../redux/fetchWrapper";

interface RecipeListProps {}

function ReteteleMele({}: RecipeListProps) {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Optional for loading state
  const [error, setError] = useState<string | null>(null); // Optional for error handling

  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect called');

    const fetchData = async () => {
      console.log('fetchData called');
      setIsLoading(true);
      setError(null); // Reset error on each fetch
      const token = Cookies.get('auth_token');

      try {
        const response = await fetchWrapper(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/user/recipes`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }); // Replace with your server URL
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes'); // Set error message
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id: string | undefined) => {
    const recipeId = id;
    navigate(`/retete/edit/${recipeId}`);
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      const token = Cookies.get('auth_token');
      const recipeId = id;
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Reteta a fost stearsa cu succes!');
      } else {
        console.error('Eroare la stergerea retetei:', await response.text());
      }
    } catch (error) {
      console.error('Eroare la stergerea retetei:', error);
    }
  };


  return (
    <div>
      <div className="panne" style={{ display: 'flex' }}>
        <h2 className="retete-m">Retetele Mele</h2>
        <button style={{ width: '50px',height:'50px', cursor:'pointer', borderRadius:'10px', marginRight:'20px', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20px' }} onClick={() => navigate('/adauga')}><img src='/adauga.png' alt='adauga' style={{width:'40px'}}/></button>
      </div>
      <div className="recipe-container">
        {isLoading ? (
          <p>Loading recipes...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="card-containe list-view">
            {recipes.map((recipe) => (
              <ListRecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReteteleMele;


