import { createClient } from '@supabase/supabase-js';
import DOMPurify from 'dompurify';

// These environment variables need to be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key. Please check your environment variables.');
}

// Configure the Supabase client with proper auth settings
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'neb_science_hub_auth',
  }
});

// Helper function to get the current user with proper error handling
export const getCurrentUser = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    
    const { data: user } = await supabase.auth.getUser();
    return user?.user || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
};

// Input sanitization function
export const sanitizeInput = (input: string): string => {
  return typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(input) : input;
};

// Password strength validation
export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  if (!hasUpperCase) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!hasLowerCase) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!hasNumbers) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  if (!hasSpecialChar) {
    return { valid: false, message: 'Password must contain at least one special character' };
  }
  
  return { valid: true, message: 'Password is strong' };
};

// Auth functions with enhanced security and error handling
export const signInWithEmail = async (email: string, password: string) => {
  try {
    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    
    // Implement login attempt tracking (basic version)
    const attemptKey = `login_attempts_${sanitizedEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const storedAttempts = localStorage.getItem(attemptKey);
    const attempts = storedAttempts ? parseInt(storedAttempts, 10) : 0;
    const lastAttemptTime = localStorage.getItem(`${attemptKey}_time`);
    
    // Check if too many attempts in a short period (basic rate limiting)
    if (attempts >= 5) {
      const now = Date.now();
      const lastTime = lastAttemptTime ? parseInt(lastAttemptTime, 10) : 0;
      
      // 15 minute lockout
      if (now - lastTime < 15 * 60 * 1000) {
        return { 
          data: null, 
          error: { message: 'Too many login attempts. Please try again later.' } 
        };
      } else {
        // Reset counter after lockout period
        localStorage.setItem(attemptKey, '0');
      }
    }
    
    // Record this attempt
    localStorage.setItem(attemptKey, (attempts + 1).toString());
    localStorage.setItem(`${attemptKey}_time`, Date.now().toString());
    
    // Actual login attempt
    const { data, error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password,
    });
    
    // If successful, reset attempt counter
    if (!error) {
      localStorage.setItem(attemptKey, '0');
      
      // Set session activity timestamp
      sessionStorage.setItem('lastActivity', Date.now().toString());
    }
    
    return { data, error };
  } catch (error) {
    console.error('Sign in error:', error);
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred during sign in.' } 
    };
  }
};

export const signInWithMagicLink = async (email: string, redirectTo?: string) => {
  try {
    // Sanitize email
    const sanitizedEmail = sanitizeInput(email);
    
    const { data, error } = await supabase.auth.signInWithOtp({
      email: sanitizedEmail,
      options: {
        emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  } catch (error) {
    console.error('Magic link error:', error);
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred when sending magic link.' } 
    };
  }
};

export const signUpWithEmail = async (email: string, password: string, redirectTo?: string) => {
  try {
    // Sanitize email
    const sanitizedEmail = sanitizeInput(email);
    
    // Validate password strength
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return {
        data: null,
        error: { message: passwordCheck.message }
      };
    }
    
    const { data, error } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password,
      options: {
        emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    });
    
    return { data, error };
  } catch (error) {
    console.error('Sign up error:', error);
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred during sign up.' } 
    };
  }
};

export const signOut = async () => {
  try {
    // Clear session storage
    sessionStorage.removeItem('lastActivity');
    
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error: { message: 'An unexpected error occurred during sign out.' } };
  }
};

// Session timeout checker
export const checkSessionTimeout = () => {
  const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour
  const lastActivity = sessionStorage.getItem('lastActivity');
  
  if (lastActivity && Date.now() - parseInt(lastActivity, 10) > SESSION_TIMEOUT) {
    signOut();
    return true;
  }
  
  // Update last activity
  sessionStorage.setItem('lastActivity', Date.now().toString());
  return false;
};

// Add 'ping' to keep session alive
export const pingSession = () => {
  sessionStorage.setItem('lastActivity', Date.now().toString());
};

// User profile management with improved error handling
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { 
      data: null, 
      error: { message: 'Failed to fetch user profile. Please try again.' } 
    };
  }
};

export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    // Sanitize text inputs
    const sanitizedUpdates = Object.keys(updates).reduce((acc: any, key) => {
      if (typeof updates[key] === 'string') {
        acc[key] = sanitizeInput(updates[key]);
      } else {
        acc[key] = updates[key];
      }
      return acc;
    }, {});
    
    const { data, error } = await supabase
      .from('profiles')
      .update(sanitizedUpdates)
      .eq('id', userId);
    
    return { data, error };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { 
      data: null, 
      error: { message: 'Failed to update profile. Please try again.' } 
    };
  }
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
