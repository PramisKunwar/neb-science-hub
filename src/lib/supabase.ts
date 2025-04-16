import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const { data: user } = await supabase.auth.getUser();
  return user?.user || null;
};

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  return !!user;
};

// Auth functions
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signInWithMagicLink = async (email: string, redirectTo?: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string, redirectTo?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// User profile management
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  
  return { data, error };
};

// Content management functions
export async function fetchStudyMaterials(subject?: string) {
  let query = supabase
    .from('study_materials')
    .select('*');
  
  if (subject) {
    query = query.eq('subject', subject);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching study materials:', error);
    return [];
  }
  
  return data;
}

export async function fetchExamPapers(filters: { subject?: string, year?: number, examType?: string } = {}) {
  let query = supabase
    .from('exam_papers')
    .select('*');
  
  if (filters.subject) {
    query = query.eq('subject', filters.subject);
  }
  
  if (filters.year) {
    query = query.eq('year', filters.year);
  }
  
  if (filters.examType) {
    query = query.eq('exam_type', filters.examType);
  }
  
  const { data, error } = await query.order('year', { ascending: false });
  
  if (error) {
    console.error('Error fetching exam papers:', error);
    return [];
  }
  
  return data;
}

// User bookmarks and favorites
export const addBookmark = async (userId: string, materialId: string, materialType: string) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .insert([
      { 
        user_id: userId,
        material_id: materialId,
        material_type: materialType,
        created_at: new Date()
      }
    ]);
  
  return { data, error };
};

export const removeBookmark = async (userId: string, materialId: string) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .match({ user_id: userId, material_id: materialId });
  
  return { data, error };
};

export const getUserBookmarks = async (userId: string) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`
      *,
      study_materials(*),
      exam_papers(*)
    `)
    .eq('user_id', userId);
  
  return { data, error };
};

// Analytics and usage tracking
export async function recordPageView(path: string, userId?: string) {
  const { error } = await supabase
    .from('page_views')
    .insert([
      { 
        path,
        user_id: userId,
        timestamp: new Date()
      }
    ]);
  
  if (error) {
    console.error('Error recording page view:', error);
  }
}

export async function recordDownload(materialId: string, materialType: 'note' | 'question_bank' | 'exam_paper', userId?: string) {
  const { error } = await supabase
    .from('downloads')
    .insert([
      { 
        material_id: materialId,
        material_type: materialType,
        user_id: userId,
        timestamp: new Date()
      }
    ]);
  
  if (error) {
    console.error('Error recording download:', error);
  }
} 