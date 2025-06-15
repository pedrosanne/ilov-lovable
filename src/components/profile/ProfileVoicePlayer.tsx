
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import { AudioSpectrum } from '@/components/create-ad-v2/audio/AudioSpectrum';
import { useAudioPlayback } from '@/hooks/useAudioPlayback';

interface ProfileVoicePlayerProps {
  audioUrl: string;
  userName: string;
}

export function ProfileVoicePlayer({ audioUrl, userName }: ProfileVoicePlayerProps) {
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
    console.log('Reproduzindo áudio do perfil:', audioUrl);
    playAudio(audioUrl);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Volume2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-blue-800">Apresentação de {userName}</p>
            <p className="text-sm text-blue-600">Ouça como {userName} se apresenta</p>
          </div>
        </div>

        <AudioSpectrum levels={audioLevels} isActive={isPlaying} />

        <div className="flex justify-center mt-3">
          <Button
            type="button"
            onClick={handlePlay}
            variant="outline"
            className="flex items-center space-x-2 bg-white hover:bg-blue-50"
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
      </CardContent>
    </Card>
  );
}
