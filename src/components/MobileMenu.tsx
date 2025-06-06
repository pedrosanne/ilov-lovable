
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, PlusCircle, LogOut, UserCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';

export function MobileMenu() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-gray-600 hover:text-gray-900"
              onClick={closeMenu}
            >
              Início
            </Link>
            <Link 
              to="/categories" 
              className="block py-2 text-gray-600 hover:text-gray-900"
              onClick={closeMenu}
            >
              Categorias
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-600 hover:text-gray-900"
              onClick={closeMenu}
            >
              Sobre
            </Link>

            <Separator className="my-4" />

            {user ? (
              <div className="space-y-4">
                <Button asChild className="w-full" onClick={closeMenu}>
                  <Link to="/dashboard">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Anunciar
                  </Link>
                </Button>

                <div className="space-y-2">
                  <Link 
                    to="/profile" 
                    className="flex items-center py-2 text-gray-600 hover:text-gray-900"
                    onClick={closeMenu}
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Meu Perfil
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="block py-2 text-gray-600 hover:text-gray-900"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  {profile?.is_admin && (
                    <Link 
                      to="/admin" 
                      className="flex items-center py-2 text-gray-600 hover:text-gray-900"
                      onClick={closeMenu}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Painel Admin
                    </Link>
                  )}
                </div>

                <Separator className="my-4" />
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Button variant="ghost" className="w-full" asChild onClick={closeMenu}>
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Link>
                </Button>
                <Button className="w-full" asChild onClick={closeMenu}>
                  <Link to="/signup">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Cadastrar
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
