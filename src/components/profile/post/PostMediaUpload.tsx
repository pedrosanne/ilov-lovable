
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Video, Grid3x3, Film } from 'lucide-react';

interface PostMediaUploadProps {
  mediaUrls: string[];
  mediaType: 'photo' | 'video' | 'carousel' | 'reel';
  onMediaTypeChange: (type: 'photo' | 'video' | 'carousel' | 'reel') => void;
  onAddMedia: () => void;
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

      {/* Media URLs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Mídia</Label>
          <Button type="button" variant="outline" size="sm" onClick={onAddMedia}>
            <Camera className="h-4 w-4 mr-2" />
            Adicionar Mídia
          </Button>
        </div>
        
        {mediaUrls.length > 0 && (
          <div className="space-y-2">
            {mediaUrls.map((url, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <span className="flex-1 text-sm truncate">{url}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveMedia(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
