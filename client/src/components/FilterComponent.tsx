import React, { useState } from 'react';
import { Filters } from '../types/Filters';

type FilterProps = {
  showFilters: boolean;
  toggleFilters: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const FilterComponent: React.FC<FilterProps> = ({ showFilters, toggleFilters, filters, setFilters }) => {

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const checked = (e.target as HTMLInputElement).checked;
      setFilters({
        ...filters,
        price: checked ? parseInt(value) : null,
      });
    } else if (name === 'options' || name === 'difficulty') {
      const checked = (e.target as HTMLInputElement).checked;
      setFilters({
        ...filters,
        [name]: checked
          ? [...filters[name as 'options' | 'difficulty'], value]
          : filters[name as 'options' | 'difficulty'].filter(option => option !== value),
      });
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  const handleTypeChange = (type: string) => {
    setFilters({
      ...filters,
      type,
    });
    setSelectedType(type);
  };

  const [selectedType, setSelectedType] = useState('toate');

  const getDifficultyImage = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '/easy.png';
      case 'medium':
        return '/medium.png';
      case 'hard':
        return '/hard.png';
      default:
        return '';
    }
  };


  return (
    <div className="filters-container">
      <div>
        <label>Tip:</label>
        <ul className='fil-type ule'>
          {['toate', 'fel principal', 'salate', 'supe', 'gustare', 'sushi', 'desert'].map(type => (
            <li 
            key={type} 
            onClick={() => handleTypeChange(type)}
            className={`type-item ${selectedType === type ? 'selected' : ''}`}
            style={{cursor:'pointer'}}
            >
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>Pret:</label>
        <ul className='ule'>
          {[1, 2, 3, 4].map(price => (
            <li 
            key={price}
            >
              <input
                type="checkbox"
                name="price"
                value={price}
                checked={filters.price === price}
                onChange={handleFilterChange}
                style={{width:'20px'}}
              />
              {Array(price).fill(null).map((_, index) => (
              <img
                key={index}
                src="/price.png"
                alt="$"
                className="dollar-image"
                style={{width:'20px'}}
              />
            ))}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>Bucatarie:</label>
        <select name="kitchen" value={filters.kitchen} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Spanish">Spanish</option>
          <option value="Russian">Russian</option>
        </select>
      </div>
      <div>
        <label>Timp de gatit (minute):</label>
        <input type="range" name="cookingTime" min="10" max="120" step="5" value={filters.cookingTime} onChange={handleFilterChange} />
        <div>{filters.cookingTime} minutes</div>
      </div>
      <div>
        <label>Optiuni:</label>
        <div style={{ maxHeight: '200px', overflowY: 'scroll'}}>
          {['Traditional', 'Balanced', 'Vegan', 'High-Protein'].map(option => (
            <div 
            key={option}
            >
              <input
                type="checkbox"
                name="options"
                value={option}
                checked={filters.options.includes(option)}
                onChange={handleFilterChange}
                style={{width:'20px'}}
              />
              {option}
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Dificultate:</label>
        <div style={{ maxHeight: '200px', overflowY: 'scroll', paddingBottom:'50px' }}>
          {['easy', 'medium', 'hard'].map(difficulty => (
            <div key={difficulty}>
              <input
                type="checkbox"
                name="difficulty"
                value={difficulty}
                checked={filters.difficulty.includes(difficulty)}
                onChange={handleFilterChange}
                style={{width:'20px'}}
              />
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              <img
              src={getDifficultyImage(difficulty)}
              alt={difficulty}
              className="difficulty-image"
              style={{width:'25px'}}
              />
            </div>
          ))}
        </div>
      </div>
      <button className="toggle-filters-btn" onClick={toggleFilters}>
        {showFilters ? 'Ascunde Filtrele' : 'Show Filters'}
      </button>
    </div>
  );
};

export default FilterComponent;



