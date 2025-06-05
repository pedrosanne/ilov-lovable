
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MediaUpload } from '@/components/ui/media-upload';

interface ProfileAvatarUploadProps {
  avatarUrl: string;
  fullName: string;
  email: string;
  onAvatarChange: (url: string) => void;
}

export function ProfileAvatarUpload({ 
  avatarUrl, 
  fullName, 
  email, 
  onAvatarChange 
}: ProfileAvatarUploadProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>
          {fullName?.charAt(0) || email?.charAt(0) || 'U'}
        </AvatarFallback>
      </Avatar>
      
      <MediaUpload
        accept="image"
        maxSizeMB={3}
        onUploadComplete={onAvatarChange}
        currentUrl={avatarUrl}
        showPreview={false}
        className="w-full max-w-xs"
      />
    </div>
  );
}
