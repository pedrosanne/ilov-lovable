
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera, Video, Upload, Eye, EyeOff } from 'lucide-react';

interface MediaStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function MediaStep({ formData, updateFormData }: MediaStepProps) {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Aqui implementaríamos o upload real das imagens
      console.log('Files to upload:', files);
      // Por ora, vamos simular URLs
      const newPhotos = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        name: file.name,
        isPrivate: false
      }));
      
      updateFormData({
        photos: {
          ...formData.photos,
          uploaded: [...(formData.photos?.uploaded || []), ...newPhotos]
        }
      });
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log('Videos to upload:', files);
      const newVideos = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        name: file.name,
        isPrivate: false
      }));
      
      updateFormData({
        videos: {
          ...formData.videos,
          uploaded: [...(formData.videos?.uploaded || []), ...newVideos]
        }
      });
    }
  };

  const togglePhotoPrivacy = (photoId: number) => {
    const updatedPhotos = formData.photos?.uploaded?.map((photo: any) =>
      photo.id === photoId ? { ...photo, isPrivate: !photo.isPrivate } : photo
    ) || [];
    
    updateFormData({
      photos: {
        ...formData.photos,
        uploaded: updatedPhotos
      }
    });
  };

  const removePhoto = (photoId: number) => {
    const updatedPhotos = formData.photos?.uploaded?.filter((photo: any) => photo.id !== photoId) || [];
    updateFormData({
      photos: {
        ...formData.photos,
        uploaded: updatedPhotos
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
          <Label htmlFor="image_url">URL da foto principal</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => updateFormData({ image_url: e.target.value })}
            placeholder="https://exemplo.com/minha-foto.jpg"
          />
          <p className="text-sm text-gray-500">
            Esta será a foto principal do seu anúncio
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="video_url">URL do vídeo principal</Label>
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
          <Upload className="h-4 w-4 text-blue-500" />
          <span>Upload de fotos adicionais</span>
        </Label>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
          />
          <Label htmlFor="photo-upload" className="cursor-pointer">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Clique para selecionar fotos</p>
            <p className="text-sm text-gray-500">Máximo 10 fotos, até 5MB cada</p>
          </Label>
        </div>

        {formData.photos?.uploaded && formData.photos.uploaded.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.photos.uploaded.map((photo: any) => (
              <div key={photo.id} className="relative border rounded-lg overflow-hidden">
                <img src={photo.url} alt={photo.name} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => togglePhotoPrivacy(photo.id)}
                  >
                    {photo.isPrivate ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePhoto(photo.id)}
                  >
                    ×
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1">
                  {photo.isPrivate ? '🔒 Privada' : '👁️ Pública'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2">
          <Video className="h-4 w-4 text-red-500" />
          <span>Upload de vídeos</span>
        </Label>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoUpload}
            className="hidden"
            id="video-upload"
          />
          <Label htmlFor="video-upload" className="cursor-pointer">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Clique para selecionar vídeos</p>
            <p className="text-sm text-gray-500">Máximo 3 vídeos, até 50MB cada</p>
          </Label>
        </div>
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
