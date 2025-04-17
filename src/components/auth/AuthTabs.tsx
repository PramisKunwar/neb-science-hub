import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [email, setEmail] = useState<string>("");
  
  // Shared email state between forms for seamless switching
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="login" className="text-base py-3">Login</TabsTrigger>
          <TabsTrigger value="register" className="text-base py-3">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm sharedEmail={email} onEmailChange={handleEmailChange} />
        </TabsContent>
        
        <TabsContent value="register">
          <RegisterForm sharedEmail={email} onEmailChange={handleEmailChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 