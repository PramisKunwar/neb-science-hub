import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Upload, X, Camera } from "lucide-react";

interface AvatarUploadProps {
  url?: string | null;
  onUpload: (url: string) => void;
  size?: "sm" | "md" | "lg";
  displayName?: string;
  readonly?: boolean;
}

export function AvatarUpload({ 
  url, 
  onUpload, 
  size = "md", 
  displayName = "",
  readonly = false
}: AvatarUploadProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url || null);

  // Size dimensions mapping
  const dimensions = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24"
  };

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      
      // Validate file type
      if (!allowedTypes.includes(fileExt?.toLowerCase() || '')) {
        throw new Error(`File type not supported. Please upload ${allowedTypes.join(', ')} only.`);
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size must be less than 2MB");
      }
      
      // Create a unique file name
      const fileName = `${user?.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
        
      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: urlData.publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);
        
      if (updateError) {
        throw updateError;
      }
      
      // Update local state and parent component
      setAvatarUrl(urlData.publicUrl);
      onUpload(urlData.publicUrl);
      
      toast.success("Avatar updated", {
        description: "Your profile picture has been updated successfully."
      });
      
      // Reset the file input
      event.target.value = '';
      
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      toast.error("Upload failed", {
        description: error.message || "There was an error uploading your avatar."
      });
    } finally {
      setUploading(false);
    }
  }

  async function removeAvatar() {
    try {
      setUploading(true);
      
      // Extract file name from URL
      if (!avatarUrl) return;
      
      // Update profile to remove avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: null,
          updated_at: new Date().toISOString() 
        })
        .eq('id', user?.id);
        
      if (updateError) {
        throw updateError;
      }
      
      // Update local state and parent component
      setAvatarUrl(null);
      onUpload("");
      
      toast.success("Avatar removed", {
        description: "Your profile picture has been removed."
      });
      
    } catch (error: any) {
      console.error("Error removing avatar:", error);
      toast.error("Remove failed", {
        description: error.message || "There was an error removing your avatar."
      });
    } finally {
      setUploading(false);
    }
  }

  const altText = `Profile picture of ${displayName || 'user'}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar 
        className={`${dimensions[size]} relative group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2`}
      >
        {avatarUrl ? (
          <>
            <AvatarImage 
              src={avatarUrl} 
              alt={altText} 
              className="object-cover"
            />
            {!uploading && !readonly && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
                onClick={removeAvatar}
                type="button"
                aria-label="Remove profile picture"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </Button>
            )}
          </>
        ) : (
          <AvatarFallback aria-label={`Initials: ${getInitials(displayName)}`}>
            {getInitials(displayName)}
          </AvatarFallback>
        )}
        
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full" aria-live="polite">
            <Loader2 className="h-5 w-5 text-white animate-spin" aria-hidden="true" />
            <span className="sr-only">Uploading profile picture...</span>
          </div>
        )}
      </Avatar>
      
      {!readonly && (
        <div className="flex flex-col xs:flex-row items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs w-full xs:w-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            disabled={uploading}
            onClick={() => document.getElementById('avatar-upload')?.click()}
            aria-label={avatarUrl ? "Change profile picture" : "Upload profile picture"}
          >
            <Camera className="h-3 w-3 mr-1" aria-hidden="true" />
            {avatarUrl ? 'Change Profile Picture' : 'Upload Profile Picture'}
          </Button>
          
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            className="hidden"
            disabled={uploading}
            aria-label="Upload profile picture"
          />
        </div>
      )}
    </div>
  );
} 