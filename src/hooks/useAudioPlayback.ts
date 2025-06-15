
import { useState, useRef, useCallback } from 'react';

export function useAudioPlayback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(20).fill(0));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);

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
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateAudioLevels);
    }
  }, [isPlaying]);

  const setupAudioContext = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      // Criar AudioContext apenas se não existir
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Resumir AudioContext se suspenso
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Criar source apenas se não existir
      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        
        // Criar analyser
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;
        
        // Conectar: source -> analyser -> destination
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        
        console.log('AudioContext configurado para reprodução');
      }
    } catch (error) {
      console.error('Erro ao configurar AudioContext:', error);
    }
  }, []);

  const playAudio = useCallback(async (audioUrl: string) => {
    if (!audioUrl || !audioRef.current) {
      console.error('URL de áudio ou referência não disponível');
      return;
    }

    try {
      if (isPlaying) {
        console.log('Pausando áudio');
        audioRef.current.pause();
        setIsPlaying(false);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setAudioLevels(new Array(20).fill(0));
        return;
      }

      console.log('Configurando reprodução de áudio...');
      
      // Configurar AudioContext
      await setupAudioContext();
      
      // Resetar posição do áudio
      audioRef.current.currentTime = 0;
      
      console.log('Iniciando reprodução...');
      await audioRef.current.play();
      
      setIsPlaying(true);
      updateAudioLevels();
      
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      setIsPlaying(false);
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          alert('Reprodução de áudio bloqueada. Clique em algum lugar da página primeiro.');
        } else {
          alert(`Erro na reprodução: ${error.message}`);
        }
      }
    }
  }, [isPlaying, setupAudioContext, updateAudioLevels]);

  const handleAudioEnded = useCallback(() => {
    console.log('Reprodução finalizada');
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setAudioLevels(new Array(20).fill(0));
  }, []);

  const handleAudioPause = useCallback(() => {
    console.log('Reprodução pausada');
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setAudioLevels(new Array(20).fill(0));
  }, []);

  const handleAudioLoad = useCallback(() => {
    console.log('Áudio carregado');
    setAudioLevels(new Array(20).fill(0));
  }, []);

  return {
    isPlaying,
    audioLevels,
    audioRef,
    playAudio,
    handleAudioEnded,
    handleAudioPause,
    handleAudioLoad
  };
}
