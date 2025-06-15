
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PostDropdownMenu } from './PostDropdownMenu';

interface PostHeaderProps {
  post: any;
  isOwnProfile: boolean;
  onShare: () => void;
  onDelete: () => void;
}

export function PostHeader({ post, isOwnProfile, onShare, onDelete }: PostHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Intl.RelativeTimeFormat('pt-BR').format(
      Math.floor((new Date(dateString).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={post.profiles.avatar_url} />
          <AvatarFallback>
            {post.profiles.presentation_name?.charAt(0) || 
             post.profiles.full_name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">
            {post.profiles.presentation_name || post.profiles.full_name}
          </p>
          <p className="text-sm text-gray-500">
            {formatDate(post.created_at)}
          </p>
        </div>
      </div>
      
      <PostDropdownMenu 
        isOwnProfile={isOwnProfile}
        onShare={onShare}
        onDelete={onDelete}
      />
    </div>
  );
}
