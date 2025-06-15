
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Play, Pause, Upload, Trash2 } from 'lucide-react';
import { AdFormDataV2 } from '@/types/adFormV2';

interface Step6VoiceProps {
  formData: AdFormDataV2;
  updateFormData: (data: Partial<AdFormDataV2>) => void;
}

export function Step6Voice({ formData, updateFormData }: Step6VoiceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(20).fill(0));
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const updateAudioLevels = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Create 20 frequency bands
    const bands = 20;
    const bandSize = Math.floor(dataArray.length / bands);
    const levels = [];

    for (let i = 0; i < bands; i++) {
      const start = i * bandSize;
      const end = start + bandSize;
      const bandData = dataArray.slice(start, end);
      const average = bandData.reduce((sum, value) => sum + value, 0) / bandData.length;
      levels.push(average / 255); // Normalize to 0-1
    }

    setAudioLevels(levels);
    
    if (isRecording || isPlaying) {
      animationRef.current = requestAnimationFrame(updateAudioLevels);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      
      streamRef.current = stream;
      
      // Setup audio context for visualization
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], 'voice_presentation.webm', { type: 'audio/webm' });
        updateFormData({ voice_audio: audioFile });
        
        // Create URL for preview
        const audioUrl = URL.createObjectURL(audioBlob);
        updateFormData({ voice_audio_url: audioUrl });
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };
      
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start visualization
      updateAudioLevels();
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao acessar microfone:', error);
      alert('Erro ao acessar o microfone. Verifique as permissões.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setAudioLevels(new Array(20).fill(0));
    }
  };

  const playAudio = async () => {
    if (!formData.voice_audio_url) return;

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    try {
      // Setup audio context for playback visualization
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        
        // Create audio source for visualization
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        source.connect(analyserRef.current);
        source.connect(audioContextRef.current.destination);

        await audioRef.current.play();
        setIsPlaying(true);
        updateAudioLevels();
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    }
  };

  const deleteAudio = () => {
    if (formData.voice_audio_url) {
      URL.revokeObjectURL(formData.voice_audio_url);
    }
    updateFormData({ 
      voice_audio: null,
      voice_audio_url: null 
    });
    setIsPlaying(false);
    setRecordingTime(0);
    setAudioLevels(new Array(20).fill(0));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('Arquivo muito grande. Máximo 10MB.');
        return;
      }
      
      updateFormData({ voice_audio: file });
      
      // Create URL for preview
      const audioUrl = URL.createObjectURL(file);
      updateFormData({ voice_audio_url: audioUrl });
    } else {
      alert('Por favor, selecione um arquivo de áudio válido.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Audio spectrum visualizer component
  const AudioSpectrum = ({ levels, isActive }: { levels: number[], isActive: boolean }) => (
    <div className="flex items-center justify-center space-x-1 h-12 bg-gray-50 rounded-lg p-2">
      {levels.map((level, index) => (
        <div
          key={index}
          className={`w-1 bg-gradient-to-t transition-all duration-100 rounded-full ${
            isActive ? 'from-blue-400 to-blue-600' : 'from-gray-300 to-gray-400'
          }`}
          style={{
            height: `${Math.max(4, level * 40)}px`,
            opacity: isActive ? Math.max(0.3, level) : 0.3
          }}
        />
      ))}
    </div>
  );

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
            <div className="text-center space-y-4">
              {/* Audio spectrum during recording */}
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
                  onClick={isRecording ? stopRecording : startRecording}
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
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          ) : (
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
                    onClick={deleteAudio}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Audio spectrum during playback */}
              <AudioSpectrum levels={audioLevels} isActive={isPlaying} />

              <div className="flex justify-center space-x-4">
                <Button
                  type="button"
                  onClick={playAudio}
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
                src={formData.voice_audio_url || undefined}
                onEnded={() => {
                  setIsPlaying(false);
                  if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                  }
                  setAudioLevels(new Array(20).fill(0));
                }}
                onPause={() => {
                  setIsPlaying(false);
                  if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                  }
                }}
                onLoadedData={() => {
                  // Reset audio levels when new audio is loaded
                  setAudioLevels(new Array(20).fill(0));
                }}
                preload="metadata"
                style={{ display: 'none' }}
              />
            </div>
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
