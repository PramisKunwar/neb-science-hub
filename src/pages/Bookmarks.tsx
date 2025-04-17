
import { useState, useMemo } from "react";
import { useBookmarks, BookmarkTag } from "@/hooks/useBookmarks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  BookmarkPlus,
  Bookmark,
  Tag,
  Search,
  ExternalLink,
  MoreVertical,
  Trash,
  Plus,
  X,
} from "lucide-react";

export default function BookmarksPage() {
  const {
    bookmarks,
    isLoadingBookmarks,
    tags,
    isLoadingTags,
    removeBookmark,
    addTag,
    removeTag,
    selectedTag,
    setSelectedTag
  } = useBookmarks();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [currentTab, setCurrentTab] = useState<string>("all");

  // Prompt user to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="text-center py-20">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Bookmarks</h1>
            <p className="text-lg mb-8">Please log in to view and manage your bookmarks.</p>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter bookmarks based on search query
  const filteredBookmarks = useMemo(() => {
    if (!searchQuery) return bookmarks;
    
    const query = searchQuery.toLowerCase();
    return bookmarks.filter(bookmark => 
      bookmark.title.toLowerCase().includes(query) || 
      (bookmark.description && bookmark.description.toLowerCase().includes(query))
    );
  }, [bookmarks, searchQuery]);

  // Filter bookmarks based on current tab
  const tabFilteredBookmarks = useMemo(() => {
    if (currentTab === "all") return filteredBookmarks;
    
    return filteredBookmarks.filter(bookmark => bookmark.content_type === currentTab);
  }, [filteredBookmarks, currentTab]);

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTagName.trim()) {
      toast({
        title: "Tag name required",
        description: "Please enter a tag name",
        variant: "destructive"
      });
      return;
    }
    
    await addTag(newTagName.trim());
    setNewTagName("");
  };

  const handleDeleteTag = async (tagId: string) => {
    if (window.confirm("Are you sure you want to delete this tag? This won't delete your bookmarks.")) {
      await removeTag(tagId);
      if (selectedTag === tagId) {
        setSelectedTag(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Bookmarks</h1>
          <p className="text-lg text-gray-600">Manage your saved educational resources</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with tags */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium mb-4 flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                Tags
              </h2>
              
              <div className="space-y-3 mb-4">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedTag(null)}
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  All Bookmarks
                </Button>
                
                {isLoadingTags ? (
                  <div className="py-2 px-3 bg-gray-50 animate-pulse h-8 rounded"></div>
                ) : (
                  tags.map(tag => (
                    <div key={tag.id} className="flex items-center justify-between group">
                      <Button
                        variant={selectedTag === tag.id ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start overflow-hidden text-ellipsis"
                        onClick={() => setSelectedTag(tag.id)}
                      >
                        <Tag className="mr-2 h-4 w-4" />
                        {tag.name}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
              
              <form onSubmit={handleCreateTag} className="flex gap-2">
                <Input
                  placeholder="New tag name"
                  value={newTagName}
                  onChange={e => setNewTagName(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium mb-4">Filter by Type</h2>
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="subject">Subjects</TabsTrigger>
                  <TabsTrigger value="pyq">PYQs</TabsTrigger>
                </TabsList>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="note">Notes</TabsTrigger>
                  <TabsTrigger value="resource">Resources</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </aside>
          
          {/* Main content area */}
          <div className="flex-1">
            <div className="mb-6 relative">
              <Input
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            {selectedTag && (
              <div className="mb-4">
                <Badge variant="outline" className="text-base py-1 px-3">
                  {tags.find(t => t.id === selectedTag)?.name}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0"
                    onClick={() => setSelectedTag(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </div>
            )}
            
            {isLoadingBookmarks ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className="h-40 bg-gray-100 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : tabFilteredBookmarks.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <BookmarkPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No bookmarks found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery 
                    ? "No bookmarks match your search." 
                    : selectedTag 
                      ? "No bookmarks with this tag." 
                      : "Bookmark educational resources as you browse."}
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tabFilteredBookmarks.map(bookmark => (
                  <Card key={bookmark.id} className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className="mb-2">
                          {bookmark.content_type.charAt(0).toUpperCase() + bookmark.content_type.slice(1)}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600"
                              onClick={() => removeBookmark(bookmark.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Remove Bookmark
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="line-clamp-1">{bookmark.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {bookmark.description && (
                        <CardDescription className="line-clamp-2 mb-3">
                          {bookmark.description}
                        </CardDescription>
                      )}
                      
                      {bookmark.tags && bookmark.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {bookmark.tags.map(tag => (
                            <Badge key={tag.id} variant="outline" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        asChild
                      >
                        <a 
                          href={bookmark.url || `/subjects/${bookmark.content_id}`} 
                          target={bookmark.url ? "_blank" : "_self"}
                          rel={bookmark.url ? "noopener noreferrer" : ""}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Resource
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
