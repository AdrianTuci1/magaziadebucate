import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  author: string;
}

const AdminApprovalTable: React.FC = () => {
  const [pendingApprovalRecipes, setPendingApprovalRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchPendingApprovalRecipes();
  }, []);

  const fetchPendingApprovalRecipes = async () => {
    const token = Cookies.get('auth_token');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/admin/pending`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setPendingApprovalRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes pending approval:', error);
    }
  };

  const handleApproveOrDeny = async (recipeId: number, approve: boolean) => {
    const token = Cookies.get('auth_token');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipeId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ approve })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Remove the approved/denied recipe from the list
      setPendingApprovalRecipes(prevRecipes =>
        prevRecipes.filter(recipe => recipe.id !== recipeId)
      );

      console.log(`Recipe ${approve ? 'approved' : 'denied'} successfully!`);
    } catch (error) {
      console.error(`Error ${approve ? 'approving' : 'denying'} recipe:`, error);
    }
  };

  return (
    <div>
      <h2>Recipes Pending Approval</h2>
      <table>
        <thead>
          <tr>
            <th style={{width: '100px'}}>Image</th>
            <th style={{width: '200px'}}>Name</th>
            <th>Author</th>
            <th>Actions</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {pendingApprovalRecipes.map(recipe => (
            <tr key={recipe.id}>
              <td><img src={recipe.imageUrl} alt={recipe.title} style={{ width: '50px' }} /></td>
              <td>{recipe.title}</td>
              <td>{recipe.author}</td>
              <td>
                <button onClick={() => handleApproveOrDeny(recipe.id, true)}>Approve</button>
                <button onClick={() => handleApproveOrDeny(recipe.id, false)}>Deny</button>
              </td>
              <td>
                <button onClick={() => window.location.href = `/recipe/${recipe.id}`}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminApprovalTable;
