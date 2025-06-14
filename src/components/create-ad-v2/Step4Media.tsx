
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MediaUpload } from '@/components/ui/media-upload';
import { Camera, Video, Trash2, Eye, EyeOff } from 'lucide-react';

interface Step4Props {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step4Media({ formData, updateFormData }: Step4Props) {
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [uploadingVideos, setUploadingVideos] = useState(false);

  const handlePhotoUpload = (url: string) => {
    const currentPhotos = formData.uploaded_photos || [];
    updateFormData({
      uploaded_photos: [...currentPhotos, url]
    });
  };

  const handleVideoUpload = (url: string) => {
    const currentVideos = formData.uploaded_videos || [];
    updateFormData({
      uploaded_videos: [...currentVideos, url]
    });
  };

  const removePhoto = (index: number) => {
    const currentPhotos = formData.uploaded_photos || [];
    const updatedPhotos = currentPhotos.filter((_: string, i: number) => i !== index);
    updateFormData({ uploaded_photos: updatedPhotos });
  };

  const removeVideo = (index: number) => {
    const currentVideos = formData.uploaded_videos || [];
    const updatedVideos = currentVideos.filter((_: string, i: number) => i !== index);
    updateFormData({ uploaded_videos: updatedVideos });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <Camera className="h-5 w-5 text-purple-500" />
        <span>Sua vitrine</span>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700 mb-2">
          📸 <strong>Fotos de qualidade</strong> aumentam suas chances de sucesso em até 10x!
        </p>
        <ul className="text-xs text-gray-600 space-y-1 ml-4">
          <li>• Use fotos bem iluminadas e de boa qualidade</li>
          <li>• Mostre diferentes ângulos e looks</li>
          <li>• Evite nudez explícita nas fotos principais</li>
        </ul>
      </div>

      {/* Fotos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="flex items-center space-x-2">
            <Camera className="h-4 w-4 text-blue-500" />
            <span>Fotos ({formData.uploaded_photos?.length || 0}/10)</span>
          </Label>
        </div>

        <MediaUpload
          accept="image"
          maxSizeMB={5}
          onUploadComplete={handlePhotoUpload}
          showPreview={false}
        />

        {formData.uploaded_photos && formData.uploaded_photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.uploaded_photos.map((photo: string, index: number) => (
              <div key={index} className="relative group">
                <img 
                  src={photo} 
                  alt={`Foto ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePhoto(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vídeos */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center justify-between">
          <Label className="flex items-center space-x-2">
            <Video className="h-4 w-4 text-red-500" />
            <span>Vídeos ({formData.uploaded_videos?.length || 0}/3)</span>
          </Label>
        </div>

        {(!formData.uploaded_videos || formData.uploaded_videos.length < 3) && (
          <MediaUpload
            accept="video"
            maxSizeMB={50}
            onUploadComplete={handleVideoUpload}
            showPreview={false}
          />
        )}

        {formData.uploaded_videos && formData.uploaded_videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.uploaded_videos.map((video: string, index: number) => (
              <div key={index} className="relative group">
                <video 
                  src={video}
                  className="w-full h-40 object-cover rounded-lg border"
                  controls
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h3 className="font-medium text-amber-900 mb-2">📋 Diretrizes importantes:</h3>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Você possui os direitos de todas as imagens e vídeos</li>
          <li>• Conteúdo deve ser respeitoso e profissional</li>
          <li>• Evite nudez explícita nas mídias principais</li>
          <li>• Fotos de rosto aumentam a confiança dos clientes</li>
        </ul>
      </div>
    </div>
  );
}
