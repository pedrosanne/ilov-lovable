
import { Link } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="https://zrtlzkqqwiupqbbiwxbo.supabase.co/storage/v1/object/public/logos//LOGO-iLov-PNG.webp" 
              alt="iLove" 
              className="h-10 w-auto"
            />
          </Link>
          
          <div className="flex items-center gap-4">
            {user && (
              <Button 
                asChild 
                className="hidden sm:flex bg-gradient-to-r from-[#4de9d8] to-[#3bc9d8] hover:from-[#3bc9d8] hover:to-[#2ab5c5] text-white border-0 shadow-md rounded-xl"
              >
                <Link to="/create-ad">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Novo Anúncio
                </Link>
              </Button>
            )}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
