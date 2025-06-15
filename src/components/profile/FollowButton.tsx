
import { Button } from '@/components/ui/button';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';
import { useFollow } from '@/hooks/useFollow';

interface FollowButtonProps {
  userId: string;
  className?: string;
}

export function FollowButton({ userId, className }: FollowButtonProps) {
  const { isFollowing, isLoading, toggleFollow, isToggling } = useFollow(userId);

  if (isLoading) {
    return (
      <Button variant="outline" disabled className={className}>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Carregando...
      </Button>
    );
  }

  return (
    <Button
      onClick={() => toggleFollow()}
      disabled={isToggling}
      variant={isFollowing ? "outline" : "default"}
      className={className}
    >
      {isToggling ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : isFollowing ? (
        <UserMinus className="h-4 w-4 mr-2" />
      ) : (
        <UserPlus className="h-4 w-4 mr-2" />
      )}
      {isFollowing ? 'Deixar de Seguir' : 'Seguir'}
    </Button>
  );
}
