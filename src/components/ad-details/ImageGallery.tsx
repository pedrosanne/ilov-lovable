
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) {
    return (
      <div className="relative h-80 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Nenhuma imagem disponível</span>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
          <img 
            src={images[selectedImage]} 
            alt={`${title} - Imagem ${selectedImage + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onClick={() => openLightbox(selectedImage)}
          />
          
          {/* Expand overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(selectedImage);
              }}
            >
              <Expand className="h-4 w-4 mr-2" />
              Ampliar
            </Button>
          </div>

          {/* Navigation arrows for main image */}
          {hasMultipleImages && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Image counter */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {hasMultipleImages && (
          <div className="mt-4 grid grid-cols-5 gap-2">
            {images.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative h-16 rounded cursor-pointer overflow-hidden border-2 transition-all",
                  selectedImage === index 
                    ? "border-primary ring-2 ring-primary/20" 
                    : "border-gray-300 hover:border-gray-400"
                )}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 4 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-xs font-semibold">
                    +{images.length - 5}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={images[lightboxIndex]} 
              alt={`${title} - Imagem ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation in lightbox */}
            {hasMultipleImages && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white"
                  onClick={prevLightboxImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white"
                  onClick={nextLightboxImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Image counter in lightbox */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
                  {lightboxIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
