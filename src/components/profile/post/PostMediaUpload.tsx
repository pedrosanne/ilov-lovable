
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MediaUpload } from '@/components/ui/media-upload';
import { Camera, Video, Grid3x3, Film } from 'lucide-react';

interface PostMediaUploadProps {
  mediaUrls: string[];
  mediaType: 'photo' | 'video' | 'carousel' | 'reel';
  onMediaTypeChange: (type: 'photo' | 'video' | 'carousel' | 'reel') => void;
  onAddMedia: (url: string) => void;
  onRemoveMedia: (index: number) => void;
}

export function PostMediaUpload({
  mediaUrls,
  mediaType,
  onMediaTypeChange,
  onAddMedia,
  onRemoveMedia
}: PostMediaUploadProps) {
  return (
    <>
      {/* Media Type Selection */}
      {mediaUrls.length > 0 && (
        <div>
          <Label>Tipo de Mídia</Label>
          <Select value={mediaType} onValueChange={onMediaTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="photo">
                <div className="flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Foto
                </div>
              </SelectItem>
              <SelectItem value="video">
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Vídeo
                </div>
              </SelectItem>
              <SelectItem value="carousel">
                <div className="flex items-center">
                  <Grid3x3 className="h-4 w-4 mr-2" />
                  Carrossel
                </div>
              </SelectItem>
              <SelectItem value="reel">
                <div className="flex items-center">
                  <Film className="h-4 w-4 mr-2" />
                  Reel
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Media Upload */}
      <div>
        <Label className="mb-2 block">Mídia do Post</Label>
        <MediaUpload
          accept="both"
          maxSizeMB={10}
          onUploadComplete={onAddMedia}
          showPreview={false}
          className="mb-4"
        />
        
        {/* Lista de mídias adicionadas */}
        {mediaUrls.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Mídias Adicionadas:</Label>
            {mediaUrls.map((url, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  {url.match(/\.(mp4|webm|ogg|mov|avi)$/i) ? (
                    <video src={url} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    <img src={url} alt={`Mídia ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                  )}
                </div>
                <span className="flex-1 text-sm truncate">Mídia {index + 1}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemoveMedia(index)}
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
