
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MediaUpload } from '@/components/ui/media-upload';
import { Camera, Video, Trash2 } from 'lucide-react';

interface MediaStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function MediaStep({ formData, updateFormData }: MediaStepProps) {
  const handlePhotoUpload = (url: string) => {
    const currentPhotos = formData.photos?.uploaded || [];
    updateFormData({
      photos: {
        ...formData.photos,
        uploaded: [...currentPhotos, url]
      }
    });
  };

  const handleVideoUpload = (url: string) => {
    const currentVideos = formData.videos?.uploaded || [];
    updateFormData({
      videos: {
        ...formData.videos,
        uploaded: [...currentVideos, url]
      }
    });
  };

  const removePhoto = (index: number) => {
    const currentPhotos = formData.photos?.uploaded || [];
    const updatedPhotos = currentPhotos.filter((_: string, i: number) => i !== index);
    updateFormData({
      photos: {
        ...formData.photos,
        uploaded: updatedPhotos
      }
    });
  };

  const removeVideo = (index: number) => {
    const currentVideos = formData.videos?.uploaded || [];
    const updatedVideos = currentVideos.filter((_: string, i: number) => i !== index);
    updateFormData({
      videos: {
        ...formData.videos,
        uploaded: updatedVideos
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <Camera className="h-5 w-5 text-purple-500" />
        <span>Fotos e Vídeos</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image_url">URL da foto principal (alternativa)</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => updateFormData({ image_url: e.target.value })}
            placeholder="https://exemplo.com/minha-foto.jpg"
          />
          <p className="text-sm text-gray-500">
            Você pode inserir uma URL ou fazer upload abaixo
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="video_url">URL do vídeo principal (alternativa)</Label>
          <Input
            id="video_url"
            value={formData.video_url || ''}
            onChange={(e) => updateFormData({ video_url: e.target.value })}
            placeholder="https://exemplo.com/meu-video.mp4"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2">
          <Camera className="h-4 w-4 text-blue-500" />
          <span>Upload de fotos do dispositivo</span>
        </Label>
        
        <MediaUpload
          accept="image"
          maxSizeMB={5}
          onUploadComplete={handlePhotoUpload}
          showPreview={false}
        />

        {formData.photos?.uploaded && formData.photos.uploaded.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.photos.uploaded.map((photo: string, index: number) => (
              <div key={index} className="relative border rounded-lg overflow-hidden">
                <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePhoto(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs p-1 text-center">
                    Foto Principal
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2">
          <Video className="h-4 w-4 text-red-500" />
          <span>Upload de vídeos do dispositivo</span>
        </Label>
        
        <MediaUpload
          accept="video"
          maxSizeMB={50}
          onUploadComplete={handleVideoUpload}
          showPreview={false}
        />

        {formData.videos?.uploaded && formData.videos.uploaded.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.videos.uploaded.map((video: string, index: number) => (
              <div key={index} className="relative border rounded-lg overflow-hidden">
                <video src={video} className="w-full h-40 object-cover" controls />
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeVideo(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="font-medium text-red-900 mb-2">Importante sobre mídias:</h3>
        <ul className="text-sm text-red-800 space-y-1">
          <li>• Certifique-se de ter direitos sobre todas as imagens e vídeos</li>
          <li>• Evite conteúdo explícito nas fotos públicas</li>
          <li>• Use fotos de boa qualidade e bem iluminadas</li>
          <li>• Vídeos devem ser profissionais e respeitosos</li>
        </ul>
      </div>
    </div>
  );
}
