-- Create bookmarks table
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL, -- 'article', 'video', 'chapter', 'question', 'note'
  content_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, content_type, content_id)
);

-- Create bookmark tags table
CREATE TABLE IF NOT EXISTS public.bookmark_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, name)
);

-- Create junction table for bookmarks and tags
CREATE TABLE IF NOT EXISTS public.bookmarks_tags (
  bookmark_id UUID NOT NULL REFERENCES public.bookmarks(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.bookmark_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (bookmark_id, tag_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON public.bookmarks (user_id);
CREATE INDEX IF NOT EXISTS bookmark_tags_user_id_idx ON public.bookmark_tags (user_id);
CREATE INDEX IF NOT EXISTS bookmarks_tags_bookmark_id_idx ON public.bookmarks_tags (bookmark_id);
CREATE INDEX IF NOT EXISTS bookmarks_tags_tag_id_idx ON public.bookmarks_tags (tag_id);

-- Enable Row Level Security
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmark_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for bookmarks table
CREATE POLICY "Users can view their own bookmarks" 
  ON public.bookmarks FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks" 
  ON public.bookmarks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookmarks" 
  ON public.bookmarks FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" 
  ON public.bookmarks FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for bookmark tags table
CREATE POLICY "Users can view their own tags" 
  ON public.bookmark_tags FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tags" 
  ON public.bookmark_tags FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tags" 
  ON public.bookmark_tags FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tags" 
  ON public.bookmark_tags FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for bookmarks_tags junction table
CREATE POLICY "Users can view their own bookmarks_tags" 
  ON public.bookmarks_tags FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.bookmarks b
    WHERE b.id = bookmark_id AND b.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own bookmarks_tags" 
  ON public.bookmarks_tags FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.bookmarks b
    WHERE b.id = bookmark_id AND b.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own bookmarks_tags" 
  ON public.bookmarks_tags FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.bookmarks b
    WHERE b.id = bookmark_id AND b.user_id = auth.uid()
  )); 