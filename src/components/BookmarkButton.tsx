import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useBookmarks, BookmarkItem } from '@/hooks/useBookmarks';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface BookmarkButtonProps {
  item: BookmarkItem;
  variant?: 'default' | 'outline' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BookmarkButton({
  item,
  variant = 'outline',
  size = 'sm',
  className = '',
}: BookmarkButtonProps) {
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isMarked = isBookmarked(item.id);

  const handleBookmarkToggle = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to use the bookmark feature.',
      });
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    try {
      if (isMarked) {
        await removeBookmark(item.id);
      } else {
        await addBookmark(item);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Determine size classes
  const sizeClasses = {
    sm: 'h-8 px-3',
    md: 'h-10 px-4',
    lg: 'h-12 px-5',
  };

  // Handle icon-only variant
  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full ${className}`}
        onClick={handleBookmarkToggle}
        disabled={isProcessing}
        aria-label={isMarked ? 'Remove bookmark' : 'Add bookmark'}
        title={isMarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        {isMarked ? (
          <BookmarkX className="h-5 w-5 text-nebPalette-red" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </Button>
    );
  }

  // Regular button with text
  return (
    <Button
      variant={variant}
      className={`${sizeClasses[size]} ${className}`}
      onClick={handleBookmarkToggle}
      disabled={isProcessing}
    >
      {isMarked ? (
        <>
          <BookmarkX className="mr-2 h-4 w-4 text-nebPalette-red" />
          {isProcessing ? 'Removing...' : 'Remove Bookmark'}
        </>
      ) : (
        <>
          <Bookmark className="mr-2 h-4 w-4" />
          {isProcessing ? 'Adding...' : 'Bookmark'}
        </>
      )}
    </Button>
  );
} 