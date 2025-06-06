
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Shield, Users, Star, Zap } from 'lucide-react';
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
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">iLove</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              A plataforma mais segura e confiável para encontros e relacionamentos no Brasil. 
              Conectamos pessoas de forma autêntica e verificada.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  placeholder="Seu e-mail"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button size="sm" className="bg-red-500 hover:bg-red-600">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Suporte</h3>
            <ul className="space-y-2">
              {support.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>contato@ilove.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Legal & Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
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
                  <feature.icon className="h-4 w-4 text-red-500" />
                  <div>
                    <span className="text-sm font-medium text-white">{feature.title}</span>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © {currentYear} iLove. Todos os direitos reservados.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>🔒 Site Seguro</span>
            <span>✅ SSL Certificado</span>
            <span>🇧🇷 Feito no Brasil</span>
          </div>
          
          <div className="text-sm text-gray-400">
            Versão 2.0.1
          </div>
        </div>
      </div>
    </footer>
  );
}
