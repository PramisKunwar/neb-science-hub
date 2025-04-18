
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Session, User, AuthError } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (password: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      setLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error.message);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Log successful authentication for monitoring
          if (session?.user) {
            console.info(`User authenticated: ${session.user.id}`);
          }
        }
      } catch (err) {
        console.error("Unexpected error during session retrieval:", err);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        // Log auth state change events
        console.info(`Auth state change: ${event}`);
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      console.info("Signup attempt:", { email });
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      });

      if (!error) {
        console.info("Signup successful, verification email sent", { email });
        
        toast.success("Verification email sent", {
          description: "Please check your email to verify your account."
        });
      } else {
        console.error("Signup failed:", error.message);
        
        toast.error("Registration failed", {
          description: error.message
        });
      }
      
      return { error };
    } catch (err) {
      const error = err as AuthError;
      console.error("Unexpected error during signup:", error);
      
      toast.error("Registration failed", {
        description: "An unexpected error occurred. Please try again."
      });
      
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.info("Login attempt:", { email });
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error) {
        console.info("Login successful", { email });
        
        toast.success("Login successful", {
          description: "Welcome back!"
        });
        navigate('/');
      } else {
        console.error("Login failed:", error.message);
        
        toast.error("Login failed", {
          description: error.message
        });
      }
      
      return { error };
    } catch (err) {
      const error = err as AuthError;
      console.error("Unexpected error during login:", error);
      
      toast.error("Login failed", {
        description: "An unexpected error occurred. Please try again."
      });
      
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      console.info("Google sign-in attempt");
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error("Google sign-in failed:", error.message);
        
        toast.error("Google sign-in failed", {
          description: error.message
        });
      } else {
        console.info("Google sign-in initiated successfully");
      }
    } catch (err) {
      console.error("Unexpected error during Google sign-in:", err);
      
      toast.error("Google sign-in failed", {
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const signInWithApple = async () => {
    setLoading(true);
    try {
      console.info("Apple sign-in attempt");
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error("Apple sign-in failed:", error.message);
        
        toast.error("Apple sign-in failed", {
          description: error.message
        });
      } else {
        console.info("Apple sign-in initiated successfully");
      }
    } catch (err) {
      console.error("Unexpected error during Apple sign-in:", err);
      
      toast.error("Apple sign-in failed", {
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.info("Sign out attempt");
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out failed:", error.message);
        
        toast.error("Sign out failed", {
          description: error.message
        });
        return;
      }
      
      console.info("Sign out successful");
      
      toast.success("Signed out successfully", {
        description: "You have been signed out of your account."
      });
      navigate('/');
    } catch (err) {
      const error = err as Error;
      console.error("Unexpected error during sign out:", error);
      
      toast.error("Sign out failed", {
        description: error.message || "An unexpected error occurred"
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.info("Password reset request:", { email });
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (!error) {
        console.info("Password reset email sent", { email });
        
        toast.success("Password reset email sent", {
          description: "Please check your email for the password reset link."
        });
      } else {
        console.error("Password reset failed:", error.message);
        
        toast.error("Password reset failed", {
          description: error.message
        });
      }
      
      return { error };
    } catch (err) {
      const error = err as AuthError;
      console.error("Unexpected error during password reset:", error);
      
      toast.error("Password reset failed", {
        description: "An unexpected error occurred. Please try again."
      });
      
      return { error };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      console.info("Password update attempt");
      
      const { error } = await supabase.auth.updateUser({ 
        password 
      });

      if (!error) {
        console.info("Password updated successfully");
        
        toast.success("Password updated", {
          description: "Your password has been updated successfully."
        });
        navigate('/login');
      } else {
        console.error("Password update failed:", error.message);
        
        toast.error("Password update failed", {
          description: error.message
        });
      }
      
      return { error };
    } catch (err) {
      const error = err as AuthError;
      console.error("Unexpected error during password update:", error);
      
      toast.error("Password update failed", {
        description: "An unexpected error occurred. Please try again."
      });
      
      return { error };
    }
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithApple,
    signOut,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
