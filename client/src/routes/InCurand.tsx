import React from 'react';
import '../styles/notauthenticated.scss';
import { useNavigate } from 'react-router-dom';

const InCurand: React.FC = () => {

  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/')
  };

  const handleViewPublicRecipes = () => {
    navigate('/retete')
  };

  return (
    <div className="non-authenticated-page">
      <div className="pluses"></div>
      <div className="content">
        <h1>Acest serviciu va fi disponibil in curand!</h1>
        <div className="buttons zap">
          <button className="btn btn-primary" onClick={handleViewPublicRecipes}>
            VEZI RETETELE PUBLICE
          </button>
          <button className="btn btn-secondary" onClick={handleCreateAccount}>
            INAPOI LA PAGINA PRINCIPALA
          </button>
        </div>
      </div>
      <div className="pluses"></div>
    </div>
  );
};

export default InCurand;