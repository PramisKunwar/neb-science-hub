
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { Helmet } from "react-helmet";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{isSignUp ? "Sign Up" : "Login"} | NEB Science Hub</title>
        <meta 
          name="description" 
          content="Access your personalized learning journey on NEB Science Hub with secure authentication." 
        />
      </Helmet>

      <Header />
      
      <main className="flex-1 bg-nebBackground">
        <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-secondary bg-nebBackground p-8 shadow-sm">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-nebText">
                {isSignUp ? "Create an Account" : "Welcome Back"}
              </h1>
              <p className="mt-2 text-nebText opacity-80">
                {isSignUp 
                  ? "Join NEB Science Hub to access exclusive content" 
                  : "Sign in to continue your learning journey"}
              </p>
            </div>
            
            <AuthForm 
              isSignUp={isSignUp} 
              toggleMode={() => setIsSignUp(!isSignUp)} 
            />
            
            <div className="mt-6 text-center text-sm text-nebText opacity-75">
              {isSignUp 
                ? "Already have an account?" 
                : "Don't have an account yet?"} 
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 font-medium text-nebPrimary hover:text-nebPrimary/80"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
