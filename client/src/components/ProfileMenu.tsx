import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/profileMenu.scss';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    { label: 'RETETELE MELE', path: 'retete' },
    { label: 'PLAN ALIMENTAR', path: 'plan' },
    { label: 'FAVORITE', path: 'favorite' },
    { label: 'STATISTICI', path: 'statistici' },
    { label: 'MENIU DIGITAL', path: 'meniudigital' },
    // Add more items for different sections
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pannel">
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <ul className={`options ${isOpen ? 'open' : ''}`}>
        {sidebarItems.map((item) => (
          <li key={item.label}>
            <NavLink to={item.path}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;
