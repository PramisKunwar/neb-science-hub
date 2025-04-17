import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookmarkIcon, Settings, Info, Check, AlertCircle, HelpCircle, BookmarkPlus } from "lucide-react";
import { AvatarUpload } from "./AvatarUpload";
import { ProfileBookmarks } from "@/components/ProfileBookmarks";
import { ProfileNavbar } from "./ProfileNavbar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Profile = {
  username: string;
  full_name: string;
  avatar_url: string;
};

export function UserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [bookmarkCount, setBookmarkCount] = useState<number | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  // Form validation states
  const [usernameValid, setUsernameValid] = useState(true);
  const [fullNameValid, setFullNameValid] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("username, full_name, avatar_url")
          .eq("id", user.id)
          .single();
          
        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (data) {
          setProfile(data);
          setFullName(data.full_name || "");
          setUsername(data.username || "");
          setAvatarUrl(data.avatar_url || "");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfile();
  }, [user]);
  
  // Hide success alert after 5 seconds
  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);
  
  // Validate username
  const validateUsername = (value: string) => {
    if (!value.trim()) {
      setUsernameValid(false);
      setUsernameError("Username is required");
      return false;
    } else if (value.length < 3) {
      setUsernameValid(false);
      setUsernameError("Username must be at least 3 characters");
      return false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameValid(false);
      setUsernameError("Only letters, numbers and underscore allowed");
      return false;
    }
    setUsernameValid(true);
    setUsernameError("");
    return true;
  };
  
  // Validate full name
  const validateFullName = (value: string) => {
    if (!value.trim()) {
      setFullNameValid(false);
      setFullNameError("Full name is required");
      return false;
    } else if (value.length < 2) {
      setFullNameValid(false);
      setFullNameError("Name must be at least 2 characters");
      return false;
    }
    setFullNameValid(true);
    setFullNameError("");
    return true;
  };

  async function updateProfile() {
    if (!user) return;
    
    // Validate form fields
    const isUsernameValid = validateUsername(username);
    const isFullNameValid = validateFullName(fullName);
    
    if (!isUsernameValid || !isFullNameValid) {
      return;
    }
    
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      
      if (error) {
        toast.error("Update failed", {
          description: error.message,
        });
      } else {
        // Show success toast
        toast.success("Profile updated", {
          description: "Your profile has been updated successfully.",
        });
        
        // Show inline success alert
        setShowSuccessAlert(true);
        
        // Update local state
        setProfile(prev => prev ? { ...prev, username, full_name: fullName } : null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Update failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setUpdating(false);
    }
  }

  // Handler for avatar upload
  const handleAvatarUpload = (url: string) => {
    setAvatarUrl(url);
    setProfile(prev => prev ? { ...prev, avatar_url: url } : null);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ProfileNavbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        username={username}
        fullName={fullName}
        avatarUrl={avatarUrl}
      />

      <div className="flex-1 container mx-auto py-6 px-6 lg:px-8">
        <div className="w-full max-w-[800px] mx-auto">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile</h1>
              
              {showSuccessAlert && (
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900 text-green-800 dark:text-green-300 mb-6">
                  <Check className="h-5 w-5" />
                  <AlertTitle>Profile updated successfully!</AlertTitle>
                  <AlertDescription>
                    Your changes have been saved. They will be reflected across the platform.
                  </AlertDescription>
                </Alert>
              )}
              
              <Card className="w-full transition-shadow hover:shadow-md shadow-sm bg-white dark:bg-gray-800">
                <CardHeader className="pb-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <AvatarUpload 
                      url={avatarUrl} 
                      onUpload={handleAvatarUpload}
                      size="lg"
                      displayName={fullName || username || user?.email || ""}
                    />
                    <div className="text-center sm:text-left">
                      <CardTitle className="text-xl md:text-2xl font-bold">Update Your Profile</CardTitle>
                      <CardDescription className="mt-1 text-gray-600 dark:text-gray-300">
                        Customize how you appear across the platform
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="bg-gray-50 dark:bg-gray-700 w-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-describedby="email-hint"
                      />
                      <div className="flex items-start gap-1.5 mt-1.5">
                        <Info className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-gray-600 dark:text-gray-300" id="email-hint">
                          Email cannot be changed as it's used for account verification and security
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="link" className="h-auto p-0 ml-1 text-primary underline text-sm font-semibold" aria-label="Learn why email cannot be changed">
                                  <span className="flex items-center gap-1">
                                    Learn why <HelpCircle className="h-3.5 w-3.5" />
                                  </span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                Your email is your unique identifier and is needed for account recovery and security notifications.
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username" className="font-medium">Username</Label>
                      <div className="relative">
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            validateUsername(e.target.value);
                          }}
                          placeholder="Choose a username (e.g., john_doe123)"
                          className={`w-full pr-8 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${!usernameValid ? 'border-destructive' : ''} placeholder:text-gray-500 dark:placeholder:text-gray-400`}
                          aria-invalid={!usernameValid}
                          aria-describedby="username-hint"
                          onBlur={(e) => validateUsername(e.target.value)}
                        />
                        {username && (
                          <div className="absolute right-2.5 top-2.5">
                            {usernameValid ? (
                              <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-destructive" aria-hidden="true" />
                            )}
                          </div>
                        )}
                      </div>
                      {usernameError ? (
                        <p className="text-sm text-destructive" id="username-hint">{usernameError}</p>
                      ) : (
                        <div className="flex items-center gap-1">
                          <p className="text-sm text-gray-600 dark:text-gray-300" id="username-hint">
                            Choose a unique username (3-30 characters, letters, numbers, underscores only)
                          </p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600">
                                  <HelpCircle className="h-4 w-4" aria-hidden="true" />
                                  <span className="sr-only">Username requirements</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="font-semibold mb-1">Username Requirements:</p>
                                <ul className="text-xs space-y-1 list-disc pl-4">
                                  <li>3-30 characters long</li>
                                  <li>Only letters (a-z, A-Z), numbers (0-9), and underscores (_)</li>
                                  <li>No spaces or special characters</li>
                                  <li>Must be unique across the platform</li>
                                </ul>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="font-medium">Full Name</Label>
                      <div className="relative">
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            validateFullName(e.target.value);
                          }}
                          placeholder="Enter your full name (e.g., John Doe)"
                          className={`w-full pr-8 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${!fullNameValid ? 'border-destructive' : ''} placeholder:text-gray-500 dark:placeholder:text-gray-400`}
                          aria-invalid={!fullNameValid}
                          aria-describedby="fullName-hint"
                          onBlur={(e) => validateFullName(e.target.value)}
                        />
                        {fullName && (
                          <div className="absolute right-2.5 top-2.5">
                            {fullNameValid ? (
                              <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-destructive" aria-hidden="true" />
                            )}
                          </div>
                        )}
                      </div>
                      {fullNameError ? (
                        <p className="text-sm text-destructive" id="fullName-hint">{fullNameError}</p>
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-300" id="fullName-hint">Your full name will be displayed on your public profile</p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-2 pt-4 border-t">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setFullName(profile?.full_name || "");
                            setUsername(profile?.username || "");
                            // Reset validation states
                            setUsernameValid(true);
                            setFullNameValid(true);
                            setUsernameError("");
                            setFullNameError("");
                          }}
                          className="w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border-gray-300 dark:border-gray-600"
                        >
                          Reset
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Revert changes to last saved values
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button 
                    onClick={updateProfile} 
                    disabled={updating || !usernameValid || !fullNameValid}
                    className="w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-primary hover:bg-primary/90"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {activeTab === "bookmarks" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Your Bookmarks</h1>
              
              <div className="w-full border border-dashed rounded-lg border-gray-300 dark:border-gray-600 p-8 text-center bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex flex-col items-center justify-center">
                  <BookmarkIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-1">No bookmarks yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mb-4">
                    Bookmarks help you save your favorite content for easy access later.
                  </p>
                  <div className="flex items-center text-sm text-primary">
                    <BookmarkPlus className="h-4 w-4 mr-1" />
                    <span>Look for the bookmark icon (<BookmarkIcon className="h-3 w-3 inline mx-1" />) on content to save it here</span>
                  </div>
                </div>
              </div>
              
              <ProfileBookmarks />
            </div>
          )}
          
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Account Settings</h1>
              <Card className="w-full transition-shadow hover:shadow-md shadow-sm bg-white dark:bg-gray-800 border-l-4 border-l-primary">
                <CardHeader className="pb-4">
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription className="mt-1 text-gray-600 dark:text-gray-300">
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Account settings will be available in our next update (Q2 2024).
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Info className="h-4 w-4" />
                      <a href="/contact" className="underline hover:text-primary/80">
                        Request specific features or settings
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
