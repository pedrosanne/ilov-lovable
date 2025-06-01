
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { StoryViewer } from './StoryViewer';

interface Story {
  id: string;
  user_id: string;
  media_url: string;
  media_type: string;
  caption?: string;
  created_at: string;
  user?: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  };
}

interface StoriesRowProps {
  stories: Story[];
}

export function StoriesRow({ stories }: StoriesRowProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Agrupar stories por usuário
  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.user_id]) {
      acc[story.user_id] = [];
    }
    acc[story.user_id].push(story);
    return acc;
  }, {} as Record<string, Story[]>);

  return (
    <>
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex space-x-4 overflow-x-auto">
          {Object.entries(groupedStories).map(([userId, userStories]) => {
            const latestStory = userStories[0];
            return (
              <div 
                key={userId}
                className="flex flex-col items-center space-y-2 cursor-pointer"
                onClick={() => setSelectedStory(latestStory)}
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
                    <Avatar className="w-full h-full border-2 border-white">
                      <AvatarImage src={latestStory.user?.avatar_url} />
                      <AvatarFallback>
                        {latestStory.user?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white text-white text-xs flex items-center justify-center">
                    {userStories.length}
                  </div>
                </div>
                <span className="text-xs text-gray-600 text-center max-w-[64px] truncate">
                  {latestStory.user?.full_name || 'Usuário'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {selectedStory && (
        <StoryViewer 
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}
