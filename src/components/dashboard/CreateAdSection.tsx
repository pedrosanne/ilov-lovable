
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreateAdSectionProps {
  isVerified: boolean;
}

export function CreateAdSection({ isVerified }: CreateAdSectionProps) {
  return (
    <div className="text-center">
      <Button
        size="lg"
        className="bg-gradient-to-r from-[#4de9d8] to-[#3bc9d8] hover:from-[#3bc9d8] hover:to-[#2ab5c5] text-white border-0 shadow-lg rounded-2xl px-8 py-4 text-lg font-semibold"
        disabled={!isVerified}
        asChild={isVerified}
      >
        {isVerified ? (
          <Link to="/create-ad">
            <PlusCircle className="h-5 w-5 mr-2" />
            Criar Novo Anúncio
          </Link>
        ) : (
          <>
            <PlusCircle className="h-5 w-5 mr-2" />
            Criar Novo Anúncio 🔒
          </>
        )}
      </Button>
      {!isVerified && (
        <p className="text-sm text-gray-500 mt-2">
          Verifique sua identidade para criar anúncios
        </p>
      )}
    </div>
  );
}
