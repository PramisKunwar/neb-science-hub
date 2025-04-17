# Bookmark Feature Implementation Guide

This guide outlines how to implement and use the bookmark feature in your application. The bookmark feature allows users to save content for later reference, organize with tags, and easily find saved items.

## Database Schema

The bookmark feature requires three tables in your Supabase database:

1. **bookmarks** - Stores the bookmarked content
2. **bookmark_tags** - Stores tag metadata
3. **bookmarks_tags** - Junction table connecting bookmarks with tags

The SQL migration file `supabase/migrations/20240623_bookmarks_schema.sql` contains the complete schema with:
- Table definitions
- Relationships and constraints
- Indexes for performance
- Row Level Security policies

## Implementation Steps

### 1. Set Up Database Tables

Run the migration SQL script to create the necessary tables:

```bash
# From project root
supabase migration up
```

### 2. Update TypeScript Types

The `src/types/bookmarks.ts` file defines the TypeScript interfaces used throughout the bookmarking system:

- `ContentType` - Union type of valid content types
- `Bookmark` - Interface for bookmark data
- `Tag` - Interface for tag data
- `BookmarkInput` - Interface for creating new bookmarks
- `BookmarksListProps` - Props for the BookmarksList component

### 3. Implement the useBookmarks Hook

The `src/hooks/useBookmarks.tsx` hook handles all bookmark-related functionality:

- Fetching bookmarks and tags
- Adding and removing bookmarks
- Creating and managing tags
- Checking if content is bookmarked

This hook uses Supabase for data storage and handles all database operations.

### 4. Add UI Components

#### BookmarkButton Component

The `BookmarkButton` component displays a button that allows users to bookmark content or remove existing bookmarks. It includes:

- Bookmark status indication (filled/outlined icon)
- Dialog for adding notes and tags
- Integration with authentication

Usage:

```jsx
<BookmarkButton
  contentType="article"
  contentId="123"
  title="Sample Article"
  url="/articles/123"
/>
```

#### BookmarksList Component

The `BookmarksList` component displays a user's bookmarks with filtering capabilities:

- Search functionality
- Tag filtering
- Content type filtering
- Removal functionality

Usage:

```jsx
<BookmarksList
  contentType="article"
  onBookmarkClick={(bookmark) => navigateToContent(bookmark)}
/>
```

## Usage Example

### Adding a Bookmark Button to Content

```jsx
import { BookmarkButton } from "@/components/BookmarkButton";

export function ArticlePage({ article }) {
  return (
    <div className="article-container">
      <div className="article-header">
        <h1>{article.title}</h1>
        <BookmarkButton
          contentType="article"
          contentId={article.id}
          title={article.title}
          url={`/articles/${article.id}`}
        />
      </div>
      
      <div className="article-content">
        {article.content}
      </div>
    </div>
  );
}
```

### Displaying a User's Bookmarks

```jsx
import { BookmarksList } from "@/components/BookmarksList";
import { useRouter } from "next/router";

export function BookmarksPage() {
  const router = useRouter();
  
  const handleBookmarkClick = (bookmark) => {
    router.push(bookmark.url || `/content/${bookmark.content_type}/${bookmark.content_id}`);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Bookmarks</h1>
      
      <BookmarksList onBookmarkClick={handleBookmarkClick} />
    </div>
  );
}
```

## Styling

The components use Shadcn UI components for styling, providing a clean and modern look that integrates with your existing design system. You can customize the appearance by modifying the component props or styling classes.

## Authentication Integration

The bookmark feature integrates with your authentication system through the `useAuth` hook. Ensure that:

1. Users must be logged in to bookmark content
2. Bookmarks are associated with the current user
3. Users can only see and manage their own bookmarks

## Security Considerations

The database setup includes Row Level Security policies that:
- Restrict users to only see their own bookmarks and tags
- Prevent unauthorized access or modification
- Allow proper management of user-specific content

## Performance Optimization

- The schema includes indexes for frequently queried fields
- Components use memoization for filtered lists
- Fetching is optimized with Supabase's efficient query capabilities 