
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export type Bookmark = {
  id: string;
  content_type: string;
  content_id: string;
  title: string;
  description: string | null;
  url: string | null;
  created_at: string;
  updated_at: string;
  tags?: BookmarkTag[];
};

export type BookmarkTag = {
  id: string;
  name: string;
  created_at: string;
};

export function useBookmarks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch user's bookmarks
  const {
    data: bookmarks = [],
    isLoading: isLoadingBookmarks,
    error: bookmarksError,
    refetch: refetchBookmarks
  } = useQuery({
    queryKey: ["bookmarks", user?.id, selectedTag],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from("bookmarks")
        .select(`
          *,
          bookmarks_tags!inner (
            bookmark_tags (
              id,
              name
            )
          )
        `)
        .eq("user_id", user.id);
        
      if (selectedTag) {
        query = query.eq("bookmarks_tags.bookmark_tags.id", selectedTag);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Format the data to make tags array easier to work with
      return data.map((bookmark: any) => {
        const tags = bookmark.bookmarks_tags
          ? bookmark.bookmarks_tags.map((bt: any) => bt.bookmark_tags)
          : [];
        
        return {
          ...bookmark,
          tags
        };
      });
    },
    enabled: !!user
  });

  // Fetch user's tags
  const {
    data: tags = [],
    isLoading: isLoadingTags,
    error: tagsError
  } = useQuery({
    queryKey: ["bookmarkTags", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("bookmark_tags")
        .select("*")
        .eq("user_id", user.id);
        
      if (error) {
        throw error;
      }
      
      return data;
    },
    enabled: !!user
  });

  // Add bookmark mutation
  const addBookmarkMutation = useMutation({
    mutationFn: async (bookmarkData: {
      content_type: string;
      content_id: string;
      title: string;
      description?: string;
      url?: string;
      tags?: string[];
    }) => {
      if (!user) throw new Error("Not authenticated");
      
      // Insert the bookmark
      const { data: bookmark, error: bookmarkError } = await supabase
        .from("bookmarks")
        .insert({
          user_id: user.id,
          content_type: bookmarkData.content_type,
          content_id: bookmarkData.content_id,
          title: bookmarkData.title,
          description: bookmarkData.description || null,
          url: bookmarkData.url || null
        })
        .select("*")
        .single();
      
      if (bookmarkError) throw bookmarkError;
      
      // Add tags if provided
      if (bookmarkData.tags && bookmarkData.tags.length > 0) {
        const tagLinks = bookmarkData.tags.map(tagId => ({
          bookmark_id: bookmark.id,
          tag_id: tagId
        }));
        
        const { error: tagsError } = await supabase
          .from("bookmarks_tags")
          .insert(tagLinks);
        
        if (tagsError) throw tagsError;
      }
      
      return bookmark;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast({
        title: "Bookmark added",
        description: "Resource has been bookmarked successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Bookmark failed",
        description: error instanceof Error ? error.message : "Failed to add bookmark",
      });
    }
  });

  // Remove bookmark mutation
  const removeBookmarkMutation = useMutation({
    mutationFn: async (bookmarkId: string) => {
      if (!user) throw new Error("Not authenticated");
      
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", bookmarkId)
        .eq("user_id", user.id);
      
      if (error) throw error;
      
      return bookmarkId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast({
        title: "Bookmark removed",
        description: "Resource has been removed from bookmarks",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to remove",
        description: error instanceof Error ? error.message : "Failed to remove bookmark",
      });
    }
  });

  // Add tag mutation
  const addTagMutation = useMutation({
    mutationFn: async (tagName: string) => {
      if (!user) throw new Error("Not authenticated");
      
      const { data, error } = await supabase
        .from("bookmark_tags")
        .insert({
          user_id: user.id,
          name: tagName
        })
        .select("*")
        .single();
      
      if (error) throw error;
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkTags"] });
      toast({
        title: "Tag created",
        description: "New tag has been created",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to create tag",
        description: error instanceof Error ? error.message : "Failed to create tag",
      });
    }
  });

  // Remove tag mutation
  const removeTagMutation = useMutation({
    mutationFn: async (tagId: string) => {
      if (!user) throw new Error("Not authenticated");
      
      const { error } = await supabase
        .from("bookmark_tags")
        .delete()
        .eq("id", tagId)
        .eq("user_id", user.id);
      
      if (error) throw error;
      
      return tagId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkTags"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast({
        title: "Tag deleted",
        description: "Tag has been deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete tag",
        description: error instanceof Error ? error.message : "Failed to delete tag",
      });
    }
  });

  // Check if a resource is bookmarked
  const isBookmarked = (contentType: string, contentId: string) => {
    return bookmarks.some(b => b.content_type === contentType && b.content_id === contentId);
  };

  // Find bookmark ID by content type and ID
  const getBookmarkId = (contentType: string, contentId: string) => {
    const bookmark = bookmarks.find(b => b.content_type === contentType && b.content_id === contentId);
    return bookmark ? bookmark.id : null;
  };

  return {
    bookmarks,
    isLoadingBookmarks,
    bookmarksError,
    refetchBookmarks,
    tags,
    isLoadingTags,
    tagsError,
    addBookmark: addBookmarkMutation.mutate,
    removeBookmark: removeBookmarkMutation.mutate,
    addTag: addTagMutation.mutate,
    removeTag: removeTagMutation.mutate,
    isBookmarked,
    getBookmarkId,
    selectedTag,
    setSelectedTag
  };
}
