
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostFormFieldsProps {
  content: string;
  onContentChange: (content: string) => void;
  user: any;
}

export function PostFormFields({ content, onContentChange, user }: PostFormFieldsProps) {
  return (
    <>
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback>
            {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">
            {user?.user_metadata?.presentation_name || user?.user_metadata?.full_name || 'Você'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div>
        <Label htmlFor="content">O que você está pensando?</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Compartilhe algo interessante..."
          rows={4}
          className="resize-none"
        />
      </div>
    </>
  );
}
