
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">iLove</span>
          </Link>
          
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
