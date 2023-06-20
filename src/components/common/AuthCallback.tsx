import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AuthCallback = () => {
  useEffect(() => {
    console.log(123);
  }, []);

  return <Navigate to={'/'} />;
};

export default AuthCallback;
