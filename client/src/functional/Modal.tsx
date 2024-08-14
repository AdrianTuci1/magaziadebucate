import React from "react";

interface DropdownProps {
    label: string; // Label for the dropdown
    children: React.ReactNode; // The component to render inside the dropdown
  }
  
  const Dropdown: React.FunctionComponent<DropdownProps> = ({ label, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
  
    const handleClick = () => setIsOpen(!isOpen);
  
    return (
      <div className="dropdown">
        <button onClick={handleClick}>{label}</button>
        {isOpen && (
          <div className="dropdown-content">
            {children}
          </div>
        )}
      </div>
    );
  };
  
  export default Dropdown;
  