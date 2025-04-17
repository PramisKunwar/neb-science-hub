import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";

interface LoginFormProps {
  sharedEmail?: string;
  onEmailChange?: (email: string) => void;
}

export function LoginForm({ sharedEmail = "", onEmailChange }: LoginFormProps) {
  const [email, setEmail] = useState(sharedEmail);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();

  // Update local email when shared email changes
  useEffect(() => {
    setEmail(sharedEmail);
  }, [sharedEmail]);

  // Update shared email state when local email changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (onEmailChange) {
      onEmailChange(newEmail);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      // Google sign-in redirects, so this may not execute
      setIsGoogleLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium block mb-1.5">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="h-11 px-4" // 44px height for better touch targets
              placeholder="Enter your email address"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1.5">
              <Label htmlFor="password" className="text-base font-medium">
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 px-4" // 44px height for better touch targets
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 border rounded"
            />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
              Remember me
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-11 text-base font-medium" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 absolute w-full"></div>
            <div className="bg-white px-4 z-10 text-sm text-gray-500">OR</div>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-11 flex items-center justify-center space-x-2"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            <FaGoogle className="h-5 w-5" />
            <span>{isGoogleLoading ? "Connecting..." : "Continue with Google"}</span>
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center pt-6 pb-0 px-0">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700 font-medium">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

