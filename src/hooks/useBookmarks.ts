import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Bookmark, BookmarkInput, Tag, ContentType } from '@/types/bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch bookmarks and tags when user changes
  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      setTags([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Get user's bookmarks with their associated tags
      const { data: bookmarksData, error: bookmarksError } = await supabase
        .from('bookmarks')
        .select(`
          *,
          tags:bookmarks_tags(
            tag:bookmark_tags(id, name)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (bookmarksError) {
        console.error('Error fetching bookmarks:', bookmarksError);
        setError('Failed to load bookmarks. Please try again later.');
        return;
      }

      // Format bookmark tags
      const formattedBookmarks = bookmarksData.map(bookmark => ({
        ...bookmark,
        tags: bookmark.tags
          ? bookmark.tags.map((tagItem: any) => tagItem.tag)
          : []
      }));

      setBookmarks(formattedBookmarks);
      
      // Get all user tags
      const { data: tagsData, error: tagsError } = await supabase
        .from('bookmark_tags')
        .select('*')
        .eq('user_id', user.id);
        
      if (tagsError) {
        console.error('Error fetching tags:', tagsError);
        setError('Failed to load tags. Please try again later.');
        return;
      }
      
      setTags(tagsData);
    } catch (err) {
      console.error('Error in fetchBookmarks:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // Add a new bookmark
  const addBookmark = async (bookmarkInput: BookmarkInput) => {
    if (!user) return null;

    try {
      // 1. Create the bookmark
      const { data: bookmark, error: bookmarkError } = await supabase
        .from('bookmarks')
        .insert({
          user_id: user.id,
          content_type: bookmarkInput.content_type,
          content_id: bookmarkInput.content_id,
          title: bookmarkInput.title,
          description: bookmarkInput.description || null,
          url: bookmarkInput.url || null
        })
        .select()
        .single();

      if (bookmarkError) {
        console.error('Error adding bookmark:', bookmarkError);
        toast({
          variant: 'destructive',
          title: 'Failed to add bookmark',
          description: bookmarkError.message
        });
        return null;
      }

      // 2. Handle new tags if provided
      if (bookmarkInput.newTags && bookmarkInput.newTags.length > 0) {
        // Process each tag
        for (const tagName of bookmarkInput.newTags) {
          if (!tagName.trim()) continue;
          
          // Check if tag exists
          let tagId;
          const { data: existingTags } = await supabase
            .from('bookmark_tags')
            .select('id')
            .eq('name', tagName.trim())
            .eq('user_id', user.id);

          if (existingTags && existingTags.length > 0) {
            // Use existing tag
            tagId = existingTags[0].id;
          } else {
            // Create new tag
            const { data: newTag, error: tagError } = await supabase
              .from('bookmark_tags')
              .insert({
                name: tagName.trim(),
                user_id: user.id
              })
              .select('id')
              .single();

            if (tagError) {
              console.error('Error creating tag:', tagError);
              continue;
            }
            
            tagId = newTag.id;
          }

          // Associate tag with bookmark
          await supabase
            .from('bookmarks_tags')
            .insert({
              bookmark_id: bookmark.id,
              tag_id: tagId
            });
        }
      }
      
      // 3. Handle existing tag IDs if provided
      if (bookmarkInput.tag_ids && bookmarkInput.tag_ids.length > 0) {
        for (const tagId of bookmarkInput.tag_ids) {
          await supabase
            .from('bookmarks_tags')
            .insert({
              bookmark_id: bookmark.id,
              tag_id: tagId
            });
        }
      }

      // Refresh bookmarks list
      await fetchBookmarks();
      
      toast({
        title: 'Bookmark added',
        description: 'The resource has been bookmarked successfully.'
      });
      
      return bookmark;
    } catch (error) {
      console.error('Error in addBookmark:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to add bookmark',
        description: 'An unexpected error occurred.'
      });
      return null;
    }
  };

  // Remove a bookmark
  const removeBookmark = async (bookmarkId: string) => {
    if (!user) return false;

    try {
      // Delete the bookmark (this will cascade delete the bookmarks_tags entries)
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error removing bookmark:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to remove bookmark',
          description: error.message
        });
        return false;
      }

      // Update local state
      setBookmarks(bookmarks.filter(b => b.id !== bookmarkId));
      
      toast({
        title: 'Bookmark removed',
        description: 'The bookmark has been removed successfully.'
      });
      
      return true;
    } catch (error) {
      console.error('Error in removeBookmark:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to remove bookmark',
        description: 'An unexpected error occurred.'
      });
      return false;
    }
  };

  // Check if a content is bookmarked
  const isBookmarked = useCallback((contentType: ContentType, contentId: string): boolean => {
    return bookmarks.some(
      bookmark => bookmark.content_type === contentType && bookmark.content_id === contentId
    );
  }, [bookmarks]);

  // Get a bookmark by content ID and type
  const getBookmark = useCallback((contentId: string, contentType: ContentType): Bookmark | null => {
    return bookmarks.find(
      bookmark => bookmark.content_id === contentId && bookmark.content_type === contentType
    ) || null;
  }, [bookmarks]);

  return {
    bookmarks,
    tags,
    isLoading,
    error,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmark,
  };
} 