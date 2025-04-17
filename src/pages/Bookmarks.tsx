import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bookmark, BookmarkX, Search, Book, FileText, PenTool, Clock, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookmarksPage() {
  const { bookmarks, isLoading, removeBookmark } = useBookmarks();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  // Update filtered bookmarks when bookmarks, search term, or active tab changes
  useEffect(() => {
    let result = [...bookmarks];

    // Filter by type if not 'all'
    if (activeTab !== 'all') {
      result = result.filter(bookmark => bookmark.item_type === activeTab);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(bookmark => 
        bookmark.title.toLowerCase().includes(term)
      );
    }

    setFilteredBookmarks(result);
  }, [bookmarks, searchTerm, activeTab]);

  // Calculate counts for each tab
  const getCounts = () => {
    const counts = {
      all: bookmarks.length,
      subject: bookmarks.filter(b => b.item_type === 'subject').length,
      note: bookmarks.filter(b => b.item_type === 'note').length,
      pyq: bookmarks.filter(b => b.item_type === 'pyq').length,
    };
    
    return counts;
  };
  
  const counts = getCounts();

  // Handle bookmark removal
  const handleRemoveBookmark = async (id: string) => {
    setIsRemoving(id);
    try {
      await removeBookmark(id);
    } finally {
      setIsRemoving(null);
    }
  };

  // Get icon based on item type
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'subject':
        return <Book className="h-4 w-4" />;
      case 'note':
        return <FileText className="h-4 w-4" />;
      case 'pyq':
        return <PenTool className="h-4 w-4" />;
      default:
        return <Bookmark className="h-4 w-4" />;
    }
  };

  // Get item URL based on type and ID
  const getItemUrl = (type: string, id: string) => {
    switch (type) {
      case 'subject':
        return `/subjects/${id}`;
      case 'pyq':
        return `/pyq#${id}`;
      case 'note':
        return `/notes/${id}`;
      default:
        return '#';
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex flex-col items-start mb-8">
          <h1 className="text-3xl font-bold text-nebPalette-navy mb-2 flex items-center">
            <Bookmark className="mr-2 h-6 w-6" />
            Your Bookmarks
          </h1>
          <p className="text-nebPalette-teal mb-6">
            Access and manage all your saved educational resources
          </p>

          {/* Search and filter */}
          <div className="w-full flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs 
            defaultValue="all" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all" className="flex items-center justify-center">
                All
                <Badge variant="outline" className="ml-2">{counts.all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="subject" className="flex items-center justify-center">
                Subjects
                <Badge variant="outline" className="ml-2">{counts.subject}</Badge>
              </TabsTrigger>
              <TabsTrigger value="note" className="flex items-center justify-center">
                Notes
                <Badge variant="outline" className="ml-2">{counts.note}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pyq" className="flex items-center justify-center">
                PYQs
                <Badge variant="outline" className="ml-2">{counts.pyq}</Badge>
              </TabsTrigger>
            </TabsList>

            {/* Content for all tabs */}
            <TabsContent value={activeTab} className="mt-0">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nebPalette-navy"></div>
                </div>
              ) : filteredBookmarks.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <Bookmark className="h-16 w-16 text-gray-300 mb-4" />
                      {searchTerm ? (
                        <>
                          <h3 className="text-lg font-semibold mb-2">No matching bookmarks found</h3>
                          <p className="text-gray-500 mb-4">Try a different search term or filter.</p>
                        </>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                          <p className="text-gray-500 mb-4">
                            You haven't added any bookmarks in this category.
                          </p>
                        </>
                      )}
                      <Button asChild>
                        <Link to="/">Explore Content</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBookmarks.map((bookmark) => (
                    <Card key={bookmark.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {getItemIcon(bookmark.item_type)}
                              <span className="ml-1 capitalize">{bookmark.item_type}</span>
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="mr-1 h-3 w-3" />
                              {new Date(bookmark.created_at).toLocaleDateString()}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveBookmark(bookmark.item_id)}
                            disabled={isRemoving === bookmark.item_id}
                            className="h-8 w-8 rounded-full"
                          >
                            <BookmarkX className="h-4 w-4 text-nebPalette-red" />
                          </Button>
                        </div>
                        <CardTitle className="text-lg mt-2 text-nebPalette-navy">
                          {bookmark.title}
                        </CardTitle>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button asChild variant="outline" className="w-full">
                          <Link to={getItemUrl(bookmark.item_type, bookmark.item_id)}>
                            View {bookmark.item_type}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
} 