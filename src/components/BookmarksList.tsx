import React, { useState, useMemo } from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Bookmark, BookmarksListProps, Tag, ContentType } from '@/types/bookmarks';
import { Bookmark as BookmarkIcon, Tag as TagIcon, X, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function BookmarksList({
  contentType,
  onBookmarkClick,
  className = '',
}: BookmarksListProps) {
  const { user } = useAuth();
  const { bookmarks, tags, isLoading, removeBookmark } = useBookmarks();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];
    
    return bookmarks.filter((bookmark) => {
      // Filter by content type if specified
      if (contentType && bookmark.content_type !== contentType) {
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
  }, [bookmarks, contentType, selectedTags, searchQuery]);

  if (!user) {
    return <div className="text-center py-4">Please sign in to view your bookmarks</div>;
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading bookmarks...</div>;
  }

  if (filteredBookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <BookmarkIcon className="mx-auto h-8 w-8 mb-2 text-muted-foreground" />
        <p className="text-muted-foreground">No bookmarks found</p>
      </div>
    );
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId) 
        : [...prev, tagId]
    );
  };

  const handleRemoveBookmark = (e: React.MouseEvent, bookmark: Bookmark) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this bookmark?')) {
      removeBookmark(bookmark.id);
    }
  };

  return (
    <div className={cn("bookmark-list space-y-4", className)}>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search bookmarks..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {tags && tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
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
      )}
      
      <div className="space-y-4">
        {filteredBookmarks.map(bookmark => (
          <Card 
            key={bookmark.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onBookmarkClick && onBookmarkClick(bookmark)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{bookmark.title}</CardTitle>
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
                <CardDescription>{bookmark.description}</CardDescription>
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
            
            <CardFooter className="pt-1 text-sm text-muted-foreground flex justify-between">
              <div>
                {bookmark.content_type.charAt(0).toUpperCase() + bookmark.content_type.slice(1)} • 
                {' '}
                {new Date(bookmark.created_at).toLocaleDateString()}
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
    </div>
  );
} 