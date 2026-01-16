import { Button } from './ui/button';
import { Github } from 'lucide-react';

const GitHubLoginButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
    >
      <Github className="mr-2 h-4 w-4" />
      Sign in with GitHub
    </Button>
  );
};

export default GitHubLoginButton;