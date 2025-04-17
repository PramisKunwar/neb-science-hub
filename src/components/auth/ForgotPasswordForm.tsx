import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <Link to="/login" className="flex items-center text-sm text-blue-500 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to login
        </Link>
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-center py-6">
            <h3 className="text-lg font-medium text-green-600 mb-2">
              Reset link sent!
            </h3>
            <p className="text-gray-600 mb-6">
              Check your email for instructions on how to reset your password.
            </p>
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium block mb-1.5">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 px-4"
              />
              <p className="text-sm text-gray-500 mt-2">
                We'll send a password reset link to this email address.
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium mt-4" 
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
