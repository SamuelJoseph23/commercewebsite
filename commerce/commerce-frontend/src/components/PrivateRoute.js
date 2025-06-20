import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();


  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;