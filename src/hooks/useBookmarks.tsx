import { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Bookmark {
  id: string;
  user_id: string;
  item_id: string;
  item_type: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface BookmarkItem {
  id: string;
  type: string;
  title: string;
}

interface BookmarksContextType {
  bookmarks: Bookmark[];
  isLoading: boolean;
  addBookmark: (item: BookmarkItem) => Promise<void>;
  removeBookmark: (itemId: string) => Promise<void>;
  isBookmarked: (itemId: string) => boolean;
  refreshBookmarks: () => Promise<void>;
}

// Context
const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

// Provider
export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user's bookmarks when authenticated
  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setBookmarks([]);
      setIsLoading(false);
    }
  }, [user]);

  // Fetch bookmarks from Supabase
  const fetchBookmarks = async () => {
    try {
      setIsLoading(true);
      
      if (!user) {
        setBookmarks([]);
        return;
      }
      
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching bookmarks:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load bookmarks',
          description: error.message,
        });
      } else {
        setBookmarks(data || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a bookmark
  const addBookmark = async (item: BookmarkItem) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'Please log in to bookmark this item.',
      });
      return;
    }

    try {
      // Check if already bookmarked
      if (isBookmarked(item.id)) {
        toast({
          title: 'Already bookmarked',
          description: 'This item is already in your bookmarks.',
        });
        return;
      }

      const bookmark = {
        id: uuidv4(),
        user_id: user.id,
        item_id: item.id,
        item_type: item.type,
        title: item.title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('bookmarks').insert(bookmark);

      if (error) {
        console.error('Error adding bookmark:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to add bookmark',
          description: error.message,
        });
      } else {
        setBookmarks((prev) => [bookmark, ...prev]);
        toast({
          title: 'Bookmark added',
          description: 'Item has been added to your bookmarks.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  // Remove a bookmark
  const removeBookmark = async (itemId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('item_id', itemId);

      if (error) {
        console.error('Error removing bookmark:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to remove bookmark',
          description: error.message,
        });
      } else {
        setBookmarks((prev) => prev.filter((bookmark) => bookmark.item_id !== itemId));
        toast({
          title: 'Bookmark removed',
          description: 'Item has been removed from your bookmarks.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  // Check if an item is bookmarked
  const isBookmarked = (itemId: string) => {
    return bookmarks.some((bookmark) => bookmark.item_id === itemId);
  };

  // Refresh bookmarks
  const refreshBookmarks = async () => {
    await fetchBookmarks();
  };

  // Context value
  const value = {
    bookmarks,
    isLoading,
    addBookmark,
    removeBookmark,
    isBookmarked,
    refreshBookmarks,
  };

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

// Hook
export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
} 