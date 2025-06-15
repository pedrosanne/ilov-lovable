
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Grid3x3, List } from 'lucide-react';
import { PostsFeedGrid } from './PostsFeedGrid';

interface PostsFeedProps {
  userId: string;
  isOwnProfile: boolean;
}

export function PostsFeed({ userId, isOwnProfile }: PostsFeedProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('feed');

  return (
    <div className="space-y-4">
      {/* Toggle de visualização */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-md"
          >
            <Grid3x3 className="h-4 w-4 mr-2" />
            Grade
          </Button>
          <Button
            variant={viewMode === 'feed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('feed')}
            className="rounded-md"
          >
            <List className="h-4 w-4 mr-2" />
            Feed
          </Button>
        </div>
      </div>

      {/* Feed de posts */}
      <PostsFeedGrid 
        userId={userId}
        isOwnProfile={isOwnProfile}
        viewMode={viewMode}
      />
    </div>
  );
}
