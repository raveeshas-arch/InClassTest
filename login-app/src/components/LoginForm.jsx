import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Github } from 'lucide-react';
import { authService } from '../services/authService';

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
        // Backend not available, continue with frontend auth
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
    return (
      
      <Card className="w-full max-w-md mx-auto bg-black border border-yellow-400 text-white ">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-yellow-400">
            Welcome Back
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <img
            src={user.picture}
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto border-2 border-yellow-400"
          />

          <div>
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1">
              Logged in with {user.provider}
            </p>
          </div>

          <Button
            onClick={() => setUser(null)}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    );
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
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* GitHub Login */}
        <Button
          onClick={handleGithubLogin}
          className="w-full bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
        >
          <Github className="mr-2 h-4 w-4" />
          Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
