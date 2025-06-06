
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Shield, Users, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: 'Início', href: '/' },
    { title: 'Como Funciona', href: '/how-it-works' },
    { title: 'Categorias', href: '/categories' },
    { title: 'Segurança', href: '/safety' },
    { title: 'Blog', href: '/blog' },
  ];

  const support = [
    { title: 'Central de Ajuda', href: '/help' },
    { title: 'Contato', href: '/contact' },
    { title: 'Denunciar', href: '/report' },
    { title: 'Status do Sistema', href: '/status' },
    { title: 'Feedback', href: '/feedback' },
  ];

  const legal = [
    { title: 'Termos de Uso', href: '/terms' },
    { title: 'Política de Privacidade', href: '/privacy' },
    { title: 'Cookies', href: '/cookies' },
    { title: 'LGPD', href: '/lgpd' },
  ];

  const features = [
    { icon: Shield, title: 'Segurança', description: 'Verificação de identidade' },
    { icon: Users, title: 'Comunidade', description: 'Milhares de usuários' },
    { icon: Star, title: 'Qualidade', description: 'Avaliações verificadas' },
    { icon: Zap, title: 'Rapidez', description: 'Conexões instantâneas' },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/9a89b9d7-7d01-4b1e-ba4c-4ebc14bbbc11.png" 
                alt="iLov" 
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="text-2xl font-bold font-intra">iLov</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed font-intra">
              A plataforma mais segura e confiável para encontros e relacionamentos no Brasil. 
              Conectamos pessoas de forma autêntica e verificada.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold text-background font-intra">Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  placeholder="Seu e-mail"
                  className="bg-background border-border text-foreground placeholder-muted-foreground font-intra"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-background hover:bg-muted">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-background hover:bg-muted">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-background hover:bg-muted">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-background hover:bg-muted">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-background font-intra">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-background transition-colors duration-200 text-sm font-intra"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-background font-intra">Suporte</h3>
            <ul className="space-y-2">
              {support.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-background transition-colors duration-200 text-sm font-intra"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground font-intra">
                <Mail className="h-4 w-4" />
                <span>contato@ilov.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground font-intra">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground font-intra">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Legal & Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-background font-intra">Legal</h3>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-background transition-colors duration-200 text-sm font-intra"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Features Highlight */}
            <div className="space-y-3 pt-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center space-x-2">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <div>
                    <span className="text-sm font-medium text-background font-intra">{feature.title}</span>
                    <p className="text-xs text-muted-foreground font-intra">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground font-intra">
            © {currentYear} iLov. Todos os direitos reservados.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground font-intra">
            <span>🔒 Site Seguro</span>
            <span>✅ SSL Certificado</span>
            <span>🇧🇷 Feito no Brasil</span>
          </div>
          
          <div className="text-sm text-muted-foreground font-intra">
            Versão 2.0.1
          </div>
        </div>
      </div>
    </footer>
  );
}
