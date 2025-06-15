
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2 } from 'lucide-react';
import { useAudioPlayback } from '@/hooks/useAudioPlayback';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  providerName: string;
}

export function AudioPlayer({ audioUrl, title, providerName }: AudioPlayerProps) {
  const {
    isPlaying,
    audioLevels,
    audioRef,
    playAudio,
    handleAudioEnded,
    handleAudioPause,
    handleAudioLoad
  } = useAudioPlayback();

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => playAudio(audioUrl)}
            variant="outline"
            size="sm"
            className="flex-shrink-0"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {isPlaying ? 'Pausar' : 'Ouvir'}
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Volume2 className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Apresentação de {providerName}</span>
            </div>
            
            {/* Audio visualizer */}
            <div className="flex items-end space-x-1 h-8">
              {audioLevels.map((level, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-primary to-primary/50 rounded-sm transition-all duration-150 ease-out"
                  style={{
                    width: '3px',
                    height: `${Math.max(2, level * 32)}px`,
                    opacity: isPlaying ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnded}
          onPause={handleAudioPause}
          onLoadedData={handleAudioLoad}
          preload="metadata"
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}
