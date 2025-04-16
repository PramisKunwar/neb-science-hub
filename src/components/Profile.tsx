import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  getUserProfile,
  updateUserProfile,
  signOut,
  getCurrentUser,
} from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertCircle,
  Loader2,
  CheckCircle,
  Mail,
  User,
  Settings,
  Logout,
  HelpCircle,
  Book,
  Calendar,
  Heart,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/components/theme-provider";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState<{
    fullName: string | null;
    username: string | null;
    email: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    is_active: boolean | null;
  }>({
    fullName: null,
    username: null,
    email: null,
    bio: null,
    location: null,
    website: null,
    is_active: null,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isThemeLoading, setIsThemeLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  // Fetch current user
  const { data: currentUser, isLoading: isCurrentUserLoading } = useQuery(
    ["currentUser"],
    () => getCurrentUser(),
    {
      onError: (error: any) => {
        toast({
          title: "Error fetching current user",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  // Fetch user profile data
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useQuery(
    ["profile", currentUser?.id],
    () => {
      if (!currentUser?.id) {
        return null;
      }
      return getUserProfile(currentUser.id);
    },
    {
      enabled: !!currentUser?.id,
      onError: (error: any) => {
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  useEffect(() => {
    if (profile) {
      setUpdatedProfileData({
        ...updatedProfileData,
        fullName: profile.full_name || "",
        username: profile.username || "",
        email: profile.email || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
        is_active: profile.is_active || false,
      });
    }
  }, [profile]);

  // Update user profile mutation
  const updateProfileMutation = useMutation(
    async () => {
      if (!currentUser?.id) {
        throw new Error("User ID is required to update profile.");
      }
      return updateUserProfile(currentUser.id, {
        full_name: updatedProfileData.fullName,
        username: updatedProfileData.username,
        bio: updatedProfileData.bio,
        location: updatedProfileData.location,
        website: updatedProfileData.website,
        is_active: updatedProfileData.is_active,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile", currentUser?.id]);
        toast({
          title: "Profile updated successfully!",
          description: "Your profile has been updated.",
        });
        setIsEditing(false);
      },
      onError: (error: any) => {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
      },
      onSettled: () => {
        setIsLoading(false);
      },
    }
  );

  // Sign out mutation
  const signOutMutation = useMutation(signOut, {
    onSuccess: () => {
      toast({
        title: "Signed out successfully!",
        description: "You have been signed out.",
      });
      navigate("/auth");
    },
    onError: (error: any) => {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProfileData({
      ...updatedProfileData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUpdatedProfileData({
      ...updatedProfileData,
      [name]: checked,
    });
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    await updateProfileMutation.mutateAsync();
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOutMutation.mutateAsync();
  };

  if (isCurrentUserLoading || isProfileLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-3xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-64" />
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">
                <Skeleton className="h-4 w-24" />
              </Label>
              <Input id="name" type="text" disabled>
                <Skeleton className="h-10 w-full" />
              </Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                <Skeleton className="h-4 w-24" />
              </Label>
              <Input id="email" type="email" disabled>
                <Skeleton className="h-10 w-full" />
              </Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">
                <Skeleton className="h-4 w-24" />
              </Label>
              <Textarea id="bio" disabled>
                <Skeleton className="h-24 w-full" />
              </Textarea>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button disabled>
              <Skeleton className="h-10 w-24" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (isProfileError) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to fetch profile data. {profileError?.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isEditing ? "Edit Profile" : "Your Profile"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Make changes to your profile here."
              : "View your profile information."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={updatedProfileData.fullName || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={updatedProfileData.username || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={updatedProfileData.email || ""}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={updatedProfileData.bio || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              value={updatedProfileData.location || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="text"
              value={updatedProfileData.website || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="is_active">Active</Label>
            <Switch
              id="is_active"
              name="is_active"
              checked={updatedProfileData.is_active || false}
              onCheckedChange={(checked) =>
                setUpdatedProfileData({
                  ...updatedProfileData,
                  is_active: checked,
                })
              }
              disabled={!isEditing}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setUpdatedProfileData({
                    fullName: profile.full_name || "",
                    username: profile.username || "",
                    email: profile.email || "",
                    bio: profile.bio || "",
                    location: profile.location || "",
                    website: profile.website || "",
                    is_active: profile.is_active || false,
                  });
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateProfile}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="border-nebBlue text-nebBlue hover:bg-nebBlue hover:text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                onClick={handleSignOut}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Out...
                  </>
                ) : (
                  <>
                    <Logout className="mr-2 h-4 w-4" />
                    Sign Out
                  </>
                )}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Theme Preferences</CardTitle>
            <CardDescription>Customize the look of NEB Science Hub.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={theme}
              onValueChange={(value) => {
                setIsThemeLoading(true);
                setTheme(value);
                setTimeout(() => {
                  setIsThemeLoading(false);
                }, 500);
              }}
              disabled={isThemeLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account settings.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Button
              variant="destructive"
              className="justify-start"
              onClick={() => setIsDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-between space-x-2">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      // Implement account deletion logic here
                      setIsDialogOpen(false);
                      toast({
                        title: "Account deletion initiated",
                        description:
                          "Your account deletion is being processed. This may take some time.",
                      });
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
      <Separator className="my-4" />
      <Accordion
        type="single"
        collapsible
        defaultValue="account"
        className="w-full"
      >
        <AccordionItem value="account">
          <AccordionTrigger>
            Account Settings
            <Settings className="ml-auto h-4 w-4" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your personal information, including your name and
                  email address.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Change your password to keep your account secure.
                </p>
                <Button variant="secondary">Change Password</Button>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Privacy Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Control who can see your profile information.
                </p>
                <Button variant="secondary">Update Privacy Settings</Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notifications">
          <AccordionTrigger>
            Notifications
            <Mail className="ml-auto h-4 w-4" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Choose which email notifications you want to receive.
                </p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="emailUpdates">Receive Updates</Label>
                  <Switch id="emailUpdates" defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Enable or disable push notifications on your device.
                </p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="pushUpdates">Enable Push</Label>
                  <Switch id="pushUpdates" defaultChecked />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="security">
          <AccordionTrigger>
            Security
            <HelpCircle className="ml-auto h-4 w-4" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
                <Button variant="secondary">Enable 2FA</Button>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Login History</h3>
                <p className="text-sm text-muted-foreground">
                  Review your recent login activity.
                </p>
                <Button variant="secondary">View Login History</Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Profile;
