
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, PlusCircle, LogOut, UserCircle, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/9a89b9d7-7d01-4b1e-ba4c-4ebc14bbbc11.png" 
              alt="iLov" 
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold text-foreground font-intra">iLov</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground font-intra">
              Início
            </Link>
            <Link to="/categories" className="text-muted-foreground hover:text-foreground font-intra">
              Categorias
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground font-intra">
              Sobre
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button asChild>
                  <Link to="/dashboard">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Anunciar
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <User className="h-4 w-4 mr-2" />
                      Minha Conta
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <UserCircle className="h-4 w-4 mr-2" />
                        Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    {profile?.is_admin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin">
                            <Shield className="h-4 w-4 mr-2" />
                            Painel Admin
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Cadastrar
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
