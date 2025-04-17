import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookmarkIcon, Settings } from "lucide-react";
import { AvatarUpload } from "./AvatarUpload";

type ProfileNavbarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  username: string;
  fullName: string;
  avatarUrl: string;
};

export function ProfileNavbar({ 
  activeTab, 
  setActiveTab, 
  username, 
  fullName, 
  avatarUrl 
}: ProfileNavbarProps) {
  return (
    <div className="border-b bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto flex flex-col px-6 lg:px-8 py-4 md:py-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-5 mb-6">
          <AvatarUpload 
            url={avatarUrl}
            onUpload={() => {}}
            size="md"
            displayName={fullName || username}
            readonly
          />
          <div className="text-center sm:text-left">
            <h1 className="text-xl md:text-2xl font-bold mb-1">
              {fullName || username}
            </h1>
          </div>
        </div>
        
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList 
            className="w-full grid grid-cols-3 max-w-md mx-auto sm:mx-0 p-1 bg-gray-100 dark:bg-gray-700"
            aria-label="Profile navigation tabs"
          >
            <TabsTrigger 
              value="profile" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all relative"
              aria-label="Profile tab"
            >
              <User className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline-block">Profile</span>
              <span className="absolute -bottom-px left-1/2 transform -translate-x-1/2 h-0.5 bg-primary w-0 data-[state=active]:w-3/4 transition-all" aria-hidden="true" />
            </TabsTrigger>
            <TabsTrigger 
              value="bookmarks" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all relative"
              aria-label="Bookmarks tab"
            >
              <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline-block">Bookmarks</span>
              <span className="absolute -bottom-px left-1/2 transform -translate-x-1/2 h-0.5 bg-primary w-0 data-[state=active]:w-3/4 transition-all" aria-hidden="true" />
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all relative"
              aria-label="Settings tab"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline-block">Settings</span>
              <span className="absolute -bottom-px left-1/2 transform -translate-x-1/2 h-0.5 bg-primary w-0 data-[state=active]:w-3/4 transition-all" aria-hidden="true" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
} 