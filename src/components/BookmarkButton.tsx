import { useState } from 'react';
import { Bookmark as BookmarkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ContentType, BookmarkInput } from '@/types/bookmarks';

interface BookmarkButtonProps {
  contentType: ContentType;
  contentId: string;
  title: string;
  url?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function BookmarkButton({
  contentType,
  contentId,
  title,
  url,
  variant = 'outline',
  size = 'icon',
  className,
}: BookmarkButtonProps) {
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark, getBookmark } = useBookmarks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isBookmarking, setIsBookmarking] = useState(false);

  const bookmarked = isBookmarked(contentType, contentId);
  const bookmark = getBookmark(contentId, contentType);

  const handleClick = async () => {
    if (!user) {
      // Redirect to login or show login prompt
      return;
    }

    if (bookmarked && bookmark?.id) {
      await removeBookmark(bookmark.id);
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    try {
      setIsBookmarking(true);
      
      // Parse tags from comma-separated string
      const tagsList = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const bookmarkData: BookmarkInput = {
        title,
        description,
        url,
        content_id: contentId,
        content_type: contentType,
        newTags: tagsList
      };
      
      await addBookmark(bookmarkData);
      
      // Reset form
      setDescription('');
      setTags('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error bookmarking content:', error);
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        className={cn(
          bookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary',
          className
        )}
        title={bookmarked ? 'Remove bookmark' : 'Bookmark this page'}
        disabled={!user}
      >
        <BookmarkIcon className={cn('h-4 w-4', bookmarked && 'fill-primary')} />
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Bookmark</DialogTitle>
            <DialogDescription>
              Save this content to your bookmarks for easy access later.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                className="col-span-3"
                disabled
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Notes
              </Label>
              <Textarea
                id="description"
                placeholder="Add notes about this bookmark"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="science, physics, chemistry, etc."
                className="col-span-3"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isBookmarking}>
              {isBookmarking ? 'Saving...' : 'Save Bookmark'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 