import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { signInWithEmail, signInWithMagicLink, signUpWithEmail } from '../../lib/supabase';
import { AlertCircle, Loader2, Eye, EyeOff, Mail } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthFormProps {
  isSignUp: boolean;
  toggleMode: () => void;
}

const AuthForm = ({ isSignUp, toggleMode }: AuthFormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'magic-link'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear any previous messages when user changes input
    if (message) setMessage(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Clear any previous messages when user changes input
    if (message) setMessage(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await signUpWithEmail(email, password);
        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({ type: 'success', text: 'Check your email for a confirmation link!' });
        }
      } else {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({ type: 'success', text: 'Signed in successfully!' });
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred. Please try again.' 
      });
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await signInWithMagicLink(email);
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Check your email for the login link!' });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred. Please try again.' 
      });
      console.error('Magic link error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Welcome to NEB Science Hub</CardTitle>
        <CardDescription className="text-center">
          Sign in or create an account to access study materials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin" className="w-full" onValueChange={(value) => setAuthMode(value as any)}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleAuth}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={handleEmailChange}
                      required
                      disabled={loading}
                      className="w-full pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      disabled={loading}
                      className="w-full pr-10"
                      minLength={isSignUp ? 8 : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {isSignUp && (
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading || !email || !password}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleAuth}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="email-signup" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={handleEmailChange}
                      required
                      disabled={loading}
                      className="w-full pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <div className="relative">
                    <Input
                      id="password-signup"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      disabled={loading}
                      className="w-full pr-10"
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading || !email || !password || password.length < 8}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="magic-link">
            <form onSubmit={(e) => { e.preventDefault(); handleMagicLink(); }}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-magic">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="email-magic" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={handleEmailChange}
                      required
                      disabled={loading}
                      className="w-full pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    We'll send you a magic link to sign in instantly
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading || !email}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    'Send Magic Link'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
        
        {message && (
          <div className={`mt-4 p-3 rounded-md ${
            message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
          }`}>
            <div className="flex items-center">
              {message.type === 'error' && (
                <AlertCircle className="h-4 w-4 mr-2" />
              )}
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-gray-500 text-center">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm; 