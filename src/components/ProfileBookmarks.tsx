import { useState, useMemo } from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Bookmark, Tag, ContentType } from '@/types/bookmarks';
import { Bookmark as BookmarkIcon, Tag as TagIcon, X, ExternalLink, Search, ArrowUpDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ProfileBookmarks() {
  const { bookmarks, tags, isLoading, removeBookmark } = useBookmarks();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [contentTypeFilter, setContentTypeFilter] = useState<ContentType | 'all'>('all');
  
  // Get unique content types from bookmarks
  const contentTypes = useMemo(() => {
    if (!bookmarks) return [];
    
    const types = Array.from(new Set(bookmarks.map(b => b.content_type)));
    return types;
  }, [bookmarks]);
  
  // Group bookmarks by content type for statistics
  const bookmarksByType = useMemo(() => {
    const result: Record<string, number> = {};
    
    if (bookmarks) {
      bookmarks.forEach(bookmark => {
        result[bookmark.content_type] = (result[bookmark.content_type] || 0) + 1;
      });
    }
    
    return result;
  }, [bookmarks]);
  
  // Most used tags for statistics
  const topTags = useMemo(() => {
    if (!bookmarks || !tags) return [];
    
    const tagCounts: Record<string, {id: string, name: string, count: number}> = {};
    
    // Count tag occurrences
    bookmarks.forEach(bookmark => {
      if (bookmark.tags) {
        bookmark.tags.forEach(tag => {
          if (!tagCounts[tag.id]) {
            tagCounts[tag.id] = { id: tag.id, name: tag.name, count: 0 };
          }
          tagCounts[tag.id].count += 1;
        });
      }
    });
    
    // Convert to array and sort by count
    return Object.values(tagCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Get top 5
  }, [bookmarks, tags]);
  
  // Filter and sort bookmarks
  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];
    
    let filtered = bookmarks.filter((bookmark) => {
      // Filter by content type if specified
      if (contentTypeFilter !== 'all' && bookmark.content_type !== contentTypeFilter) {
        return false;
      }
      
      // Filter by selected tags
      if (selectedTags.length > 0) {
        const hasAllSelectedTags = selectedTags.every(tagId => 
          bookmark.tags?.some(tag => tag.id === tagId)
        );
        if (!hasAllSelectedTags) return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          bookmark.title.toLowerCase().includes(query) ||
          (bookmark.description && bookmark.description.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
    
    // Sort results
    switch(sortOrder) {
      case 'newest':
        filtered = filtered.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case 'oldest':
        filtered = filtered.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case 'alphabetical':
        filtered = filtered.sort((a, b) => 
          a.title.localeCompare(b.title)
        );
        break;
    }
    
    return filtered;
  }, [bookmarks, contentTypeFilter, selectedTags, searchQuery, sortOrder]);

  const handleRemoveBookmark = (e: React.MouseEvent, bookmark: Bookmark) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this bookmark?')) {
      removeBookmark(bookmark.id);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId) 
        : [...prev, tagId]
    );
  };
  
  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get nice label for content type
  const getContentTypeLabel = (type: ContentType) => {
    const labels: Record<ContentType, string> = {
      'article': 'Article',
      'video': 'Video',
      'chapter': 'Chapter',
      'question': 'Question',
      'note': 'Note',
      'pyq': 'Past Year Question',
      'resource': 'Resource'
    };
    
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{bookmarks?.length || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Content Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {contentTypes.map(type => (
                <Badge key={type} variant="outline" className="text-xs">
                  {getContentTypeLabel(type)} ({bookmarksByType[type]})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {topTags.map(tag => (
                <Badge key={tag.id} variant="secondary" className="text-xs">
                  {tag.name} ({tag.count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search bookmarks..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={contentTypeFilter} onValueChange={(value) => setContentTypeFilter(value as ContentType | 'all')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {contentTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {getContentTypeLabel(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'newest' | 'oldest' | 'alphabetical')}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tags filter */}
      {tags && tags.length > 0 && (
        <ScrollArea className="whitespace-nowrap pb-2">
          <div className="flex gap-2">
            {tags.map(tag => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag.id)}
              >
                <TagIcon className="h-3 w-3 mr-1" />
                {tag.name}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      )}
      
      {/* Bookmarks list */}
      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-10">
          <BookmarkIcon className="mx-auto h-10 w-10 text-muted-foreground opacity-20" />
          <p className="mt-2 text-muted-foreground">No bookmarks found</p>
          {searchQuery || selectedTags.length > 0 || contentTypeFilter !== 'all' ? (
            <Button 
              variant="ghost" 
              className="mt-2" 
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
                setContentTypeFilter('all');
              }}
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookmarks.map(bookmark => (
            <Card 
              key={bookmark.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (bookmark.url) {
                  window.open(bookmark.url, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-1 text-xs">
                      {getContentTypeLabel(bookmark.content_type)}
                    </Badge>
                    <CardTitle className="text-lg">{bookmark.title}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    onClick={(e) => handleRemoveBookmark(e, bookmark)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {bookmark.description && (
                  <CardDescription className="text-sm line-clamp-2">{bookmark.description}</CardDescription>
                )}
              </CardHeader>
              
              <CardContent className="pb-2">
                {bookmark.tags && bookmark.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {bookmark.tags.map(tag => (
                      <Badge 
                        key={tag.id} 
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-1 text-xs text-muted-foreground flex justify-between">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(bookmark.created_at)}
                </div>
                
                {bookmark.url && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 p-1 flex items-center text-primary hover:text-primary"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 