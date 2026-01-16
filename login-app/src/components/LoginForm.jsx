import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { authService } from '../services/authService';
import UserDetailCard from './UserDetailCard';
import GoogleLoginButton from './GoogleLoginButton';
import GitHubLoginButton from './GitHubLoginButton';
import ErrorMessage from './ErrorMessage';
import LoginDivider from './LoginDivider';

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) handleGithubCallback(code);
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError(null);
      
      const decoded = JSON.parse(
        atob(credentialResponse.credential.split('.')[1])
      );

      setUser({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        provider: 'Google',
      });

      try {
        const backendResponse = await authService.googleAuth(
          credentialResponse.credential
        );
        console.log('Backend Response:', backendResponse);
      } catch (backendError) {
        setError('Backend server required for Google authentication.');
      }
    } catch (err) {
      setError('Google authentication failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google login was cancelled or failed.');
  };

  const handleGithubLogin = () => {
    setError(null);
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = window.location.origin;

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  };

  const handleGithubCallback = async (code) => {
    try {
      setError(null);
      
      try {
        const backendResponse = await authService.githubAuth(code);
        
        setUser({
          name: backendResponse.name || backendResponse.login,
          email: backendResponse.email,
          picture: backendResponse.avatar_url,
          provider: 'GitHub',
        });
      } catch (backendError) {
        setError('Backend server required for GitHub authentication.');
      }

      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      setError('GitHub authentication failed. Please try again.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  if (user) {
    return <UserDetailCard user={user} onLogout={() => setUser(null)} />;
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-black border border-yellow-400 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-yellow-400">
          Sign In
        </CardTitle>
        <p className="text-center text-gray-400 text-sm">
          Access your account securely
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <ErrorMessage error={error} />
        <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        <LoginDivider />
        <GitHubLoginButton onClick={handleGithubLogin} />
      </CardContent>
    </Card>
  );
};

export default LoginForm;
