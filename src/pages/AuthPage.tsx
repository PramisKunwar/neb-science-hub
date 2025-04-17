import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AuthTabs } from "@/components/auth/AuthTabs";

export function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">NEB Science Hub</h1>
        <p className="text-gray-600 text-center">
          Your hub for learning and educational resources
        </p>
      </div>
      
      <AuthTabs />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-blue-500 hover:text-blue-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-500 hover:text-blue-700">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
} 