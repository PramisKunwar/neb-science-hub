import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Extract the hash from the URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    const errorDescription = hashParams.get('error_description');

    const handleCallback = async () => {
      if (errorDescription) {
        setError(errorDescription);
        toast({
          variant: "destructive",
          title: "Authentication error",
          description: errorDescription
        });
        navigate('/login');
        return;
      }

      if (accessToken && refreshToken) {
        // Exchange the access token for a session
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });

        if (error) {
          setError(error.message);
          toast({
            variant: "destructive",
            title: "Authentication error",
            description: error.message
          });
          navigate('/login');
          return;
        }

        // Success
        toast({
          title: "Successfully signed in",
          description: "You have been successfully signed in with Google"
        });
        navigate('/');
      } else {
        // Check if we're returning from a Supabase OAuth flow
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setError(error.message);
          toast({
            variant: "destructive",
            title: "Authentication error",
            description: error.message
          });
          navigate('/login');
          return;
        }

        if (data?.session) {
          toast({
            title: "Successfully signed in",
            description: "You have been successfully signed in with Google"
          });
          navigate('/');
        } else {
          navigate('/login');
        }
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="text-2xl font-bold">Processing authentication...</h1>
        {error ? (
          <div className="text-red-500">
            <p>There was an error authenticating your account: {error}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Back to login
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Please wait while we complete the authentication process...</p>
          </div>
        )}
      </div>
    </div>
  );
} 