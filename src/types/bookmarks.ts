export type ContentType = 'article' | 'video' | 'chapter' | 'question' | 'note' | 'pyq' | 'resource';

export interface Tag {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  title: string;
  description?: string | null;
  url?: string | null;
  content_id: string;
  content_type: ContentType;
  user_id: string;
  created_at: string;
  tags?: Tag[]; // Hydrated tag objects for UI purposes
}

export interface BookmarkInput {
  title: string;
  description?: string | null;
  url?: string | null;
  content_id: string;
  content_type: ContentType;
  tag_ids?: string[];
  newTags?: string[]; // Used only when creating a bookmark with new tags
}

export interface BookmarksListProps {
  contentType?: ContentType;
  onBookmarkClick?: (bookmark: Bookmark) => void;
  className?: string;
} 