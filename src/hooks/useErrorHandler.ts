
import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

interface ErrorWithMessage {
  message: string;
  code?: string;
}

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown) => {
    console.error('Error caught by handler:', error);
    
    let message = 'An unexpected error occurred';
    let code = 'UNKNOWN_ERROR';
    
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else if ((error as ErrorWithMessage)?.message) {
      message = (error as ErrorWithMessage).message;
      code = (error as ErrorWithMessage).code || code;
    }

    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });

    return { message, code };
  }, []);

  return { handleError };
};
