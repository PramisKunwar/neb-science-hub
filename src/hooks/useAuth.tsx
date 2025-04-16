
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from 'lucide-react';
import { checkSessionTimeout, pingSession } from '@/lib/supabase';

// Define the auth context type
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to handle sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  useEffect(() => {
    // Set up activity tracking for session timeout
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const handleUserActivity = () => pingSession();
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Check for session timeout every minute
    const sessionChecker = setInterval(() => {
      const isTimedOut = checkSessionTimeout();
      if (isTimedOut && user) {
        // Session timed out, redirect to login
        navigate('/auth');
      }
    }, 60000);

    return () => {
      // Clean up event listeners
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearInterval(sessionChecker);
    };
  }, [user, navigate]);

  useEffect(() => {
    // Set up auth state listener first (critical for auth state changes)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // Use setTimeout to prevent potential deadlock with Supabase client
        setTimeout(() => {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Handle auth state changes
          if (event === 'SIGNED_IN') {
            navigate('/');
          } else if (event === 'SIGNED_OUT') {
            navigate('/auth');
          }
        }, 0);
      }
    );

    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (error) {
        console.error("Auth session error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route component with enhanced security
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-gray-700">Loading your secure session...</p>
      </div>
    );
  }

  // Session timeout check
  const isTimedOut = checkSessionTimeout();
  if (isTimedOut) {
    return (
      <div className="max-w-md mx-auto my-8">
        <Alert variant="destructive">
          <AlertTitle>Session expired</AlertTitle>
          <p>Your session has expired due to inactivity. Please sign in again.</p>
        </Alert>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default useAuth;
