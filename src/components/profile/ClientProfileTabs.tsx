
import { Button } from '@/components/ui/button';
import { Grid3x3, Heart, MessageSquare, Info, Settings, UserPlus } from 'lucide-react';

interface ClientProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOwnProfile: boolean;
}

export function ClientProfileTabs({ activeTab, setActiveTab, isOwnProfile }: ClientProfileTabsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="flex border-b overflow-x-auto">
        <Button
          variant={activeTab === 'posts' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('posts')}
          className="flex-1 min-w-fit rounded-none border-0"
        >
          <Grid3x3 className="h-4 w-4 mr-2" />
          Posts
        </Button>
        
        {isOwnProfile && (
          <Button
            variant={activeTab === 'favorites' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('favorites')}
            className="flex-1 min-w-fit rounded-none border-0"
          >
            <Heart className="h-4 w-4 mr-2" />
            Favoritos
          </Button>
        )}

        {isOwnProfile && (
          <Button
            variant={activeTab === 'messages' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('messages')}
            className="flex-1 min-w-fit rounded-none border-0"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Mensagens
          </Button>
        )}
        
        <Button
          variant={activeTab === 'info' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('info')}
          className="flex-1 min-w-fit rounded-none border-0"
        >
          <Info className="h-4 w-4 mr-2" />
          Informações
        </Button>

        {isOwnProfile && (
          <Button
            variant={activeTab === 'upgrade' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('upgrade')}
            className="flex-1 min-w-fit rounded-none border-0"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Virar Anunciante
          </Button>
        )}

        {isOwnProfile && (
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('settings')}
            className="flex-1 min-w-fit rounded-none border-0"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        )}
      </div>
    </div>
  );
}
