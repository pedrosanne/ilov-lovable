
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface AgeConfirmationModalProps {
  open: boolean;
  onConfirm: () => void;
}

export function AgeConfirmationModal({ open, onConfirm }: AgeConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Confirmação de Idade
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Este site contém conteúdo destinado apenas para maiores de 18 anos.
          </p>
          <p className="text-sm text-gray-500">
            Ao confirmar, você declara ter 18 anos ou mais e concorda em acessar este conteúdo.
          </p>
          
          <Button 
            onClick={onConfirm}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Eu Confirmo (18+)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
