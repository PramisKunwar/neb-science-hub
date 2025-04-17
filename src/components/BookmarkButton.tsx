
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkPlus } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface BookmarkButtonProps {
  contentType: string;
  contentId: string;
  title: string;
  description?: string;
  url?: string;
  variant?: "icon" | "default" | "outline";
  size?: "sm" | "default" | "lg";
}

export function BookmarkButton({
  contentType,
  contentId,
  title,
  description,
  url,
  variant = "default",
  size = "default"
}: BookmarkButtonProps) {
  const { isBookmarked, getBookmarkId, addBookmark, removeBookmark } = useBookmarks();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const bookmarked = isBookmarked(contentType, contentId);
  const bookmarkId = getBookmarkId(contentType, contentId);
  
  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to bookmark resources",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (bookmarked && bookmarkId) {
        await removeBookmark(bookmarkId);
      } else {
        await addBookmark({
          content_type: contentType,
          content_id: contentId,
          title,
          description,
          url
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  if (variant === "icon") {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleBookmarkClick} 
        disabled={isLoading}
        aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        className="hover:bg-transparent"
      >
        {bookmarked ? (
          <Bookmark className="h-5 w-5 text-nebBlue fill-nebBlue" />
        ) : (
          <BookmarkPlus className="h-5 w-5" />
        )}
      </Button>
    );
  }
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBookmarkClick}
      disabled={isLoading}
      className={bookmarked ? "bg-nebBlue text-white" : ""}
    >
      {bookmarked ? (
        <>
          <Bookmark className="mr-2 h-4 w-4 fill-current" />
          Bookmarked
        </>
      ) : (
        <>
          <BookmarkPlus className="mr-2 h-4 w-4" />
          Bookmark
        </>
      )}
    </Button>
  );
}
