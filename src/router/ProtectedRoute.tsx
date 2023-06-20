import useAuth from '../hooks/useAuth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { authUser } = useAuth();

  if (authUser.isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
