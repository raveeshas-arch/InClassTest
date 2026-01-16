import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoginForm />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
