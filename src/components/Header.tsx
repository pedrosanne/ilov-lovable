
import { Link } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';

export function Header() {
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
          
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
