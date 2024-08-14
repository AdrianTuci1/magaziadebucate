import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  const { isAuthenticated, roles, loading, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  console.log(token)
  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  const hasRequiredRole = requiredRoles ? requiredRoles.some(role => roles.includes(role)) : true;

  console.log('Is authenticated:', isAuthenticated);
  console.log('User roles:', roles);
  console.log('Has required role:', hasRequiredRole);
  console.log('Required roles for this route:', requiredRoles);

  if(!isAuthenticated) {
    return <Navigate to="/not-authenticated" state={{ from: location }}/>
  }

  if (!isAuthenticated || !hasRequiredRole) {
    return <Navigate to="/not-authorized" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
