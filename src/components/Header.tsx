
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, User, PlusCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">iLove</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Início
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-gray-900">
              Categorias
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              Sobre
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">
                <PlusCircle className="h-4 w-4 mr-2" />
                Anunciar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
