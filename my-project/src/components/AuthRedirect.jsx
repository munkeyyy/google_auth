import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the token from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Store the JWT in local storage or cookie
      localStorage.setItem('authToken', token);

      // Redirect to the dashboard or any other authenticated route
      navigate('/dashboard');
    } else {
      // Handle missing token (redirect to login, show error, etc.)
      navigate('/');
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthRedirect;
