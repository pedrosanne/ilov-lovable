
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AudioRecorder } from '@/components/create-ad-v2/audio/AudioRecorder';
import { AudioPlayer } from '@/components/create-ad-v2/audio/AudioPlayer';
import { Mic } from 'lucide-react';

interface ProfileVoiceAudioProps {
  voiceAudioUrl: string | null;
  onAudioChange: (url: string | null) => void;
}

export function ProfileVoiceAudio({ voiceAudioUrl, onAudioChange }: ProfileVoiceAudioProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleRecordingComplete = (file: File, url: string) => {
    setAudioFile(file);
    onAudioChange(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Arquivo muito grande. Máximo 10MB.');
        return;
      }
      
      setAudioFile(file);
      const audioUrl = URL.createObjectURL(file);
      onAudioChange(audioUrl);
    } else {
      alert('Por favor, selecione um arquivo de áudio válido.');
    }
  };

  const handleDeleteAudio = () => {
    if (voiceAudioUrl) {
      URL.revokeObjectURL(voiceAudioUrl);
    }
    setAudioFile(null);
    onAudioChange(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mic className="h-5 w-5 mr-2" />
          Áudio de Apresentação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Grave um áudio de até 1 minuto para se apresentar. Este áudio aparecerá no seu perfil e em todos os seus anúncios.
        </p>

        {!voiceAudioUrl ? (
          <AudioRecorder 
            onRecordingComplete={handleRecordingComplete}
            onFileUpload={handleFileUpload}
          />
        ) : (
          <AudioPlayer 
            audioUrl={voiceAudioUrl}
            onDelete={handleDeleteAudio}
          />
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="font-medium text-blue-800 mb-2">💡 Dicas para uma boa gravação:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Fale em ambiente silencioso</li>
            <li>• Se apresente de forma natural e calorosa</li>
            <li>• Mencione seus diferenciais e especialidades</li>
            <li>• Máximo de 1 minuto de duração</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
