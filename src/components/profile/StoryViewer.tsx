
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface StoryViewerProps {
  story: any;
  onClose: () => void;
}

export function StoryViewer({ story, onClose }: StoryViewerProps) {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const duration = 5000; // 5 seconds per story

  // Registrar visualização
  const viewMutation = useMutation({
    mutationFn: async () => {
      await supabase
        .from('story_views')
        .upsert({
          story_id: story.id,
          user_id: user?.id || null,
        });
    },
  });

  useEffect(() => {
    viewMutation.mutate();
  }, [story.id]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onClose();
          return 0;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, onClose]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[90vh] p-0 bg-black">
        <div className="relative w-full h-full flex flex-col">
          {/* Progress Bar */}
          <div className="absolute top-2 left-2 right-2 z-10">
            <div className="w-full bg-gray-600 rounded-full h-1">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="absolute top-6 left-2 right-2 z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={story.user?.avatar_url} />
                <AvatarFallback className="text-xs">
                  {story.user?.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-semibold text-sm">
                  {story.user?.presentation_name || story.user?.full_name}
                </p>
                <p className="text-gray-300 text-xs">
                  {new Date(story.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlayPause}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Story Content */}
          <div className="flex-1 flex items-center justify-center bg-black">
            {story.media_type === 'video' ? (
              <video
                src={story.media_url}
                className="max-w-full max-h-full object-contain"
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={story.media_url}
                alt="Story"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>

          {/* Caption */}
          {story.caption && (
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <p className="text-white text-sm bg-black/50 p-2 rounded">
                {story.caption}
              </p>
            </div>
          )}

          {/* Navigation Areas */}
          <div className="absolute inset-0 flex">
            <div 
              className="w-1/2 h-full cursor-pointer"
              onClick={() => {/* Previous story logic */}}
            />
            <div 
              className="w-1/2 h-full cursor-pointer"
              onClick={() => {/* Next story logic */}}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
