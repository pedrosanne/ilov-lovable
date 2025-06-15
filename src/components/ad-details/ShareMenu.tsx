
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Share2, MessageCircle, Copy, Facebook, Instagram, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareMenuProps {
  title: string;
  description: string;
  imageUrl?: string;
  adId: string;
}

export function ShareMenu({ title, description, imageUrl, adId }: ShareMenuProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const currentUrl = `${window.location.origin}/ad/${adId}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description.slice(0, 100) + '...');

  const shareOptions = [
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodedTitle}%0A${encodedDescription}%0A${encodedUrl}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      label: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      label: 'Copiar Link',
      icon: Copy,
      color: 'text-gray-600',
      action: async () => {
        try {
          await navigator.clipboard.writeText(currentUrl);
          toast({
            title: "Link copiado!",
            description: "O link foi copiado para sua área de transferência.",
          });
        } catch (error) {
          toast({
            title: "Erro ao copiar",
            description: "Não foi possível copiar o link.",
            variant: "destructive",
          });
        }
      }
    },
    {
      label: 'Compartilhar',
      icon: Link,
      color: 'text-purple-600',
      action: async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title,
              text: description,
              url: currentUrl,
            });
          } catch (error) {
            console.log('Compartilhamento cancelado');
          }
        } else {
          // Fallback para copiar link
          await navigator.clipboard.writeText(currentUrl);
          toast({
            title: "Link copiado!",
            description: "O link foi copiado para sua área de transferência.",
          });
        }
      }
    }
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Compartilhar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareOptions.map((option) => (
          <DropdownMenuItem
            key={option.label}
            onClick={() => {
              option.action();
              setIsOpen(false);
            }}
            className="cursor-pointer"
          >
            <option.icon className={`h-4 w-4 mr-2 ${option.color}`} />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
