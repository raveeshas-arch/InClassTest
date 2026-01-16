import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const UserDetailCard = ({ user, onLogout }) => {
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
          onClick={onLogout}
          className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserDetailCard;