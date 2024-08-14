import React, { useState } from 'react';
import RecipeListComponent from '../components/RecipeListComponent';
import DrawerComponent from '../components/DrawerComponent';
import FilterComponent from '../components/FilterComponent';
import { Filters } from '../types/Filters';
import '../styles/maincontent.scss';
import { useMediaQuery, useTheme } from '@mui/material';

const MainContent: React.FC = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    price: null,
    kitchen: '',
    cookingTime: 120,
    options: [],
    difficulty: [],
    type: 'toate',
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="recipes-page">
      {!isSmallScreen && (
        <div className="left-column">
          <FilterComponent showFilters={true} toggleFilters={toggleFilters} filters={filters} setFilters={setFilters} />
        </div>
      )}
      <RecipeListComponent filters={filters} setFilters={setFilters} toggleFilters={toggleFilters} />
      {isSmallScreen && (
        <DrawerComponent showFilters={showFilters} toggleFilters={toggleFilters} filters={filters} setFilters={setFilters} />
      )}
    </div>
  );
};

export default MainContent;

