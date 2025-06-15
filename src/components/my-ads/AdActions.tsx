
import { Button } from '@/components/ui/button';
import { Eye, Edit3, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeleteAd } from '@/hooks/useDeleteAd';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface AdActionsProps {
  adId: string;
  isLoading?: boolean;
}

export function AdActions({ adId, isLoading }: AdActionsProps) {
  const deleteAdMutation = useDeleteAd();

  const handleDelete = () => {
    deleteAdMutation.mutate(adId);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
        <Link to={`/ad/${adId}`}>
          <Eye className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Ver</span>
        </Link>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        disabled={isLoading}
        className="flex-1 sm:flex-none"
      >
        <Edit3 className="h-4 w-4 sm:mr-1" />
        <span className="hidden sm:inline">Editar</span>
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={isLoading}
            className="flex-1 sm:flex-none text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Excluir</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="mx-4 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={deleteAdMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteAdMutation.isPending ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
