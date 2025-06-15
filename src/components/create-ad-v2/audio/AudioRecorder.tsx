
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Upload } from 'lucide-react';
import { AudioSpectrum } from './AudioSpectrum';
import { useAudioRecording } from '@/hooks/useAudioRecording';
import { useEffect } from 'react';

interface AudioRecorderProps {
  onRecordingComplete: (file: File, url: string) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AudioRecorder({ onRecordingComplete, onFileUpload }: AudioRecorderProps) {
  const {
    isRecording,
    recordingTime,
    audioLevels,
    startRecording,
    stopRecording,
    cleanup
  } = useAudioRecording();

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    startRecording(onRecordingComplete);
  };

  return (
    <div className="text-center space-y-4">
      {isRecording && (
        <div className="space-y-3">
          <AudioSpectrum levels={audioLevels} isActive={isRecording} />
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-700 font-medium">
                Gravando... {formatTime(recordingTime)}/1:00
              </span>
            </div>
            <div className="mt-2 w-full bg-red-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(recordingTime / 60) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Button
          type="button"
          onClick={isRecording ? stopRecording : handleStartRecording}
          className={`w-full py-6 text-lg ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={recordingTime >= 60}
        >
          {isRecording ? (
            <>
              <MicOff className="h-6 w-6 mr-2" />
              Parar Gravação
            </>
          ) : (
            <>
              <Mic className="h-6 w-6 mr-2" />
              Começar Gravação
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">ou</p>
          <label htmlFor="audio-upload" className="cursor-pointer">
            <Button type="button" variant="outline" className="w-full" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Fazer Upload de Áudio
              </span>
            </Button>
          </label>
          <input
            id="audio-upload"
            type="file"
            accept="audio/*"
            onChange={onFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
