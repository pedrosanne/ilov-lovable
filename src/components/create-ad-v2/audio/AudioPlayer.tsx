
import { Button } from '@/components/ui/button';
import { Mic, Play, Pause, Trash2 } from 'lucide-react';
import { AudioSpectrum } from './AudioSpectrum';
import { useAudioPlayback } from '@/hooks/useAudioPlayback';

interface AudioPlayerProps {
  audioUrl: string;
  onDelete: () => void;
}

export function AudioPlayer({ audioUrl, onDelete }: AudioPlayerProps) {
  const {
    isPlaying,
    audioLevels,
    audioRef,
    playAudio,
    handleAudioEnded,
    handleAudioPause,
    handleAudioLoad
  } = useAudioPlayback();

  const handlePlay = () => {
    playAudio(audioUrl);
  };

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Mic className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-green-800">Áudio gravado!</p>
              <p className="text-sm text-green-600">Sua apresentação está pronta</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AudioSpectrum levels={audioLevels} isActive={isPlaying} />

      <div className="flex justify-center space-x-4">
        <Button
          type="button"
          onClick={handlePlay}
          variant="outline"
          className="flex items-center space-x-2"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Reproduzir</span>
            </>
          )}
        </Button>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleAudioEnded}
        onPause={handleAudioPause}
        onLoadedData={handleAudioLoad}
        preload="metadata"
        style={{ display: 'none' }}
      />
    </div>
  );
}
