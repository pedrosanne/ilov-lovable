
import { MediaUpload } from '@/components/ui/media-upload';
import { Label } from '@/components/ui/label';

interface ProfileCoverUploadProps {
  currentCoverUrl?: string;
  onCoverChange: (url: string) => void;
  onCoverRemove: () => void;
}

export function ProfileCoverUpload({ 
  currentCoverUrl, 
  onCoverChange, 
  onCoverRemove 
}: ProfileCoverUploadProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="cover-upload">
        Imagem de Capa
        <span className="text-sm text-gray-500 block font-normal">
          Tamanho recomendado: 1200x400 pixels (proporção 3:1)
        </span>
      </Label>
      
      <MediaUpload
        accept="image"
        maxSizeMB={5}
        currentUrl={currentCoverUrl}
        onUploadComplete={onCoverChange}
        onRemove={onCoverRemove}
        className="w-full"
      />
      
      <p className="text-xs text-gray-500">
        A imagem de capa será exibida no topo do seu perfil. Use uma imagem com boa qualidade.
      </p>
    </div>
  );
}
