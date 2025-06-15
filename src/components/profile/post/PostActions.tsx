
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { CommentsSection } from '../CommentsSection';

interface PostActionsProps {
  post: any;
  isLiked: boolean;
  onLike: () => void;
  onShare: () => void;
  onUpdate: () => void;
}

export function PostActions({ post, isLiked, onLike, onShare, onUpdate }: PostActionsProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={isLiked ? 'text-red-500 hover:text-red-600' : ''}
          >
            <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
            {post.likes_count || 0}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-5 w-5 mr-1" />
            {post.comments_count || 0}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onShare}
          >
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentsSection 
          postId={post.id} 
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}
