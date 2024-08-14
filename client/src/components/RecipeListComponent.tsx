import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; // Adjust the import path as necessary
import ListRecipeCard from './ListRecipeCard'; // Import the new ListRecipeCard component
import { RecipeCardProps } from '../types/RecipeCardProps'; // Ensure the correct path
import InfoSectionComponent from './InfoSectionComponent';
import { Filters } from '../types/Filters';
import '../styles/maincontent.scss';
import { fetchRecipes } from '../redux/recipeService';

type RecipeListProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleFilters: () => void;
};

const RecipeListComponent: React.FC<RecipeListProps> = ({ filters, setFilters, toggleFilters }) => {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [isCardView, setIsCardView] = useState<boolean>(true);
  const [offset, setOffset] = useState(0);
  const limit = 30;

  const loadRecipes = async (offset: number, limit: number, filters: Filters) => {
    try {
      const fetchedRecipes = await fetchRecipes(offset, limit, filters);
      if (offset === 0) {
        setRecipes(fetchedRecipes);
      } else {
        setRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes]);
      }
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    loadRecipes(0, limit, filters); // Load initial recipes with filters
  }, [filters]);

  const loadMoreRecipes = async () => {
    loadRecipes(offset, limit, filters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortOption === 'price') return a.price - b.price;
    if (sortOption === 'cookingTime') return (parseInt(a.cookingTime, 10) + parseInt(a.prepTime, 10)) - (parseInt(b.cookingTime, 10) + parseInt(b.prepTime, 10));
    return 0;
  });

  const activeFilters = (Object.keys(filters) as (keyof Filters)[]).filter(key => {
    if (Array.isArray(filters[key])) {
      return (filters[key] as string[]).length > 0;
    }
    return filters[key] !== '' && filters[key] !== 120 && filters[key] !== null && filters[key] !== 'toate';
  });

  const removeFilter = (filterName: keyof Filters, filterValue?: string) => {
    if (filterName === 'price' || filterName === 'cookingTime') {
      setFilters({
        ...filters,
        [filterName]: filterName === 'price' ? null : 120,
      });
    } else if (filterName === 'options' || filterName === 'difficulty') {
      setFilters({
        ...filters,
        [filterName]: filters[filterName].filter((value: string) => value !== filterValue),
      });
    } else {
      setFilters({
        ...filters,
        [filterName]: '',
      });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      price: null,
      kitchen: '',
      cookingTime: 120,
      options: [],
      difficulty: [],
      type: 'toate',
    });
  };

  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  return (
    <div className="right-column">
      <InfoSectionComponent
        sortedRecipes={sortedRecipes}
        activeFilters={activeFilters}
        filters={filters}
        removeFilter={removeFilter}
        clearAllFilters={clearAllFilters}
        sortOption={sortOption}
        handleSortChange={handleSortChange}
        toggleFilters={toggleFilters}
        isCardView={isCardView}
        toggleView={toggleView}
      />
      <div className="outline-container">
        <div className={`card-container ${isCardView ? 'card-view' : 'list-view'}`}>
          {sortedRecipes.map(recipe => (
            isCardView ? (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ) : (
              <ListRecipeCard key={recipe.id} recipe={recipe} />
            )
          ))}
        </div>
      </div>
      <div className="load-more">
        <button onClick={loadMoreRecipes} className='maimult'>Mai mult</button>
      </div>
    </div>
  );
};

export default RecipeListComponent;
