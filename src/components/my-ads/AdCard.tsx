
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageCircle } from 'lucide-react';
import { AdActions } from './AdActions';

interface AdCardProps {
  ad: any;
  isLoading?: boolean;
}

export function AdCard({ ad, isLoading }: AdCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending_approval':
        return 'Aguardando Aprovação';
      case 'rejected':
        return 'Rejeitado';
      case 'paused':
        return 'Pausado';
      default:
        return status;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl mb-2 truncate">
              {ad.title}
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
              <span className="truncate">{ad.location}</span>
              <span className="hidden sm:inline">•</span>
              <span>R$ {ad.price}</span>
              <span className="hidden sm:inline">•</span>
              <Badge className={getStatusColor(ad.status)}>
                {getStatusText(ad.status)}
              </Badge>
            </div>
          </div>
          {ad.image_url && (
            <div className="shrink-0">
              <img 
                src={ad.image_url} 
                alt={ad.title}
                className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
          {ad.description}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{ad.views_count || 0}</span>
              <span className="hidden sm:inline">visualizações</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{ad.clicks_count || 0}</span>
              <span className="hidden sm:inline">cliques</span>
            </div>
          </div>
          
          <AdActions adId={ad.id} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  );
}
