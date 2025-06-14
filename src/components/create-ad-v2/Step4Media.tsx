
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Video, Upload, X, Eye } from 'lucide-react';
import { useRef } from 'react';

interface Step4MediaProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step4Media({ formData, updateFormData }: Step4MediaProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      updateFormData({
        photos: [...(formData.photos || []), ...newPhotos]
      });
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newVideos = Array.from(files);
      updateFormData({
        videos: [...(formData.videos || []), ...newVideos]
      });
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = formData.photos?.filter((_: any, i: number) => i !== index) || [];
    updateFormData({ photos: updatedPhotos });
  };

  const removeVideo = (index: number) => {
    const updatedVideos = formData.videos?.filter((_: any, i: number) => i !== index) || [];
    updateFormData({ videos: updatedVideos });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full">
            <Camera className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">📸 Sua vitrine</h2>
        <p className="text-gray-600">Adicione fotos e vídeos para mostrar seu melhor lado</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="flex items-center space-x-2 text-lg">
            <Camera className="h-5 w-5 text-pink-500" />
            <span>Fotos</span>
          </Label>
          
          <Card 
            className="border-2 border-dashed border-pink-300 p-8 text-center cursor-pointer hover:border-pink-400 transition-colors"
            onClick={() => photoInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-pink-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Clique para adicionar fotos</p>
            <p className="text-sm text-gray-500">PNG, JPG até 5MB cada</p>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </Card>

          {formData.photos && formData.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.photos.map((photo: File, index: number) => (
                <div key={index} className="relative group">
                  <img 
                    src={URL.createObjectURL(photo)} 
                    alt={`Foto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removePhoto(index)}
                      className="p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-1 left-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {index === 0 ? 'Principal' : `Foto ${index + 1}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="flex items-center space-x-2 text-lg">
            <Video className="h-5 w-5 text-red-500" />
            <span>Vídeos (opcional)</span>
          </Label>
          
          <Card 
            className="border-2 border-dashed border-red-300 p-8 text-center cursor-pointer hover:border-red-400 transition-colors"
            onClick={() => videoInputRef.current?.click()}
          >
            <Video className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Clique para adicionar vídeos</p>
            <p className="text-sm text-gray-500">MP4, MOV até 50MB cada</p>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoUpload}
              className="hidden"
            />
          </Card>

          {formData.videos && formData.videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.videos.map((video: File, index: number) => (
                <div key={index} className="relative group">
                  <video 
                    src={URL.createObjectURL(video)}
                    className="w-full h-48 object-cover rounded-lg"
                    controls
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeVideo(index)}
                      className="p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
        <h3 className="font-medium text-pink-900 mb-2">📷 Dicas para fotos incríveis:</h3>
        <ul className="text-sm text-pink-800 space-y-1">
          <li>• Use boa iluminação natural sempre que possível</li>
          <li>• A primeira foto será sua foto principal - escolha a melhor!</li>
          <li>• Varie os ângulos e poses para mostrar diferentes lados</li>
          <li>• Mantenha um padrão de qualidade em todas as fotos</li>
          <li>• Sorria! Fotos com sorriso geram mais engajamento</li>
        </ul>
      </div>
    </div>
  );
}
