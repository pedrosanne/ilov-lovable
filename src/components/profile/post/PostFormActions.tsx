
import { Button } from '@/components/ui/button';

interface PostFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export function PostFormActions({ isSubmitting, onCancel }: PostFormActionsProps) {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Cancelar
      </Button>
      <Button 
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Publicando...' : 'Publicar'}
      </Button>
    </div>
  );
}
