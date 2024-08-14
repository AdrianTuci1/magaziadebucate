import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import FilterComponent from './FilterComponent';
import { Filters } from '../types/Filters';
import { useMediaQuery, useTheme } from '@mui/material';

type DrawerComponentProps = {
  showFilters: boolean;
  toggleFilters: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const DrawerComponent: React.FC<DrawerComponentProps> = ({ showFilters, toggleFilters, filters, setFilters }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return isSmallScreen ? (
    <Drawer
      anchor="bottom"
      open={showFilters}
      onClose={toggleFilters}
    >
      <Box
        sx={{ height: '50vh', width: 'auto', padding: '20px' }}
        role="presentation"
      >
        <FilterComponent showFilters={showFilters} toggleFilters={toggleFilters} filters={filters} setFilters={setFilters} />
      </Box>
    </Drawer>
  ) : null;
};

export default DrawerComponent;

