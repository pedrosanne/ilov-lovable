
import { useState, useRef, useCallback } from 'react';

export function useAudioRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(20).fill(0));
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const updateAudioLevels = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const bands = 20;
    const bandSize = Math.floor(dataArray.length / bands);
    const levels = [];

    for (let i = 0; i < bands; i++) {
      const start = i * bandSize;
      const end = start + bandSize;
      const bandData = dataArray.slice(start, end);
      const average = bandData.reduce((sum, value) => sum + value, 0) / bandData.length;
      levels.push(average / 255);
    }

    setAudioLevels(levels);
    
    if (isRecording) {
      animationRef.current = requestAnimationFrame(updateAudioLevels);
    }
  }, [isRecording]);

  const startRecording = useCallback(async (onRecordingComplete: (file: File, url: string) => void) => {
    try {
      console.log('Solicitando acesso ao microfone...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      
      console.log('Acesso ao microfone concedido');
      streamRef.current = stream;
      
      // Configurar AudioContext para análise
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
      source.connect(analyserRef.current);
      
      console.log('AudioContext configurado');

      // Configurar MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
        ? 'audio/webm;codecs=opus' 
        : MediaRecorder.isTypeSupported('audio/webm') 
        ? 'audio/webm' 
        : 'audio/mp4';
      
      console.log('Usando MIME type:', mimeType);
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        console.log('Dados de áudio disponíveis:', event.data.size);
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        console.log('Gravação finalizada, processando áudio...');
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const audioFile = new File([audioBlob], `voice_${Date.now()}.webm`, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        console.log('Arquivo de áudio criado:', audioFile.size, 'bytes');
        onRecordingComplete(audioFile, audioUrl);
        
        // Cleanup
        stream.getTracks().forEach(track => {
          track.stop();
          console.log('Track parado:', track.kind);
        });
        
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
      };
      
      mediaRecorder.onerror = (event) => {
        console.error('Erro no MediaRecorder:', event);
      };
      
      // Iniciar gravação
      mediaRecorder.start(100); // Capturar dados a cada 100ms
      setIsRecording(true);
      setRecordingTime(0);
      
      console.log('Gravação iniciada');
      
      // Iniciar visualização
      updateAudioLevels();
      
      // Timer de gravação
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= 60) {
            console.log('Tempo limite atingido, parando gravação');
            stopRecording();
            return 60;
          }
          return newTime;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao inicializar gravação:', error);
      setIsRecording(false);
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          alert('Permissão de microfone negada. Por favor, permita o acesso ao microfone.');
        } else if (error.name === 'NotFoundError') {
          alert('Microfone não encontrado. Verifique se há um microfone conectado.');
        } else {
          alert(`Erro ao acessar microfone: ${error.message}`);
        }
      } else {
        alert('Erro desconhecido ao acessar o microfone.');
      }
    }
  }, [updateAudioLevels]);

  const stopRecording = useCallback(() => {
    console.log('Parando gravação...');
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    setIsRecording(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    setAudioLevels(new Array(20).fill(0));
  }, []);

  const cleanup = useCallback(() => {
    console.log('Limpando recursos de gravação...');
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  }, []);

  return {
    isRecording,
    recordingTime,
    audioLevels,
    startRecording,
    stopRecording,
    cleanup
  };
}
