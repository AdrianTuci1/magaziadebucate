import { useState } from "react";

// Interface for FoodCategory
interface FoodCategory {
    value: string;
    label: string;
  }
  
  // Tab Component with type annotations
const Tab: React.FC<{ label: string; isSelected: boolean; onClick: (label: string) => void }> = ({
    label,
    isSelected,
    onClick,
  }) => {
    const handleClick = () => {
      onClick(label);
    };
  
    return (
      <button
        type="button"
        className={`tab ${isSelected ? 'selected' : ''}`}
        onClick={handleClick}
      >
        {label}
      </button>
    );
  };
  
  // Tabs Component with type annotations
const Tabs: React.FC<{ options: FoodCategory[]; onSelect?: (selectedTab: string) => void }> = ({
    options,
    onSelect, // Optional prop for handling selection
  }) => {
    const [selectedTab, setSelectedTab] = useState<string>('all'); // Initial selection
  
    const handleTabClick = (label: string) => {
      setSelectedTab(label);
      onSelect?.(label); // Call onSelect if provided
    };

    return (
      <div className="tabs" style={{display: 'flex'}}>
        {options.map((category) => (
          <Tab
            key={category.value}
            label={category.label}
            isSelected={category.label === selectedTab}
            onClick={handleTabClick}
          />
        ))}
      </div>
    );
  };
  
  export default Tabs;
  
  
  