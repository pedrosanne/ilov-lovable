
import { useState } from 'react';

interface PostContentProps {
  post: any;
}

export function PostContent({ post }: PostContentProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  const mediaUrls = Array.isArray(post.media_urls) ? post.media_urls : [];
  const hasMultipleMedia = mediaUrls.length > 1;

  return (
    <div className="p-0">
      {/* Content Text - agora com altura mínima para posts somente texto */}
      {post.content && (
        <div className={`px-6 ${mediaUrls.length === 0 ? 'py-8 min-h-[200px] flex items-center' : 'pb-4'}`}>
          <p className={`text-gray-900 ${mediaUrls.length === 0 ? 'text-lg leading-relaxed text-center w-full' : ''}`}>
            {post.content}
          </p>
        </div>
      )}

      {/* Media Content */}
      {mediaUrls.length > 0 && (
        <div className="relative">
          {hasMultipleMedia && (
            <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-sm z-10">
              {currentMediaIndex + 1}/{mediaUrls.length}
            </div>
          )}
          
          <div className="aspect-square bg-gray-100 relative overflow-hidden">
            {post.media_type === 'video' || post.media_type === 'reel' ? (
              <div className="relative w-full h-full">
                <video 
                  src={mediaUrls[currentMediaIndex]}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
            ) : (
              <img 
                src={mediaUrls[currentMediaIndex]}
                alt="Post content"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Carousel Navigation */}
          {hasMultipleMedia && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {mediaUrls.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentMediaIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
