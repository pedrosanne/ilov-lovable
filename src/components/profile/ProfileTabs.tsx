
import { Button } from '@/components/ui/button';
import { Grid3x3, Info, Settings } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOwnProfile: boolean;
  isProvider?: boolean;
}

export function ProfileTabs({ activeTab, setActiveTab, isOwnProfile, isProvider = false }: ProfileTabsProps) {
  // Se for um provedor, mostra as abas tradicionais
  if (isProvider) {
    return (
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex border-b">
          <Button
            variant={activeTab === 'posts' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('posts')}
            className="flex-1 rounded-none border-0"
          >
            <Grid3x3 className="h-4 w-4 mr-2" />
            Posts
          </Button>
          
          <Button
            variant={activeTab === 'info' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('info')}
            className="flex-1 rounded-none border-0"
          >
            <Info className="h-4 w-4 mr-2" />
            Informações
          </Button>

          {isOwnProfile && (
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('settings')}
              className="flex-1 rounded-none border-0"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Para clientes, usa o componente ClientProfileTabs
  return null; // Será renderizado pelo componente pai
}
