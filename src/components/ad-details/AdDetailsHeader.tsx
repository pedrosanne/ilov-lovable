
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function AdDetailsHeader() {
  return (
    <div className="mb-6">
      <Button variant="ghost" asChild>
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos resultados
        </Link>
      </Button>
    </div>
  );
}
