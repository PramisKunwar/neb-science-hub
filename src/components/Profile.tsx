import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  getCurrentUser, 
  signOut, 
  getUserProfile, 
  updateUserProfile, 
  getUserBookmarks 
} from '@/lib/supabase';
import { CalendarDays, BookMarked, UserCircle, PenSquare, Loader2, Save, LogOut } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    school: '',
    grade: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
          
          // Fetch user profile data
          const { data: profileData } = await getUserProfile(currentUser.id);
          
          if (profileData) {
            setProfile(profileData);
            // Initialize form with profile data
            setFormData({
              fullName: profileData.full_name || '',
              bio: profileData.bio || '',
              school: profileData.school || '',
              grade: profileData.grade || ''
            });
          }
          
          // Fetch user bookmarks
          const { data: bookmarksData } = await getUserBookmarks(currentUser.id);
          if (bookmarksData) {
            setBookmarks(bookmarksData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfileUpdate = async () => {
    if (!user) return;
    
    setUpdating(true);
    setMessage(null);
    
    try {
      const { error } = await updateUserProfile(user.id, {
        full_name: formData.fullName,
        bio: formData.bio,
        school: formData.school,
        grade: formData.grade,
        updated_at: new Date()
      });
      
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setEditMode(false);
        
        // Update local profile state
        setProfile({
          ...profile,
          full_name: formData.fullName,
          bio: formData.bio,
          school: formData.school,
          grade: formData.grade,
          updated_at: new Date()
        });
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-nebBlue animate-spin" />
        <span className="ml-2 text-nebText">Loading profile...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto my-8">
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>Please sign in to view your profile</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => window.location.href = '/auth'} className="w-full">
            Go to Sign In
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="bookmarks">My Bookmarks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Avatar className="h-20 w-20 mr-4 border-2 border-nebPalette-beige">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-nebPrimary text-white text-xl">
                      {(profile?.full_name || user.email || '?').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <CardTitle className="text-2xl">
                      {profile?.full_name || 'Science Enthusiast'}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <UserCircle className="h-4 w-4 mr-1 text-nebText" />
                      {user.email}
                    </CardDescription>
                    {profile?.updated_at && (
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        Last updated: {new Date(profile.updated_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-x-2">
                  {editMode ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditMode(false)}
                      disabled={updating}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditMode(true)}
                    >
                      <PenSquare className="h-4 w-4 mr-1" />
                      Edit Profile
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="pt-6">
              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Input 
                        id="grade" 
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        placeholder="Your grade (e.g., 11)"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="school">School/College</Label>
                    <Input 
                      id="school" 
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      placeholder="Your school or college name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input 
                      id="bio" 
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us a bit about yourself"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleProfileUpdate}
                    disabled={updating}
                    className="mt-4"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  
                  {message && (
                    <div className={`mt-4 p-3 rounded-md ${
                      message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">About</h3>
                    <p className="mt-1 text-gray-600">
                      {profile?.bio || 'No bio provided yet.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">School/College</h3>
                      <p className="mt-1">
                        {profile?.school || 'Not specified'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Grade</h3>
                      <p className="mt-1">
                        {profile?.grade || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Interests</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[...new Set(bookmarks.map(b => b.material_type))].map((type) => (
                        <Badge key={type} variant="outline" className="bg-nebBackground">
                          {type === 'note' ? 'Notes' : 
                           type === 'question_bank' ? 'Question Banks' : 
                           type === 'exam_paper' ? 'Exam Papers' : type}
                        </Badge>
                      ))}
                      {bookmarks.length === 0 && <span className="text-gray-500">No interests yet</span>}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookmarks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookMarked className="h-5 w-5 mr-2 text-nebPrimary" />
                My Saved Materials
              </CardTitle>
              <CardDescription>
                Access your bookmarked study materials and past papers
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {bookmarks.length > 0 ? (
                <div className="space-y-4">
                  {bookmarks.map((bookmark) => (
                    <div 
                      key={bookmark.id}
                      className="p-4 border rounded-lg hover:border-nebBlue hover:bg-nebBackground/30 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {bookmark.study_materials?.title || 
                             bookmark.exam_papers?.title || 
                             'Untitled Material'}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {bookmark.study_materials?.description || 
                             bookmark.exam_papers?.description || 
                             'No description available'}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <Badge variant="outline" size="sm" className="mr-2">
                              {bookmark.material_type === 'note' ? 'Notes' : 
                               bookmark.material_type === 'question_bank' ? 'Question Bank' : 
                               bookmark.material_type === 'exam_paper' ? 'Exam Paper' : 
                               bookmark.material_type}
                            </Badge>
                            <span>Saved on {new Date(bookmark.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookMarked className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-600">No bookmarks yet</h3>
                  <p className="text-gray-500 mt-1">
                    Save study materials and past papers to access them quickly here
                  </p>
                  <Button className="mt-4" onClick={() => window.location.href = '/'}>
                    Browse Materials
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile; 