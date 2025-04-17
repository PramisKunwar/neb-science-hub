
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, LogOut, User } from "lucide-react";

export function AuthStatus() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return <Button variant="ghost" size="sm" disabled>Loading...</Button>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/profile">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => signOut()}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Link to="/login">
      <Button variant="ghost" size="sm" className="flex items-center gap-1">
        <LogIn className="h-4 w-4" />
        <span>Login</span>
      </Button>
    </Link>
  );
}
