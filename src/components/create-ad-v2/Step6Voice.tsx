
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdFormDataV2 } from '@/types/adFormV2';
import { AudioRecorder } from './audio/AudioRecorder';
import { AudioPlayer } from './audio/AudioPlayer';

interface Step6VoiceProps {
  formData: AdFormDataV2;
  updateFormData: (data: Partial<AdFormDataV2>) => void;
}

export function Step6Voice({ formData, updateFormData }: Step6VoiceProps) {
  const handleRecordingComplete = (file: File, url: string) => {
    updateFormData({ 
      voice_audio: file,
      voice_audio_url: url 
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Arquivo muito grande. Máximo 10MB.');
        return;
      }
      
      updateFormData({ voice_audio: file });
      
      const audioUrl = URL.createObjectURL(file);
      updateFormData({ voice_audio_url: audioUrl });
    } else {
      alert('Por favor, selecione um arquivo de áudio válido.');
    }
  };

  const handleDeleteAudio = () => {
    if (formData.voice_audio_url) {
      URL.revokeObjectURL(formData.voice_audio_url);
    }
    updateFormData({ 
      voice_audio: null,
      voice_audio_url: null 
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎤 Sua Voz
        </h2>
        <p className="text-lg text-gray-600">
          Grave um áudio de até 1 minuto para se apresentar aos clientes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Gravação de Apresentação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!formData.voice_audio ? (
            <AudioRecorder 
              onRecordingComplete={handleRecordingComplete}
              onFileUpload={handleFileUpload}
            />
          ) : (
            <AudioPlayer 
              audioUrl={formData.voice_audio_url || ''}
              onDelete={handleDeleteAudio}
            />
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
    </div>
  );
}
