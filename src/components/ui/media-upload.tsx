
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image, Video, X } from 'lucide-react';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { useAuth } from '@/hooks/useAuth';

interface MediaUploadProps {
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  currentUrl?: string;
  accept?: 'image' | 'video' | 'both';
  maxSizeMB?: number;
  className?: string;
  showPreview?: boolean;
}

export function MediaUpload({ 
  onUploadComplete, 
  onRemove,
  currentUrl,
  accept = 'both',
  maxSizeMB = 10,
  className = '',
  showPreview = true
}: MediaUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadMedia, uploading } = useMediaUpload();
  const { user } = useAuth();

  const getAcceptTypes = () => {
    switch (accept) {
      case 'image': return 'image/*';
      case 'video': return 'video/*';
      case 'both': return 'image/*,video/*';
      default: return 'image/*,video/*';
    }
  };

  const getAllowedTypes = () => {
    switch (accept) {
      case 'image': return ['image/*'];
      case 'video': return ['video/*'];
      case 'both': return ['image/*', 'video/*'];
      default: return ['image/*', 'video/*'];
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    const url = await uploadMedia(file, user.id, {
      maxSizeInMB: maxSizeMB,
      allowedTypes: getAllowedTypes()
    });

    if (url) {
      onUploadComplete(url);
    }

    // Limpar o input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isVideo = (url: string) => {
    return /\.(mp4|webm|ogg|mov|avi)$/i.test(url);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptTypes()}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full"
      >
        {uploading ? (
          <Upload className="h-4 w-4 mr-2 animate-spin" />
        ) : accept === 'image' ? (
          <Image className="h-4 w-4 mr-2" />
        ) : accept === 'video' ? (
          <Video className="h-4 w-4 mr-2" />
        ) : (
          <Upload className="h-4 w-4 mr-2" />
        )}
        {uploading ? 'Enviando...' : 
         accept === 'image' ? 'Selecionar Imagem' :
         accept === 'video' ? 'Selecionar Vídeo' : 
         'Selecionar Mídia'}
      </Button>

      {currentUrl && showPreview && (
        <div className="relative">
          {isVideo(currentUrl) ? (
            <video src={currentUrl} className="w-full h-32 object-cover rounded" controls />
          ) : (
            <img src={currentUrl} alt="Preview" className="w-full h-32 object-cover rounded" />
          )}
          {onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500">
        Máximo {maxSizeMB}MB • {accept === 'image' ? 'Imagens' : accept === 'video' ? 'Vídeos' : 'Imagens e vídeos'}
      </p>
    </div>
  );
}
